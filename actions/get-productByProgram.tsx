import { Product } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

const getProductsByProgramId = async (programId: string): Promise<Product[]> => {
  const res = await fetch(`${URL}?programId=${programId}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch products with status ${res.status}`);
  }

  return res.json();
};

export default getProductsByProgramId;