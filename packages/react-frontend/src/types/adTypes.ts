import { AdFormValues } from "@/components/forms/adForm";
import { ModelsMetadata } from "./genericTypes";

export type AdType = {
  userId: number;
} & AdFormValues &
  ModelsMetadata;
