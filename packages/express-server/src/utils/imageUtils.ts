import { createClient } from "pexels";

const pexelsApiKey = process.env.PEXELS_API_KEY;
if (!pexelsApiKey) {
  throw new Error("Pexels API key is not defined");
}

const client = createClient(pexelsApiKey);

const dummyState: { [key: string]: { index: number } } = {};

function calculatePage(query: string, items: number): number {
  if (!dummyState[query]) {
    dummyState[query] = { index: 0 };
  }

  dummyState[query].index += items + Math.floor(Math.random() * 5);
  return Math.floor(dummyState[query].index / items) + 1;
}

export async function searchPhotos(query: string, items: number) {
  if (!query || !items) return [];

  const results: any = await client.photos.search({
    query,
    per_page: items,
    orientation: "landscape",
    page: calculatePage(query, items),
  });

  if (results instanceof Error || !results) {
    throw new Error("Failed to fetch photos");
  }

  return results.photos;
}
