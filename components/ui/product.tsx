import React, { useState } from "react"; // Add useState import
import { Product as ProductType } from "@/types";
import Image from "next/image";
import useCart from "@/hooks/use-cart";
import { useRouter } from "next/navigation";
import StudentFormModal from "../StudentFormModal"; // Import the modal
import { StudentFormValues } from "@/components/ui/studentSignUpForm"; // Import StudentFormValues
import axios from 'axios';
interface ProductProps {
  data: ProductType;
}

const Product: React.FC<ProductProps> = ({ data }) => {
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false); // Add state for the modal
  const cart = useCart();
  const router = useRouter(); // Always call the hook

  const handleOrder = () => {
    cart.addItem(data);
    console.log(`Ordering product: ${data.name}`);
  };

  const handleWaitlist = () => {
    setIsWaitlistModalOpen(true);
  };

  const handleWaitlistSubmit = async (formData: StudentFormValues) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/students/waitlist`, {
        ...formData,
        productId: data.id, // Sending the product ID
        seasonId: process.env.NEXT_PUBLIC_SEASON_ID, // Add seasonId to the request body
      });
  
      if (response.status === 200 || response.status === 201) {
        // Close the modal and show success
        setIsWaitlistModalOpen(false);
        alert("Successfully added to waitlist!");
      } else {
        alert("Failed to join waitlist.");
      }
    } catch (error) {
      console.error("Error joining waitlist:", error);
      alert("An error occurred.");
    }
  };

  return (
    <>
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
        <td className="p-4 text-gray-900">{data.title}</td>
        <td className="p-4 text-gray-900">${data.price}</td>
        <td className="p-4">
          {data.quantity > 0 ? (
            <button
              onClick={handleOrder}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
              disabled={true} 
            >
              Order
            </button>
          ) : (
            <button
              onClick={handleWaitlist}
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700 transition duration-300"
            >
              Join Waitlist
            </button>
          )}
        </td>
        <td className="p-4 text-gray-900">{data.quantity}</td>
      </tr>

      <StudentFormModal
        isOpen={isWaitlistModalOpen}
        onClose={() => setIsWaitlistModalOpen(false)}
        onSubmit={handleWaitlistSubmit}
        currentSlot={1} // You can adjust this if needed
        programCode={data.name} // Assuming name is the program code
      />
    </>
  );
};

export default Product;
