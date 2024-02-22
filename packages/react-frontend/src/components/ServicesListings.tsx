import { FaChartLine, FaHeadset, FaMagnifyingGlass } from "react-icons/fa6";
import { Card, CardContent, CardFooter, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

export interface ServicesListingsProps {}

export function ServicesListings(props: ServicesListingsProps) {
  const {} = props;

  return (
    <div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 place-items-center gap-4">
        <li>
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
            <CardFooter>
              <Button className="w-full">Find Your Dream Home</Button>
            </CardFooter>
          </Card>
        </li>
        <li>
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
            <CardFooter>
              <Button className="w-full">Book a Consultation</Button>
            </CardFooter>
          </Card>
        </li>
        <li>
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
            <CardFooter>
              <Button className="w-full">Get Market Insights</Button>
            </CardFooter>
          </Card>
        </li>
      </ul>
    </div>
  );
}
