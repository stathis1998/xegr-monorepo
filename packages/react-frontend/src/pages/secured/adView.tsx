import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/utils";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { DotFilledIcon, DotIcon } from "@radix-ui/react-icons";

export type AdViewProps = {};

export function AdView(props: AdViewProps) {
  const {} = props;

  const [slideIndex, setSlideIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi>();

  const testAd = {
    id: 1,
    title: "House for sale",
    description:
      "Charming and sunlit, this 3-bedroom, 2-bathroom home offers a perfect blend of comfort and convenience. Nestled in a serene neighborhood, the property features an open floor plan with hardwood floors, a modern kitchen with stainless steel appliances, and a spacious living room that opens up to a beautifully landscaped backyard. The master suite includes a walk-in closet and an en-suite bathroom with a soaking tub. Energy-efficient windows and a brand new HVAC system ensure year-round comfort. With its close proximity to top-rated schools, shopping centers, and parks, this home is an idyllic setting for both relaxation and entertainment.",
    price: 100,
    address: "1234 Main St",
    area: 400,
    bedrooms: 2,
    bathrooms: 1,
    placeId: "1234",
    propertyType: "House",
    userId: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const images: string[] = [
    "https://via.placeholder.com/1920x1080",
    "https://via.placeholder.com/1920x1080",
    "https://via.placeholder.com/1920x1080",
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

  return (
    <div>
      <div className="bg-gray-200/50 p-4 shadow text-center">
        <h1 className="font-bold">
          Home Sweet Home: Unveiling Your Next Chapter
        </h1>
        <p className="text-black/50 text-sm">
          Dive into the details of a place where memories await and every nook
          tells a story.
        </p>
      </div>
      <Container fluid>
        <Container className="p-4 space-y-2 max-w-4xl">
          <div>
            <div className="flex justify-between items-center p-1">
              <h1 className="font-bold text-lg">Ad Details</h1>
              <Button className="text-sm" size={"sm"} variant={"link"}>
                Report Ad
              </Button>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <div className="grid grid-cols-2 max-w-[150px] text-sm py-2">
                <p>Created At:</p>
                <span className="font-bold">
                  {formatDate(testAd.createdAt)}
                </span>
                <p>Updated At:</p>
                <span className="font-bold">
                  {formatDate(testAd.updatedAt)}
                </span>
              </div>
              <Button>Book Listing</Button>
            </div>
          </div>
          <div className="relative">
            <Carousel setApi={setApi}>
              <CarouselContent>
                {images.map((image, index) => (
                  <CarouselItem key={index}>
                    <img
                      src={image}
                      className="w-full h-[250px] object-cover rounded shadow-lg border-2 border-black/30"
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
          </div>
          <Separator className="bg-gray-300/50" />
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-2 px-4 pt-1">
            <Button className="w-full" variant={"secondary"}>
              Contact Seller
            </Button>
            <Button className="w-full" variant={"secondary"}>
              Save
            </Button>
            <Button className="w-full" variant={"secondary"}>
              Share
            </Button>
          </section>
        </Container>
        <Container fluid className="bg-white p-6">
          <Container className="max-w-4xl max-auto">
            <h1 className="font-bold">Property Details</h1>
            <Separator />
            <div className="grid grid-cols-2 max-w-[250px] text-sm py-2">
              <p>Area:</p>
              <span className="font-bold">{testAd.area} m²</span>
              <p>Bedrooms:</p>
              <span className="font-bold">{testAd.bedrooms}</span>
              <p>Bathrooms:</p>
              <span className="font-bold">{testAd.bathrooms}</span>
              <p>Property Type:</p>
              <span className="font-bold">{testAd.propertyType}</span>
            </div>
          </Container>
        </Container>
        <Container className="p-4 text-sm max-w-3xl">
          <h1 className="font-bold text-lg">Decription:</h1>
          <p className="text-sm text-justify">{testAd.description}</p>
        </Container>
      </Container>
    </div>
  );
}
