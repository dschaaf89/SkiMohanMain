import { Product } from "@/types";
import qs from "query-string";

const URL=`${process.env.NEXT_PUBLIC_API_URL}/products`;

interface Query {
  programId?: string;
  typeId?: string;
  isFeatured?: boolean;
}

const getProducts = async (query: Query): Promise<Product[]> => {
  const url = qs.stringifyUrl({
    url: URL,
    query: { 
      typeId: query.typeId,
      programId: query.programId,
      isFeatured: query.isFeatured,
    },
  });

  const res = await fetch(url);

  return res.json();
};

export default getProducts;