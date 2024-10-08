interface CartItemInfoProps {
  product: {
    name: string;
    program: string;
    price: number;
    quantity: number;
  };
}

const CartItemInfo: React.FC<CartItemInfoProps> = ({ product }) => {
  return (
    <div>
      <div className="flex justify-between">
        <p className="text-sm font-semibold text-black">
          {product.name}
        </p>
      </div>

      <div className="mt-1 flex text-sm">
        <p className="text-gray-500">{product.program}</p>
      </div>
      
      <p className="mt-1 text-sm font-medium text-gray-900">
        Quantity: {product.quantity}
      </p>

      <p className="mt-1 text-sm font-medium text-gray-900">
        Total Price: ${product.price * product.quantity}
      </p>
    </div>
  );
};

export default CartItemInfo;
