"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { StudentSignupForm, StudentFormValues } from "@/components/ui/studentSignUpForm";
import { useUser } from "@clerk/nextjs";
import useCart from "@/hooks/use-cart";

const StudentSignupPage = () => {
  const { user } = useUser();
  const [programCodes, setProgramCodes] = useState<string[]>([]);
  const [quantities, setQuantities] = useState<number[]>([]);  // Store the quantities for each product
  const [currentFormIndex, setCurrentFormIndex] = useState(0); // Track the current form being shown
  const [totalForms, setTotalForms] = useState(0); // Track total number of forms to be rendered
  const router = useRouter();
  const searchParams = useSearchParams();
  const clearCart = useCart((state) => state.removeAll);  // Clear cart after all forms are submitted
  const userId = searchParams.get('userId') || user?.id;
  const sessionId = searchParams.get('session_id');

  // Extract program codes and quantities from URL query parameters
  useEffect(() => {
    const productCodes = searchParams.get('productCodes');
    const quantitiesString = searchParams.get('quantities');

    if (productCodes && quantitiesString) {
      const codes = productCodes.split(',');
      const qtys = quantitiesString.split(',').map(Number);
      setProgramCodes(codes);  // Set program codes
      setQuantities(qtys);  // Convert quantities to numbers
      
      // Calculate total number of forms based on quantity
      const totalFormsCount = qtys.reduce((acc, qty) => acc + qty, 0);
      setTotalForms(totalFormsCount);
    }
  }, [searchParams]);

  // Handle form submission for each individual form
  const handleSubmit = async (data: StudentFormValues, programCode: string) => {
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/students/studentSignUp`;
      const seasonId = process.env.NEXT_PUBLIC_SEASON_ID;

      if (!seasonId) {
        throw new Error("Season ID is missing in environment variables");
      }

      const requestBody = {
        ...data,
        seasonId,
        ProgCode: programCode,  // Submit the current program code
        userId,
        sessionId,  // Pass the sessionId
      };

      const response = await axios.post(apiUrl, requestBody);

      if (response.status === 200 || response.status === 201) {
        toast.success(`Student data for program ${programCode} submitted successfully!`);
        const existingStudents = JSON.parse(localStorage.getItem("submittedStudents") || "[]");
        const newStudent = {
          NAME_FIRST: data.NAME_FIRST,
          NAME_LAST: data.NAME_LAST,
          ProgCode: programCode,
        };
        localStorage.setItem("submittedStudents", JSON.stringify([...existingStudents, newStudent]));
        // Move to the next form after successful submission
        if (currentFormIndex + 1 < totalForms) {
          setCurrentFormIndex(currentFormIndex + 1);  // Move to the next form
        } else {
          // If all forms are submitted, clear the cart and redirect
          clearCart();
          const successUrl = `/success?session_id=${sessionId}&userId=${userId}`;
          router.push(successUrl);
        }
      } else {
        toast.error(`Failed to submit student data for program ${programCode}. Please try again.`);
      }
    } catch (error) {
      toast.error(`An error occurred while submitting data for program ${programCode}.`);
      console.error(`Error submitting data for program ${programCode}:`, error);
    }
  };

  // Get the current program code and form number based on the current form index
  const getCurrentProgramCode = () => {
    let formCounter = 0;

    for (let i = 0; i < programCodes.length; i++) {
      for (let j = 0; j < quantities[i]; j++) {
        if (formCounter === currentFormIndex) {
          return { programCode: programCodes[i], formIndex: j + 1, totalFormsForProduct: quantities[i] };
        }
        formCounter++;
      }
    }
    return null;
  };

  const currentForm = getCurrentProgramCode();

  return (
    <div>
      {programCodes.length > 0 && currentForm ? (
        <div>
          <h2 className="text-xl font-bold mb-4">
            Sign Up for {currentForm.programCode} (Form {currentForm.formIndex} of {currentForm.totalFormsForProduct})
          </h2>
          <StudentSignupForm
            programCode={currentForm.programCode}  // Pass the program code to each form
            onSubmit={(data) => handleSubmit(data, currentForm.programCode)}  // Handle form submission
          />
        </div>
      ) : (
        <p>No programs available for sign-up.</p>
      )}
    </div>
  );
};

export default StudentSignupPage;
