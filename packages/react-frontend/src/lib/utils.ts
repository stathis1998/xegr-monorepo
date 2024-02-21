import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";
import { toast } from "sonner";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type RequestType = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
export async function makeApiCall<T = any>(options: {
  url: string;
  method?: RequestType;
  data?: any;
  headers?: any;
}): Promise<T> {
  return axios({
    url: `http://${import.meta.env.VITE_SERVER_DOMAIN}:${
      import.meta.env.VITE_SERVER_PORT
    }/api/${options.url}`,
    method: options.method ?? "GET",
    data: options.data,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      ...options.headers,
    },
  }).then((res) => res.data);
}

export function handleError(error: Error) {
  if (axios.isAxiosError(error) && error.response) {
    const responseData = error.response.data;
    if (responseData && responseData.message) {
      toast.error(responseData.message);
      return;
    }

    toast.error("An unknown error occurred.");
  } else {
    toast.error(error.message);
  }
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString();
}
