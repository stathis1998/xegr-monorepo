import { FaChartLine, FaHeadset, FaMagnifyingGlass } from "react-icons/fa6";
import { Card, CardContent, CardFooter, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { toast } from "sonner";

export interface ServicesListingsProps {}

export function ServicesListings(props: ServicesListingsProps) {
  const {} = props;

  return (
    <div className="max-w-96 md:max-w-full mx-auto">
      <ul className="grid grid-cols-1 md:grid-cols-3 place-items-center gap-4">
        <li className="h-full">
          <Card className="h-full flex flex-col">
            <CardTitle className="p-4 text-center">
              Extensive Property Listings{" "}
              <FaMagnifyingGlass className="inline-block ml-2" />
            </CardTitle>
            <CardContent className="text-sm text-center flex-1">
              Dive into a vast selection of properties. Whether you're looking
              for a modern apartment, a cozy house, or a luxurious villa, our
              comprehensive listings cater to all tastes and budgets.
            </CardContent>
            <CardFooter className="flex-col">
              <Separator className="mb-2" />
              <Button
                className="w-full"
                onClick={() =>
                  toast.message(
                    "Whoops! Looks like our dream homes are still in the clouds. This feature will be landing soon!",
                    { duration: 5000 }
                  )
                }
              >
                Find Your Dream Home
              </Button>
            </CardFooter>
          </Card>
        </li>
        <li className="h-full">
          <Card className="h-full flex flex-col">
            <CardTitle className="p-4 text-center">
              Tailored Real Estate Advice{" "}
              <FaHeadset className="inline-block ml-2" />
            </CardTitle>
            <CardContent className="text-sm text-center flex-1">
              Get expert guidance tailored to your needs. Our experienced agents
              offer personalized consultations, helping you navigate the market,
              understand legal requirements, and make informed decisions.
            </CardContent>
            <CardFooter className="flex-col">
              <Separator className="mb-2" />
              <Button
                className="w-full"
                onClick={() =>
                  toast.message(
                    "Ah, we'd love to chat, but our consultants are out exploring the market. Hang tight, we'll be ready for real talks shortly!",
                    { duration: 5000 }
                  )
                }
              >
                Book a Consultation
              </Button>
            </CardFooter>
          </Card>
        </li>
        <li className="h-full">
          <Card className="h-full flex flex-col">
            <CardTitle className="p-4 text-center">
              Real-Time Market Insights{" "}
              <FaChartLine className="inline-block ml-2" />
            </CardTitle>
            <CardContent className="text-sm text-center flex-1">
              Stay ahead with up-to-date market analysis and trends. Our
              real-time insights give you an edge in making strategic decisions,
              whether you're buying, selling, or investing.
            </CardContent>
            <CardFooter className="flex-col">
              <Separator className="mb-2" />
              <Button
                className="w-full"
                onClick={() =>
                  toast.message(
                    "Our crystal ball is a bit cloudy at the moment. Stay tuned for when our insights become as clear as day!",
                    { duration: 5000 }
                  )
                }
              >
                Get Market Insights
              </Button>
            </CardFooter>
          </Card>
        </li>
      </ul>
    </div>
  );
}
