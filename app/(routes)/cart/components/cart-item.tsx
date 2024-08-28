import Image from "next/image";
import { X } from "lucide-react";

import IconButton from "@/components/ui/icon-button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { Product } from "@/types";

interface CartItemProps {
  data: Product & { quantity: number };
}

const CartItem: React.FC<CartItemProps> = ({ data }) => {
  const cart = useCart();

  const onRemove = () => {
    cart.removeItem(data.id);
  };

  const imageUrl = data.program?.imageUrl || "/placeholder.png";

  return (
    <li className="flex py-6 border-b">
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
      <Image
          src={imageUrl}
          alt={data.name || "Product Image"}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="rounded-md"
        />
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-lg font-semibold text-black">
              {data.name}
            </p>
            <p className="text-sm text-gray-500">{data.program.name}</p>
            <p className="text-sm text-gray-500">Quantity: {data.quantity}</p> {/* Display Quantity */}
          </div>
          <div className="flex items-center space-x-4">
            <Currency value={Number(data.price) * data.quantity} /> {/* Display total price */}
            <IconButton onClick={onRemove} icon={<X size={15} />} /> {/* Remove button */}
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
