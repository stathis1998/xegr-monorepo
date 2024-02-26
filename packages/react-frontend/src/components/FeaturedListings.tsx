import { useNavigate } from "react-router-dom";

import { AdType } from "@/types/adTypes";
import { AdListing } from "./AdListing";
import { Button } from "./ui/button";
import { EmptyArea } from "./EmptyArea";

export type FeaturedListingsProps = {
  ads: AdType[];
};

export function FeaturedListings(props: FeaturedListingsProps) {
  const { ads } = props;

  const navigate = useNavigate();

  return (
    <div className="space-y-4 max-w-[500px] md:max-w-full mx-auto">
      <h1 className="font-bold">Featured Listings</h1>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, index) => {
          if (ads.length > index) {
            return <AdListing key={index} ad={ads[index]} />;
          }
          return <EmptyArea key={index} />;
        })}
      </ul>
      <div className="flex">
        <Button
          className="w-full max-w-64 mx-auto"
          onClick={() => {
            navigate("/ads");
            window.scrollTo(0, 0);
          }}
        >
          View All Listings
        </Button>
      </div>
    </div>
  );
}
