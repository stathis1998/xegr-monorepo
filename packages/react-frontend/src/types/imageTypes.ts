import { ModelsMetadata } from "./genericTypes";

export type ImageType = {
  width: number;
  height: number;
  url: string;
  alt: string;
  adId: number;
} & ModelsMetadata;
