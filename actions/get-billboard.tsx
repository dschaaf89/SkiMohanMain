import { Product } from "@/types";
import fetch from 'node-fetch';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

const getProductsByProgramId = async (programId: string): Promise<Product[]> => {
  const res = await fetch(`${URL}?programId=${programId}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch products with status ${res.status}`);
  }

  const contentType = res.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    const text = await res.text();
    console.error('Expected JSON, but received:', text);
    throw new Error('Received non-JSON response. Possibly a sign-in redirect.');
  }

  const data = await res.json();
  console.log('API Response:', data);
  return Array.isArray(data) ? data : [];
};

export default getProductsByProgramId;
