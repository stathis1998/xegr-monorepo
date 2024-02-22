import { useNavigate } from "react-router-dom";

import { AdModel } from "@/types/adTypes";
import { AdListing } from "./AdListing";
import { Button } from "./ui/button";

export type FeaturedListingsProps = {
  ads: AdModel[];
};

export function FeaturedListings(props: FeaturedListingsProps) {
  const { ads } = props;

  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <h1 className="font-bold">Featured Listings</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {ads.map((ad) => (
          <li key={ad.id}>
            <AdListing ad={ad} />
          </li>
        ))}
      </ul>
      <div className="flex">
        <Button
          className="w-full max-w-64 mx-auto"
          onClick={() => navigate("/ads")}
        >
          View All Listings
        </Button>
      </div>
    </div>
  );
}
