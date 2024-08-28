"use client"

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import useCart from "@/hooks/use-cart";
import { StudentSignupForm, StudentFormValues } from "@/components/ui/studentSignUpForm";

const StudentSignupPage = () => {
  const [currentProgramIndex, setCurrentProgramIndex] = useState(0);
  const [programCodes, setProgramCodes] = useState<string[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const clearCart = useCart((state) => state.removeAll);

  useEffect(() => {
    const productCodes = searchParams.get('productCodes');
    if (productCodes) {
      setProgramCodes(productCodes.split(','));
    }
  }, [searchParams]);

  const handleSubmit = async (data: StudentFormValues) => {
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/students/studentSignUp`;
      const seasonId = process.env.NEXT_PUBLIC_SEASON_ID;
  
      if (!seasonId) {
        throw new Error("Season ID is missing in environment variables");
      }
  
      const requestBody = {
        ...data,
        seasonId,
        ProgCode: programCodes[currentProgramIndex],
      };
  
      const response = await axios.post(apiUrl, requestBody);
  
      if (response.status === 200 || response.status === 201) {
        toast.success("Student data submitted successfully!");
  
        // Store the submitted student data in localStorage
        const storedStudents = JSON.parse(localStorage.getItem('submittedStudents') || '[]');
        storedStudents.push(requestBody);
        localStorage.setItem('submittedStudents', JSON.stringify(storedStudents));
  
        console.log("Stored Students after submission:", storedStudents);
  
        if (currentProgramIndex < programCodes.length - 1) {
          setCurrentProgramIndex(currentProgramIndex + 1);
        } else {
          // Store payment details (assuming you store them earlier during checkout)
          const paymentDetails = JSON.parse(localStorage.getItem('paymentDetails') || '{}');
          console.log("Payment Details before clearing cart:", paymentDetails);
  
          clearCart();
          router.push("/success"); // Redirect to the success page
        }
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
      <h1>Student Signup</h1>
      <StudentSignupForm
        programCode={programCodes[currentProgramIndex] || ""}
        onSubmit={handleSubmit} // Pass the handleSubmit function as a prop
      />
    </div>
  );
};

export default StudentSignupPage;
