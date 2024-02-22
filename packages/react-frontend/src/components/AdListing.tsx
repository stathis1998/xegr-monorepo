import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { AdModel } from "@/types/adTypes";
import { Card, CardContent, CardTitle } from "./ui/card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { FaBath, FaBed, FaHeart, FaRegHeart, FaShare } from "react-icons/fa6";
import { toast } from "sonner";
import { formatDate } from "@/lib/utils";

export type AdListingProps = {
  ad: AdModel;
};

export function AdListing(props: AdListingProps) {
  const { ad } = props;

  const [demo, setDemo] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className="cursor-pointer"
      onClick={() => {
        ad.id && navigate(`/ads/${ad.id}`);
      }}
    >
      <Card className="overflow-hidden shadow relative">
        <div className="text-xs absolute top-2 right-2 bg-black/20 text-white rounded p-1 z-50">
          {formatDate(ad.createdAt || "")}
        </div>
        <CardTitle>
          <Carousel>
            <CarouselContent>
              <CarouselItem>
                <img
                  className="w-full h-full object-cover"
                  src="https://placehold.co/400x160?text=Image 1"
                  alt="ad"
                />
              </CarouselItem>
              <CarouselItem>
                <img
                  className="w-full h-full object-cover"
                  src="https://placehold.co/400x160?text=Image 2"
                  alt="ad"
                />
              </CarouselItem>
              <CarouselItem>
                <img
                  className="w-full h-full object-cover"
                  src="https://placehold.co/400x160?text=Image 3"
                  alt="ad"
                />
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </CardTitle>
        <CardContent className="p-2 relative">
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
            {demo && (
              <FaHeart
                fill="red"
                onClick={(e) => {
                  e.stopPropagation();
                  setDemo(false);
                }}
              />
            )}
            {!demo && (
              <FaRegHeart
                className="hover:fill-red-500"
                onClick={(e) => {
                  e.stopPropagation();
                  setDemo(true);
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
