import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { AdListing } from "@/components/AdListing";
import { EmptyArea } from "@/components/EmptyArea";
import { FilterButton } from "@/components/FilterButton";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AdModel } from "@/types/adTypes";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AdForm } from "@/components/forms/adForm";

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
    <div className="h-full">
      <Container className="py-4 flex flex-col h-full" fluid>
        <Container className="p-4 flex-grow overscroll-auto h-0">
          <section>
            <h2 className="font-bold">Find Your Perfect Home</h2>
            <p className="text-black/70">
              Search through our extensive list of properties to find the
              perfect home for you.
            </p>
          </section>

          <Separator className="bg-gray-300 my-4" />

          <div className="flex flex-col gap-2 md:flex-row-reverse md:justify-between items-center">
            <div className="flex gap-2 w-full">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full sm: max-w-64 mx-auto md:mx-0 md:ml-auto md:w-auto">
                    Create Listing
                  </Button>
                </DialogTrigger>
                <DialogContent className="overflow-auto max-h-screen rounded">
                  <DialogHeader>
                    <DialogTitle>Create Listing</DialogTitle>
                    <DialogDescription>
                      Fill out the form below to create a new listing.
                    </DialogDescription>
                    <Separator />
                  </DialogHeader>
                  <AdForm formId="create-listing-form" onSubmit={() => {}} />
                  <Separator />
                  <DialogFooter className="gap-2">
                    <Button variant="ghost">Cancel</Button>
                    <Button>Create</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
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

          <section className="flex-grow h-0 overflow-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 shadow-inner">
            <EmptyArea />
            {Array.from({ length: 20 }).map((_, index) => (
              <AdListing key={index} ad={testAds[index % 3]} />
            ))}
          </section>

          <Separator className="bg-gray-300 my-4" />
        </Container>
        <Container fluid className="my-2 px-4 py-8 bg-white">
          <div className="flex flex-col justify-center items-center">
            <Button
              className="w-full max-w-64 mx-auto"
              onClick={() => {
                const luckyAd =
                  testAds[Math.floor(Math.random() * testAds.length)];
                if (luckyAd) {
                  navigate(`/ads/${luckyAd.id}`);
                  window.scrollTo(0, 0);

                  toast.message(
                    "Congrats! You've hit the jackpot of homes! This one's got walls, a roof, and even windows. What are the odds?",
                    { duration: 5000, icon: "🎉" }
                  );
                } else {
                  toast.message(
                    "Looks like the housing market is playing hide and seek! No homes found - maybe they're all out getting yard work done?",
                    { duration: 5000, icon: "🏡" }
                  );
                }
              }}
            >
              I'm Feeling Lucky
            </Button>
            <p className="text-black/70 text-center text-sm w-full mt-2 max-w-[500px]">
              <span className="font-bold">Disclaimer:</span>{" "}
              <span className="italic">'I'm Feeling Lucky'</span> may lead to
              spontaneous home discoveries. Side effects include laughter and
              sudden urges to redecorate. Click responsibly!
            </p>
          </div>
        </Container>
      </Container>
    </div>
  );
}
