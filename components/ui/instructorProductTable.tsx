"use client";

import React from 'react';
import Product from "./product"; // Adjust the import path if necessary
import { Product as ProductType } from "@/types"; // Adjust the import path as needed

interface ProductsTableProps {
  products: ProductType[];
}

const ProductsTable: React.FC<ProductsTableProps> = ({ products }) => {
  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Price</th>
          <th>Order</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <Product key={product.id} data={product} />
        ))}
      </tbody>
    </table>
  );
};

export default ProductsTable;
