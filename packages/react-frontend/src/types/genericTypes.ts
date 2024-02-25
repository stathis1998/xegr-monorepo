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
