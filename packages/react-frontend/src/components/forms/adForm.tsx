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
import { Combobox } from "../ui/combobox";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { makeApiCall } from "@/lib/utils";
import { toast } from "sonner";
import { XeGREndpointType } from "@/types/xegrTypes";

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
  userId: z.coerce.number(),
  placeId: z.string().min(1, {
    message: "Please select a place",
  }),
});

export type AdFormValues = z.infer<typeof formSchema>;

export type AdFormProps = {
  formId: string;
  onSubmit: (values: AdFormValues) => void;
};

export function AdForm(props: AdFormProps) {
  const { formId, onSubmit } = props;

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
      userId: 0,
      placeId: "",
    },
  });

  const { data: propertyTypes = [], isLoading: isPropertyTypesLoading } =
    useQuery({
      queryKey: ["propertyTypes"],
      queryFn: () =>
        makeApiCall<{ id: number; name: string }[]>({ url: "property-types" }),
    });

  const { data: listingTypes = [], isLoading: isListingTypesLoading } =
    useQuery({
      queryKey: ["listingTypes"],
      queryFn: () =>
        makeApiCall<{ id: number; name: string }[]>({ url: "listing-types" }),
    });

  const { data: places = [], isLoading: isPlacesLoading } = useQuery({
    queryKey: ["places"],
    queryFn: () => makeApiCall<XeGREndpointType[]>({ url: "places" }),
  });

  return (
    <Form {...form}>
      <form
        id={formId}
        onSubmit={form.handleSubmit(onSubmit, (errors) => {
          toast.error(
            `Please, fix the errors in the form: ${Object.keys(errors)
              .map((err) => err.toUpperCase())
              .join(", ")}`,
            { icon: "🚨" }
          );
        })}
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
        <div className="grid grid-cols-4 gap-2">
          <FormField
            control={form.control}
            name="placeId"
            render={({ field }) => (
              <FormItem className="col-span-3">
                <FormLabel>Place</FormLabel>
                <FormControl>
                  <Combobox
                    onChange={field.onChange}
                    value={field.value}
                    options={places.map((place) => ({
                      value: place.placeId,
                      label: place.mainText,
                    }))}
                  />
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
