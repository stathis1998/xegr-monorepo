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
import { AdType } from "@/types/adTypes";

export type AdListingProps = {
  ad: AdType;
};

export function AdListing(props: AdListingProps) {
  const { ad } = props;

  const [isFav, setIsFav] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi>();

  const navigate = useNavigate();

  useEffect(() => {
    if (!api) {
      return;
    }

    setSlideIndex(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setSlideIndex(api.selectedScrollSnap() + 1);
    });
  }, [api]);

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
              {ad.images?.map((image, index) => (
                <CarouselItem key={index} className="bg-gray-300">
                  <img
                    className="w-full h-full object-contain"
                    src={`${image.url}?auto=compress&cs=tinysrgb&h=350`}
                    alt={image.alt}
                  />
                </CarouselItem>
              ))}
              {!ad.images?.length && (
                <CarouselItem>
                  <img
                    className="w-full h-full object-contain"
                    src="https://via.placeholder.com/300x200?text=No+Image+Available"
                    alt="Placeholder Image"
                  />
                </CarouselItem>
              )}
            </CarouselContent>
            <div className="absolute z-50 bottom-1 left-0 right-0 flex justify-center">
              <div
                className="w-30 flex gap-2"
                onClick={(e) => e.stopPropagation()}
              >
                {ad.images?.map((_, index) => {
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
