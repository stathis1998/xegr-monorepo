import { ModelsMetadata } from "./genericTypes";

export type PropertyType = {
  name: "House" | "Apartment" | "Condo" | "Townhouse";
} & ModelsMetadata;
