"use client"

import React from 'react';
import Product from "./product"; // Make sure the import is correct
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
