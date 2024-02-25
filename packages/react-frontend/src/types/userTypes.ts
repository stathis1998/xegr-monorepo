import { ModelsMetadata } from "./genericTypes";

export type UserType = {
  username: string;
  password: string;
} & ModelsMetadata;
