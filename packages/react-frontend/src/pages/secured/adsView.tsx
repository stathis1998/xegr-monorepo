import { AdListing } from "@/components/AdListing";
import { FilterButton } from "@/components/FilterButton";
import { Container } from "@/components/container";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AdModel } from "@/types/adTypes";

export type AdsViewProps = {};

export function AdsView(props: AdsViewProps) {
  const {} = props;

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

        <Separator className="bg-gray-300 my-4" />

        <section className="flex-grow h-0 overflow-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: 20 }).map((_, index) => (
            <AdListing key={index} ad={testAds[index % 3]} />
          ))}
        </section>
      </Container>
    </div>
  );
}
