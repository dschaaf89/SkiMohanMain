"use client";

import axios from "axios";
import { Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { toast } from "react-hot-toast";
import { useUser } from '@clerk/nextjs';
const SummaryComponent = () => {
  const { user } = useUser();
  const searchParams = useSearchParams();
  const router = useRouter();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);
  const userId = user?.id; 
  console.log("user id is :",userId);
  const seasonId = "3523ea0b-4dc2-4efb-be8d-10e1740d2f63"; // This should be dynamically set

  useEffect(() => {
    if (searchParams.get('success')) {
      toast.success('Payment completed.');
      removeAll();
      // Redirect to the student sign-up form page with the purchased items
      router.push(`/student-signup?items=${encodeURIComponent(JSON.stringify(items))}`);
    }

    if (searchParams.get('canceled')) {
      toast.error('Something went wrong.');
    }
  }, [searchParams, removeAll, router, items]);

  // Calculate the total price considering the quantity of each item
  const totalPrice = items.reduce((total, item) => {
    return total + (Number(item.price) * item.quantity); // Update to multiply by quantity
  }, 0);
  const onCheckout = async () => {
    try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/checkout`;

        // Prepare items to send to the backend
        const itemsWithProgramCodes = items.map((item) => ({ id: item.id, quantity: item.quantity, programCode: item.name }));
        
        const response = await axios.post(url, {
            items: itemsWithProgramCodes,
            userId: user?.id,
        });

        const paymentDetails = {
            totalAmount: totalPrice,
            paymentMethod: response.data.paymentMethod,
            transactionId: response.data.transactionId,
            paymentDate: new Date().toLocaleDateString(),
        };

        localStorage.setItem('paymentDetails', JSON.stringify(paymentDetails));

        // Retrieve program codes and store in localStorage
        const programCodes = items.map((item) => item.name);
        localStorage.setItem('programCodes', JSON.stringify(programCodes));
        console.log("Payment Details:", paymentDetails);
        console.log("Program Codes:", programCodes);

        window.location = response.data.url;
    } catch (error) {
        toast.error('Something went wrong during checkout.');
    }
};
  

  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <div className="flex justify-between items-center border-t border-gray-200 pt-4">
        <div className="text-base font-medium text-gray-900">Order total</div>
        <Currency value={totalPrice} />
      </div>
      <div className="flex justify-end mt-4">
      <Button onClick={onCheckout} disabled={!userId}>Proceed to Checkout</Button>
      </div>
    </div>
  );
};

const Summary = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <SummaryComponent />
  </Suspense>
);

export default Summary;
