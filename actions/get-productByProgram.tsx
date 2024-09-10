import { Product } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

const getProductsByProgramId = async (programId: string): Promise<Product[]> => {
  try {
    const res = await fetch(`${URL}?programId=${programId}`, {
      headers: {
        'Cache-Control': 'no-store',
      },
    });
    
    // Log the response status and headers
    console.log('Response Status:', res.status);
    console.log('Response Headers:', res.headers);

    if (!res.ok) {
      throw new Error(`Failed to fetch products with status ${res.status}`);
    }

    // Log the response text to see if it's HTML or JSON
    const text = await res.text();
    console.log('Response Text:', text);

    // Attempt to parse the response as JSON
    const data = JSON.parse(text);
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export default getProductsByProgramId;
