import { AdListing } from "@/components/AdListing";
import { EmptyArea } from "@/components/EmptyArea";
import { FilterButton } from "@/components/FilterButton";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AdModel } from "@/types/adTypes";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export type AdsViewProps = {};

export function AdsView(props: AdsViewProps) {
  const {} = props;

  const navigate = useNavigate();

  const testAds: AdModel[] = [
    {
      id: 1,
      title: "Bike",
      description: "A bike in good condition",
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
    },
    {
      id: 2,
      title: "Car",
      description: "A car in good condition",
      price: 10000,
      address: "1234 Main St",
      area: 400,
      bedrooms: 2,
      bathrooms: 1,
      placeId: "1234",
      propertyType: "House",
      userId: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 3,
      title: "House",
      description: "A house in good condition",
      price: 100000,
      address: "1234 Main St",
      area: 400,
      bedrooms: 2,
      bathrooms: 1,
      placeId: "1234",
      propertyType: "House",
      userId: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  return (
    <div className="p-4 h-full">
      <Container className="py-4 flex flex-col h-full">
        <section>
          <h2 className="font-bold">Find Your Perfect Home</h2>
          <p className="text-black/70">
            Search through our extensive list of properties to find the perfect
            home for you.
          </p>
        </section>

        <Separator className="bg-gray-300 my-4" />

        <div className="flex flex-col gap-2 md:flex-row-reverse md:justify-between items-center">
          <div className="flex gap-2">
            <Button>Create Listing</Button>
          </div>
          <div className="flex gap-2">
            <FilterButton
              label="Price"
              subLabel1="From"
              subLabel2="To"
              onChange={(value) => console.log(value)}
            />
            <FilterButton
              label="Area"
              subLabel1="From"
              subLabel2="To"
              onChange={(value) => console.log(value)}
            />
            <FilterButton
              label="Bedrooms"
              subLabel1="From"
              subLabel2="To"
              onChange={(value) => console.log(value)}
            />
            <FilterButton
              label="Bathrooms"
              subLabel1="From"
              subLabel2="To"
              onChange={(value) => console.log(value)}
            />
          </div>
        </div>

        <Separator className="bg-gray-300 my-4" />

        <section className="flex-grow h-0 overflow-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
          <EmptyArea />
          {Array.from({ length: 20 }).map((_, index) => (
            <AdListing key={index} ad={testAds[index % 3]} />
          ))}
        </section>

        <Separator className="bg-gray-300 my-4" />

        <div className="flex flex-col justify-center items-center">
          <Button
            className="w-full max-w-64 mx-auto"
            onClick={() => {
              const luckyAd =
                testAds[Math.floor(Math.random() * testAds.length)];
              if (luckyAd) {
                navigate(`/ads/${luckyAd.id}`);
                window.scrollTo(0, 0);

                toast.success(
                  "Congrats! You've hit the jackpot of homes! This one's got walls, a roof, and even windows. What are the odds?",
                  { duration: 5000 }
                );
              } else {
                toast.message(
                  "Looks like the housing market is playing hide and seek! No homes found - maybe they're all out getting yard work done?",
                  { duration: 5000 }
                );
              }
            }}
          >
            I'm Feeling Lucky
          </Button>
          <p className="text-black/70 text-center text-sm w-full mt-2 max-w-[350px]">
            <span className="font-bold">Disclaimer:</span>{" "}
            <span className="italic">'I'm Feeling Lucky'</span> may lead to
            spontaneous home discoveries. Side effects include laughter and
            sudden urges to redecorate. Click responsibly!
          </p>
        </div>
      </Container>
    </div>
  );
}
