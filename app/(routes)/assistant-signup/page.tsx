"use client"

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import useCart from "@/hooks/use-cart";
import { AssistantSignupForm, AssistantFormValues } from "@/components/ui/assistantSignUpForm"
import { useUser } from "@clerk/nextjs"; 
const AssistantSignupPage = () => {
  const [currentProgramIndex, setCurrentProgramIndex] = useState(0);
  const [programCodes, setProgramCodes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false); // Define loading state here
  const router = useRouter();
  const searchParams = useSearchParams();
  const clearCart = useCart((state) => state.removeAll);
  const { user } = useUser(); 
  const userId = searchParams.get('userId') || user?.id;
  console.log(userId);
  useEffect(() => {
    const productCodes = searchParams.get('productCodes');
    if (productCodes) {
      setProgramCodes(productCodes.split(','));
    }
  }, [searchParams]);

  const handleSubmit = async (data: AssistantFormValues) => {
    try {
      // Separate out the files from the form data
      const { files, ...formData } = data;
      console.log("Files uploaded:", files);

      if (!files || files.length === 0) {
        console.error("No files were uploaded");
        return;
      }

      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/instructors/instructorSignUp`;
      const seasonId = process.env.NEXT_PUBLIC_SEASON_ID;

      if (!seasonId) {
        throw new Error("Season ID is missing in environment variables");
      }

      const requestBody = {
        ...formData,
        seasonId,
        ProgCode: programCodes[currentProgramIndex],
        userId,
      };

      const response = await axios.post(apiUrl, requestBody);

      if (response.status === 200 || response.status === 201) {
        toast.success("Instructor form data submitted successfully!");

        const formDataForFiles = new FormData();
        formDataForFiles.append("firstName", formData.NAME_FIRST);
        formDataForFiles.append("lastName", formData.NAME_LAST);

        if (files && files.length > 0) {
          files.forEach((file) => {
            formDataForFiles.append("files", file, file.name);
          });
        }

        const fileResponse = await axios.post("/api/sendInstructorDocs", formDataForFiles, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (fileResponse.status === 200 || fileResponse.status === 201) {
          toast.success("Instructor documents sent successfully!");

          const storedAssistants = JSON.parse(localStorage.getItem('submittedAssistants') || '[]');
          storedAssistants.push(requestBody);
          localStorage.setItem('submittedAssistants', JSON.stringify(storedAssistants));

          console.log("Stored Assistants after submission:", storedAssistants);

          if (currentProgramIndex < programCodes.length - 1) {
            setCurrentProgramIndex(currentProgramIndex + 1);
          } else {
            const paymentDetails = JSON.parse(localStorage.getItem('paymentDetails') || '{}');
            console.log("Payment Details before clearing cart:", paymentDetails);

            clearCart();
            router.push("/success");
          }
        } else {
          toast.error("Failed to submit instructor data. Please try again.");
        }
      }
    } catch (error) {
      toast.error("An error occurred while submitting the data.");
      console.error("Error submitting instructor data:", error);
    }
  };
  

  return (
    <div>
      <h1>Assistant Signup</h1>
      <AssistantSignupForm
        programCode={programCodes[currentProgramIndex] || ""}
        onSubmit={handleSubmit} // Pass the handleSubmit function as a prop
      />
    </div>
  );
};

export default AssistantSignupPage;
