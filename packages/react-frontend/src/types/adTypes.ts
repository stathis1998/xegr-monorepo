import { AdFormValues } from "@/components/forms/adForm";
import { ModelsMetadata } from "./genericTypes";
import { ImageType } from "./imageTypes";

export type AdType = {
  userId: number;
  images?: ImageType[];
} & AdFormValues &
  ModelsMetadata;
