import { Product } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;
const getProductsByProgramId = async (programId: string): Promise<Product[]> => {
  try {
    const res = await fetch(`${URL}?programId=${programId}`, {
      method: 'GET',
      headers: {
     
        'Cache-Control': 'no-store',
        // Add custom headers here if needed
      },
      credentials: 'include', // Ensures cookies are sent along with requests, adjust if needed
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch products with status ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};


export default getProductsByProgramId;
