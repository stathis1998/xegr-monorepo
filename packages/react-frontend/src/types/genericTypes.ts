import { UserType } from "./userTypes";

export type ModelsMetadata = {
  id: number;
  createdAt: string;
  updatedAt: string;
};

export type ApiResponse<TData> = {
  message: string;
  error?: string;
  data?: TData;
};

export type LoginResponse = {
  user: UserType;
  token: string;
} & ModelsMetadata;

export type RegisterResponse = {
  user: UserType;
  token: string;
} & ModelsMetadata;
