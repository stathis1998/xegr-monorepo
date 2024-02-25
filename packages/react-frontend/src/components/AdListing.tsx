import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { type CarouselApi } from "@/components/ui/carousel";

import { Card, CardContent, CardTitle } from "./ui/card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import { FaBath, FaBed, FaHeart, FaRegHeart, FaShare } from "react-icons/fa6";
import { toast } from "sonner";
import { formatDate } from "@/lib/utils";
import { DotFilledIcon, DotIcon } from "@radix-ui/react-icons";
import { GhostAd } from "./GhostAd";
import { AdFormValues } from "./forms/adForm";
import { ModelsMetadata } from "@/types/genericTypes";

export type AdListingProps = {
  ad: AdFormValues & ModelsMetadata;
};

export function AdListing(props: AdListingProps) {
  const { ad } = props;

  const [isFav, setIsFav] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi>();

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const images: string[] = [
    "https://via.placeholder.com/400x160?text=Image 1",
    "https://via.placeholder.com/400x160?text=Image 2",
    "https://via.placeholder.com/400x160?text=Image 3",
  ];

  useEffect(() => {
    if (!api) {
      return;
    }

    setSlideIndex(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setSlideIndex(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setIsLoading(false);
  //   }, Math.random() * 1500);

  //   return () => {
  //     clearTimeout(timeout);
  //   };
  // });

  if (isLoading) {
    return <GhostAd />;
  }

  return (
    <div
      className="cursor-pointer"
      onClick={() => {
        ad.id && navigate(`/ads/${ad.id}`);
        window.scrollTo(0, 0);
      }}
    >
      <Card className="overflow-hidden shadow relative border border-black/30 h-full">
        <div className="text-xs absolute top-2 right-2 bg-black/20 text-white rounded p-1 z-50">
          {formatDate(ad.createdAt || "")}
        </div>
        <CardTitle className="relative">
          <Carousel setApi={setApi}>
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index}>
                  <img
                    className="w-full h-full object-cover"
                    src={image}
                    alt="ad"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="absolute z-50 bottom-1 left-0 right-0 flex justify-center">
              <div
                className="w-30 flex gap-2"
                onClick={(e) => e.stopPropagation()}
              >
                {images.map((_, index) => {
                  if (index === slideIndex - 1) {
                    return <DotFilledIcon className="w-5 h-5" key={index} />;
                  }

                  return (
                    <DotIcon
                      className="w-5 h-5"
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        api?.scrollTo(index);
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </Carousel>
        </CardTitle>
        <CardContent className="p-2 relative h-full">
          <h2>
            {ad.propertyType} with area of {ad.area}
          </h2>
          <div>
            <span className="font-bold text-lg">{ad.price}€</span>
          </div>

          <div className="text-sm">
            <span>
              <FaBed className="inline-block" /> x{ad.bedrooms} |{" "}
              <FaBath className="inline-block" /> x{ad.bathrooms}
            </span>
          </div>
          <div className="text-sm">
            <span>{ad.address}</span>
          </div>
          <div className="absolute flex flex-col gap-2 top-2 right-2">
            {isFav && (
              <FaHeart
                fill="red"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFav(false);
                }}
              />
            )}
            {!isFav && (
              <FaRegHeart
                className="hover:fill-red-500"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFav(true);
                }}
              />
            )}
            <FaShare
              className="hover:fill-blue-500"
              onClick={(e) => {
                e.stopPropagation();
                toast.message(
                  "Oh no! It seems our Share button is feeling a bit lonely right now and isn't up for socializing. Don't worry, you're not missing out on any friend points. We'll get it back to its social butterfly self shortly!",
                  { duration: 10000 }
                );
              }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
