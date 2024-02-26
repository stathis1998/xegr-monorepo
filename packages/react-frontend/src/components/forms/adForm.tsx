import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { useQuery } from "@tanstack/react-query";
import { makeApiCall } from "@/lib/utils";
import { toast } from "sonner";
import { XeGREndpointType } from "@/types/xegrTypes";
import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { FaCheck, FaMagnifyingGlass } from "react-icons/fa6";
import { PropertyType } from "@/types/propertyTypes";
import { ListingType } from "@/types/listingTypes";

const formSchema = z.object({
  title: z.string().min(3).max(155),
  description: z.string().optional(),
  price: z.coerce.number().min(0),
  propertyType: z.string().min(1, {
    message: "Please select a property type",
  }),
  listingType: z.string().min(1, {
    message: "Please select a listing type",
  }),
  address: z.string().min(3).max(155),
  bedrooms: z.coerce.number().min(0),
  bathrooms: z.coerce.number().min(0),
  area: z.coerce.number().min(0),
  placeId: z.string().min(1, {
    message: "Please select a place",
  }),
});

export type AdFormValues = z.infer<typeof formSchema>;

export type AdFormProps = {
  formId: string;
  onSubmit: (values: AdFormValues) => void;
  ad?: AdFormValues;
};

export function AdForm(props: AdFormProps) {
  const { formId, onSubmit, ad } = props;

  const form = useForm<AdFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      propertyType: "",
      listingType: "",
      address: "",
      bedrooms: 0,
      bathrooms: 0,
      area: 0,
      placeId: "",
      ...ad,
    },
  });

  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue);
  const [selectedItem, setSelectedItem] = useState<XeGREndpointType>();
  const [placePopoverOpen, setPlacePopoverOpen] = useState(false);

  const { data: propertyTypes = [], isLoading: isPropertyTypesLoading } =
    useQuery({
      queryKey: ["propertyTypes"],
      queryFn: async () => {
        return makeApiCall<PropertyType[]>({
          url: "property-types",
        })
          .then((reponse) => {
            if (reponse && reponse.data) {
              return reponse.data;
            }
          })
          .catch(() => {
            toast.error("Error getting property types");
          });
      },
      throwOnError: true,
    });

  const { data: listingTypes = [], isLoading: isListingTypesLoading } =
    useQuery({
      queryKey: ["listingTypes"],
      queryFn: async () => {
        const response = await makeApiCall<ListingType[]>({
          url: "listing-types",
        });

        if (response && response.data) {
          return response.data;
        }

        throw new Error("Unexpected response format");
      },
    });

  const { data: places = [] } = useQuery({
    queryKey: ["places", debouncedSearchValue],
    queryFn: async () => {
      const response = await makeApiCall<XeGREndpointType[]>({
        url: "places",
        params: new URLSearchParams({ input: debouncedSearchValue }),
      });

      if (response && response.data) {
        return response.data;
      }

      throw new Error("Unexpected response format");
    },
    enabled: !!debouncedSearchValue.length,
    throwOnError: true,
    retry: true,
  });

  return (
    <Form {...form}>
      <form
        id={formId}
        onSubmit={form.handleSubmit(
          (data) => {
            onSubmit(data);
          },
          (errors) => {
            toast.error(
              `Please, fix the errors in the form: ${Object.keys(errors)
                .map((err) => err.toUpperCase())
                .join(", ")}`,
              { icon: "🚨" }
            );
          }
        )}
        className="space-y-2"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} className="resize-none" rows={5} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="placeId"
          render={() => (
            <FormItem className="col-span-3">
              <FormLabel>Place</FormLabel>
              <Popover
                open={placePopoverOpen}
                onOpenChange={setPlacePopoverOpen}
              >
                <FormControl className="block w-full">
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      className="w-full text-ellipsis"
                      variant={"outline"}
                    >
                      {selectedItem && (
                        <div className="flex justify-center gap-2 w-full items-center">
                          <span>{selectedItem.mainText}</span>/
                          <span>{selectedItem.secondaryText}</span>
                        </div>
                      )}

                      {!selectedItem &&
                        !form.getValues("placeId") &&
                        "Select a place"}
                      {!selectedItem && form.getValues("placeId")}
                    </Button>
                  </PopoverTrigger>
                </FormControl>
                <PopoverContent className="popover-content p-2">
                  <div className="relative">
                    <input
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      placeholder="Search for a place..."
                      className="pl-8 w-full outline-none text-sm"
                    />
                    <FaMagnifyingGlass className="absolute top-1/2 -translate-y-1/2 left-2 w-3 h-3" />
                  </div>
                  <Separator className="my-2" />
                  <ul className="flex flex-col gap-1 p-2">
                    {places.map((place) => (
                      <li
                        key={place.placeId}
                        className="text-sm cursor-pointer hover:bg-gray-100 py-1 rounded transition-all flex items-center justify-between px-2"
                        onClick={() => {
                          setSelectedItem((prev) => {
                            if (prev?.placeId === place.placeId) {
                              form.setValue("placeId", "");
                              return undefined;
                            }
                            form.setValue("placeId", place.placeId);
                            return place;
                          });
                        }}
                      >
                        <div className="flex gap-2">
                          <div>{place.mainText}</div>/
                          <div>{place.secondaryText}</div>
                        </div>
                        {place.placeId === form.getValues("placeId") && (
                          <FaCheck className="w-4 h-4" />
                        )}
                      </li>
                    ))}
                    {places.length === 0 && (
                      <li className="text-sm text-gray-500 px-2 py-1">
                        No places found
                      </li>
                    )}
                  </ul>
                  <Separator />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-3 gap-2">
          <FormField
            control={form.control}
            name="bedrooms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bedrooms</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bathrooms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bathrooms</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="area"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Area</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="propertyType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Property Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {propertyTypes.map((type) => (
                      <SelectItem key={type.id} value={type.name}>
                        {type.name}
                      </SelectItem>
                    ))}
                    {isPropertyTypesLoading && (
                      <SelectItem disabled value="Loading...">
                        Loading...
                      </SelectItem>
                    )}
                    {!isPropertyTypesLoading && propertyTypes.length === 0 && (
                      <SelectItem disabled value="No property types found">
                        No property types found
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="listingType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Listing Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {listingTypes.map((type) => (
                      <SelectItem key={type.id} value={type.name}>
                        {type.name}
                      </SelectItem>
                    ))}
                    {isListingTypesLoading && (
                      <SelectItem disabled value="Loading...">
                        Loading...
                      </SelectItem>
                    )}
                    {!isListingTypesLoading && listingTypes.length === 0 && (
                      <SelectItem disabled value="No listing types found">
                        No listing types found
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-4 gap-2">
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="col-span-3">
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
}
