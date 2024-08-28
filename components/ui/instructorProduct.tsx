import React, { useState } from "react";
import { Product as ProductType } from "@/types";
import Image from "next/image";
import useCart from "@/hooks/use-cart";
import { useRouter } from "next/navigation";

interface ProductProps {
  data: ProductType;
}

const Product: React.FC<ProductProps> = ({ data }) => {
  const cart = useCart();
  const router = useRouter(); 

  const handleOrder = () => {
    cart.addItem(data); // Add product to cart
    console.log(`Ordering Instructor product: ${data.name}`);
  };

  return (
    <tr className="bg-white border-b">
      <td className="p-4 relative h-24 w-24">
        <div className="relative h-full w-full">
          <Image
            src={data.program?.imageUrl || '/path/to/default-image.jpg'}
            alt={data.name}
            fill
            className="object-cover rounded"
          />
        </div>
      </td>
      <td className="p-4 text-gray-900">{data.name}</td>
      <td className="p-4 text-gray-900">${data.price}</td>
      <td className="p-4">
        <button
          onClick={handleOrder}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
        >
          Order
        </button>
      </td>
      <td className="p-4 text-gray-900">{data.quantity}</td>
    </tr>
  );
};

export default Product;
