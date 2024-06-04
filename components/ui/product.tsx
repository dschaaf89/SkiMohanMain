"use client";

import React from "react";
import { Product as ProductType } from "@/types";
import Image from "next/image";
import useCart from "@/hooks/use-cart";

interface ProductProps {
  data: ProductType;
}

const Product: React.FC<ProductProps> = ({ data }) => {
  const imageUrl = data.images?.[0]?.url;
  const productName = data.name;
  const productPrice = data.price;
  const productType = data.type.name;

  const cart = useCart(); // Correctly invoke the hook here

  const handleOrder = () => {
    cart.addItem(data);
    console.log(`Ordering product: ${productName}`);
  };

  return (
    <tr className="bg-white border-b">
      <td className="p-4 relative h-24 w-24">
        <div className="relative h-full w-full">
          <Image
            src={imageUrl}
            alt={productName}
            fill
            className="object-cover rounded"
          />
        </div>
      </td>
      <td className="p-4 text-gray-900">{productType}</td>
      <td className="p-4 text-gray-900">${productPrice}</td>
      <td className="p-4">
        <button
          onClick={handleOrder}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
        >
          Order
        </button>
      </td>
    </tr>
  );
};

export default Product;
