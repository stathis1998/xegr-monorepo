import { useEffect, useState } from "react";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { DotFilledIcon, DotIcon } from "@radix-ui/react-icons";
import {
  FaBook,
  FaPen,
  FaPhone,
  FaRegHeart,
  FaShare,
  FaTrash,
} from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatDate, makeApiCall } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useQuery } from "@tanstack/react-query";
import { AdType } from "@/types/adTypes";

import svg from "@/assets/svg/undraw_sweet_home_dkhr.svg";
import { useUser } from "@/hooks/useUser";

export type AdViewProps = {};

export function AdView(props: AdViewProps) {
  const {} = props;

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { data: ad } = useQuery({
    queryKey: ["ad"],
    queryFn: async () => {
      const adId = pathname.split("/").filter(Boolean).pop();

      if (!adId) {
        throw new Error("Ad ID not found in URL");
      }

      return makeApiCall<AdType>({
        url: `ads/${adId}`,
      })
        .then((response) => response.data)
        .catch((error) => {
          toast.error(error.response.data.message);
          throw new Error(error.response.data.message);
        });
    },
    throwOnError: true,
  });

  const [slideIndex, setSlideIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) {
      return;
    }

    setSlideIndex(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setSlideIndex(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const user = useUser();

  function handleDelete() {
    makeApiCall({
      url: `ads/${ad?.id}`,
      method: "DELETE",
    })
      .then(() => {
        toast.success("The listing has been deleted!", {
          icon: "🗑️",
        });
        navigate("/ads");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  }

  if (!ad) {
    return null;
  }

  return (
    <div>
      <div className="bg-gray-200/50 p-4 shadow text-center">
        <h1 className="font-bold">
          Home Sweet Home: Unveiling Your Next Chapter
        </h1>
        <p className="text-black/50 text-sm">
          Dive into the details of a place where memories await and every nook
          tells a story.
        </p>
      </div>
      <Container fluid>
        <Container className="p-4 space-y-2 max-w-4xl">
          <div>
            <div className="flex justify-between items-center p-1">
              <h1 className="font-bold text-lg">Ad Details</h1>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="link">Report Ad</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Confirm Report of Listing
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to report this listing? Please
                      confirm that this listing violates our{" "}
                      <Link
                        className="font-bold underline"
                        to={"/terms-of-service"}
                      >
                        terms of service
                      </Link>{" "}
                      or{" "}
                      <Link
                        className="font-bold underline"
                        to={"/community-guidelines"}
                      >
                        community guidelines
                      </Link>
                      . Reporting is anonymous and helps us maintain a safe and
                      trustworthy environment for all users. Thank you for
                      taking the time to help improve our community.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() =>
                        toast.success("The report has been submitted!", {
                          icon: "🗃️",
                        })
                      }
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between items-center">
              <div className="grid grid-cols-2 max-w-[150px] text-sm py-2">
                <p>Created At:</p>
                <span className="font-bold">{formatDate(ad.createdAt)}</span>
                <p>Updated At:</p>
                <span className="font-bold">{formatDate(ad.updatedAt)}</span>
              </div>
              {user.id !== ad.userId ? (
                <div className="flex gap-2">
                  <Button>
                    <FaBook />
                    <span className="hidden sm:ml-2 sm:block">
                      Book Listing
                    </span>
                  </Button>
                </div>
              ) : (
                <div className="flex gap-1">
                  <Button className="group">
                    <FaPen className="group-hover:fill-blue-500" />
                    <span className="hidden sm:ml-2 sm:block">
                      Edit Listing
                    </span>
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button className="group">
                        <FaTrash className="group-hover:fill-red-500" />
                        <span className="hidden sm:ml-2 sm:block">
                          Delete Listing
                        </span>
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your account and remove your data from our
                          servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete()}>
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              )}
            </div>
          </div>
          <div className="relative">
            <Carousel setApi={setApi}>
              <CarouselContent>
                {ad.images?.map((image, index) => (
                  <CarouselItem key={index}>
                    <img
                      src={image.url}
                      className="w-full h-[250px] object-cover rounded shadow-lg border-2 border-black/30"
                      alt={image.alt}
                    />
                  </CarouselItem>
                ))}
                {!ad.images?.length && (
                  <CarouselItem>
                    <img
                      src="https://via.placeholder.com/1920x1080?text=No+Image+Available"
                      className="w-full h-[250px] object-cover rounded shadow-lg border-2 border-black/30"
                      alt="Placeholder Image"
                    />
                  </CarouselItem>
                )}
              </CarouselContent>
              <div className="absolute z-50 bottom-1 left-0 right-0 flex justify-center">
                <div
                  className="w-30 flex gap-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  {ad.images?.map((_, index) => {
                    if (index === slideIndex - 1) {
                      return <DotFilledIcon className="w-5 h-5" key={index} />;
                    }

                    return (
                      <DotIcon
                        className="w-5 h-5"
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          api?.scrollTo(index);
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            </Carousel>
          </div>
          <Separator className="bg-gray-300/50" />
          <section className="grid grid-cols-3 gap-2 px-4 pt-1">
            <Button className="w-full" variant={"outline"}>
              <FaPhone />
              <span className="ml-2 hidden sm:block">Contact Seller</span>
            </Button>
            <Button className="w-full" variant={"outline"}>
              <FaRegHeart />
              <span className="ml-2 hidden sm:block">Favorite</span>
            </Button>
            <Button className="w-full" variant={"outline"}>
              <FaShare />
              <span className="ml-2 hidden sm:block">Share</span>
            </Button>
          </section>
        </Container>
        <Container fluid className="bg-white p-6">
          <Container className="max-w-4xl mx-auto">
            <div className="flex flex-col gap-6 md:flex-row">
              <section className="w-full md:w-1/2 space-y-4 flex flex-col justify-center">
                <div className="w-full">
                  <h1 className="font-bold tracking-wide">Property Details</h1>
                  <Separator className="my-2" />
                  <div className="text-sm">
                    <div className="flex">
                      <span className="w-36">Area:</span>
                      <span className="font-bold">{ad.area} m²</span>
                    </div>
                    <div className="flex">
                      <span className="w-36">Bedrooms:</span>
                      <span className="font-bold">{ad.bedrooms}</span>
                    </div>
                    <div className="flex">
                      <span className="w-36">Bathrooms:</span>
                      <span className="font-bold">{ad.bathrooms}</span>
                    </div>
                    <div className="flex">
                      <span className="w-36">Property Type:</span>
                      <span className="font-bold">{ad.propertyType}</span>
                    </div>
                    <div className="flex">
                      <span className="w-36">Listing Type:</span>
                      <span className="font-bold">{ad.listingType}</span>
                    </div>
                  </div>
                </div>

                <div className="w-full">
                  <h1 className="font-bold tracking-wide">Location</h1>
                  <Separator className="my-2" />
                  <div className="text-sm">
                    <div className="flex">
                      <span className="w-36">Address:</span>
                      <span className="font-bold col-span-2">{ad.address}</span>
                    </div>
                    <div className="flex">
                      <span className="w-36">Place ID:</span>
                      <span
                        className="font-bold col-span-2 text-blue-500 underline cursor-pointer"
                        onClick={() => {
                          toast.message(
                            "Place ID copied to clipboard so you can decode it! (only works in secure contexts)",
                            {
                              icon: "📋",
                            }
                          );

                          navigator.clipboard.writeText(ad.placeId);
                        }}
                      >
                        {ad.placeId}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="w-full">
                  <h1 className="font-bold tracking-wide">Description</h1>
                  <Separator className="my-2" />
                  <div className="text-sm">
                    <div>{ad.description}</div>
                  </div>
                </div>
              </section>
              <section className="w-full md:w-1/2">
                <img src={svg} alt="home" className="hmd:w-full" />
              </section>
            </div>
            <Separator className="my-4" />
            <div className="flex justify-center items-center gap-2 my-4">
              <Button
                className="w-full max-w-64 mx-auto"
                onClick={() => navigate("/ads")}
              >
                Browse More Listings
              </Button>
            </div>
          </Container>
        </Container>
      </Container>
    </div>
  );
}
