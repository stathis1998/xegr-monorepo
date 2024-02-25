import { ModelsMetadata } from "./genericTypes";

export type ListingType = {
  name: "Sale" | "Rent" | "Lease";
} & ModelsMetadata;
