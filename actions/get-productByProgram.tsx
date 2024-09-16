import { Product } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

const getProductsByProgramId = async (programId: string): Promise<Product[]> => {
  try {
    // Log the full URL to ensure it's correct
    console.log(`Fetching products from: ${URL}?programId=${programId}`);

    // Add the programId as a query parameter
    const res = await fetch(`${URL}?programId=${programId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Log the response status for debugging
    console.log("Response status:", res.status);

    if (!res.ok) {
      throw new Error(`Failed to fetch products. Status: ${res.status}`);
    }

    // Attempt to parse the response as JSON
    const data = await res.json();
    console.log("Fetched data:", data); // Log fetched data to check its structure
    return data;
  } catch (error) {
    console.error("Error in getProductsByProgramId:", error);
    throw error;
  }
};

export default getProductsByProgramId;