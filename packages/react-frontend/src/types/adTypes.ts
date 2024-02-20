import { PropertyTypeModel } from "./propertyTypes";

export type AdModel = {
  id?: number;
  title: string;
  description: string;
  price: number;
  propertyType: PropertyTypeModel;
  address: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  userId: number;
  placeId: string;
  createdAt?: string;
  updatedAt?: string;
};
