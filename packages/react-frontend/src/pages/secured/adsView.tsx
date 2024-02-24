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
import { AdForm, AdFormValues } from "@/components/forms/adForm";
import { useState } from "react";
import { Combobox } from "@/components/ui/combobox";
import { makeApiCall } from "@/lib/utils";
import { GenericType } from "@/types/genericTypes";
import { useQuery } from "@tanstack/react-query";

export type AdsViewProps = {};

export function AdsView(props: AdsViewProps) {
  const {} = props;

  const navigate = useNavigate();

  const [createListingOpen, setCreateListingOpen] = useState(false);

  const { data: ads = [], isLoading } = useQuery({
    queryKey: ["ads"],
    queryFn: () => makeApiCall({ url: "ads" }),
  });

  function handleAdCreation(values: AdFormValues) {
    const user = localStorage.getItem("user");
    if (!user) {
      toast.error("You must be logged in to create a listing");
      return;
    }

    makeApiCall<AdFormValues & GenericType>({
      url: "ads/create",
      method: "POST",
      data: {
        userId: JSON.parse(user).id,
        ...values,
      },
    })
      .then((response) => {
        console.log(response);
        return;
        setCreateListingOpen(false);
        toast.success("Listing created successfully!", { icon: "🎉" });
        navigate(`/ads/${response.id}`);
        window.scrollTo(0, 0);
      })
      .catch((error) => {
        if (error?.response?.data?.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error("An error occurred. Please try again later.");
        }
      });
  }

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
              <Dialog
                open={createListingOpen}
                onOpenChange={setCreateListingOpen}
              >
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
                  <AdForm
                    formId="create-listing-form"
                    onSubmit={(values) => handleAdCreation(values)}
                  />
                  <Separator />
                  <DialogFooter className="gap-2">
                    <Button
                      variant="ghost"
                      onClick={() => setCreateListingOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button form="create-listing-form" type="submit">
                      Create
                    </Button>
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
            <EmptyArea onClick={() => setCreateListingOpen(true)} />
            {ads.map((ad: AdFormValues & GenericType) => (
              <AdListing key={ad.id} ad={ad} />
            ))}
            {!ads && isLoading && (
              <div className="flex flex-col gap-4">
                <EmptyArea />
                <EmptyArea />
                <EmptyArea />
                <EmptyArea />
              </div>
            )}
          </section>

          <Separator className="bg-gray-300 my-4" />
        </Container>
        <Container fluid className="my-2 px-4 py-8 bg-white">
          <div className="flex flex-col justify-center items-center">
            <Button
              className="w-full max-w-64 mx-auto"
              onClick={() => {
                const luckyAd = ads[Math.floor(Math.random() * ads.length)];
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
