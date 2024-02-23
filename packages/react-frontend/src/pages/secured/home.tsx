import { FeaturedListings } from "@/components/FeaturedListings";

import { AdModel } from "@/types/adTypes";
import { Separator } from "@/components/ui/separator";
import { Container } from "@/components/container";
import { ServicesListings } from "@/components/ServicesListings";

export type HomeProps = {};

export function Home(props: HomeProps) {
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
    // {
    //   id: 3,
    //   title: "House",
    //   description: "A house in good condition",
    //   price: 100000,
    //   address: "1234 Main St",
    //   area: 400,
    //   bedrooms: 2,
    //   bathrooms: 1,
    //   placeId: "1234",
    //   propertyType: "House",
    //   userId: 1,
    //   createdAt: new Date().toISOString(),
    //   updatedAt: new Date().toISOString(),
    // },
  ];

  return (
    <div className="py-4">
      <Container className="px-4">
        <header className="text-center">
          <h1 className="font-bold">
            Welcome to XEGR - Your Destination for Home
          </h1>
          <p className="text-black/70">
            Search for stuff to rent or buy from other people in your community.
          </p>
        </header>
      </Container>
      <main>
        <Container className="px-4">
          <Separator className="bg-gray-300 my-4" />
          <section>
            <FeaturedListings ads={testAds} />
          </section>
        </Container>
        <Container fluid className="my-10 p-4 bg-white">
          <header className="text-center">
            <h1 className="font-bold">
              Services we offer to help you find your next home
            </h1>
            <p className="text-black/70">
              We offer a variety of services to help you find your next home.
            </p>
          </header>
          <section>
            <Container>
              <Separator className="my-4" />
              <ServicesListings />
            </Container>
          </section>
        </Container>
      </main>
    </div>
  );
}
