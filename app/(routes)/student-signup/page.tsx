"use client"

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import useCart from "@/hooks/use-cart";
import { StudentSignupForm, StudentFormValues } from "@/components/ui/studentSignUpForm";
import { useUser } from "@clerk/nextjs"; 

const StudentSignupPage = () => {
  const { user } = useUser(); 
  const [currentProgramIndex, setCurrentProgramIndex] = useState(0);
  const [programCodes, setProgramCodes] = useState<string[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const clearCart = useCart((state) => state.removeAll);
  const userId = searchParams.get('userId') || user?.id;
  useEffect(() => {
    const productCodes = searchParams.get('productCodes');
    if (productCodes) {
      setProgramCodes(productCodes.split(','));
    }
  }, [searchParams]);
console.log(userId)
const handleSubmit = async (data: StudentFormValues) => {
  try {
    console.log('Submitted data:', data);  // Verify the submitted data
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/students/studentSignUp`;
    const seasonId = process.env.NEXT_PUBLIC_SEASON_ID;

    if (!seasonId) {
      throw new Error("Season ID is missing in environment variables");
    }

    const requestBody = {
      ...data,
      seasonId,
      ProgCode: programCodes[currentProgramIndex],
      userId,
    };

    console.log('Request Body:', requestBody);  // Log the request body
    const response = await axios.post(apiUrl, requestBody);

    console.log('API Response:', response);  // Log the response

    if (response.status === 200 || response.status === 201) {
      toast.success("Student data submitted successfully!");
      clearCart();
      router.push("/success"); // Redirect to the success page
    } else {
      toast.error("Failed to submit student data. Please try again.");
    }
  } catch (error) {
    toast.error("An error occurred while submitting the data.");
    console.error("Error submitting student data:", error);
  }
};


  return (
    <div>
      
      <StudentSignupForm
        programCode={programCodes[currentProgramIndex] || ""}
        onSubmit={handleSubmit} // Pass the handleSubmit function as a prop
      />
    </div>
  );
};

export default StudentSignupPage;
