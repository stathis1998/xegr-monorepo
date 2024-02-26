import { FeaturedListings } from "@/components/FeaturedListings";

import { AdType } from "@/types/adTypes";
import { Separator } from "@/components/ui/separator";
import { Container } from "@/components/container";
import { ServicesListings } from "@/components/ServicesListings";
import { useQuery } from "@tanstack/react-query";
import { makeApiCall } from "@/lib/utils";
import { toast } from "sonner";

export type HomeProps = {};

export function Home(props: HomeProps) {
  const {} = props;

  const { data: ads = [] } = useQuery({
    queryKey: ["ads"],
    queryFn: async () => {
      return makeApiCall<AdType[]>({
        url: "ads",
        params: new URLSearchParams({ limit: "3" }),
      })
        .then((response) => {
          if (response && response.data) {
            return response.data;
          }

          throw new Error("An error occurred while fetching ads.");
        })
        .catch((error) => {
          toast.error(
            error?.response?.data?.message ??
              "An error occurred. Please try again later."
          );
        });
    },
  });

  return (
    <div className="py-4">
      <Container className="px-4 py-6">
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
            <FeaturedListings ads={ads} />
          </section>
        </Container>
        <Container fluid className="my-10 px-4 py-12 bg-white">
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
