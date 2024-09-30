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
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const clearCart = useCart((state) => state.removeAll);
  const { user } = useUser(); 
  const userId = searchParams.get('userId') || user?.id;

  useEffect(() => {
    const productCodes = searchParams.get('productCodes');
    if (productCodes) {
      setProgramCodes(productCodes.split(','));
    }
  }, [searchParams]);

  const handleSubmit = async (data: AssistantFormValues, resetForm: () => void) => {
    try {
      setLoading(true);
      const { files, ...formData } = data;

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
        toast.success("Assistant form data submitted successfully!");

        const formDataForFiles = new FormData();
        formDataForFiles.append("firstName", formData.NAME_FIRST);
        formDataForFiles.append("lastName", formData.NAME_LAST);

        if (files.length > 0) {
          files.forEach((file) => {
            formDataForFiles.append("files", file, file.name);
          });
        }

        const fileResponse = await axios.post("/api/sendAssistantDocs", formDataForFiles, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (fileResponse.status === 200 || fileResponse.status === 201) {
          toast.success("Assistant documents sent successfully!");

          const storedAssistants = JSON.parse(localStorage.getItem('submittedAssistants') || '[]');
          storedAssistants.push(requestBody);
          localStorage.setItem('submittedAssistants', JSON.stringify(storedAssistants));

          // Reset the form
          resetForm();

          if (currentProgramIndex < programCodes.length - 1) {
            setCurrentProgramIndex(currentProgramIndex + 1);
          } else {
            const paymentDetails = JSON.parse(localStorage.getItem('paymentDetails') || '{}');
            clearCart();
            router.push("/success");
          }
        } else {
          toast.error("Failed to send assistant documents. Please try again.");
        }
      }
    } catch (error) {
      toast.error("An error occurred while submitting the data.");
      console.error("Error submitting assistant data:", error);
    } finally {
      setLoading(false);
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
