"use client"

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import useCart from "@/hooks/use-cart";
import { InstructorSignupForm, InstructorFormValues } from "@/components/ui/instructorSignUpForm"

const InstructorSignupPage = () => {
  const [currentProgramIndex, setCurrentProgramIndex] = useState(0);
  const [programCodes, setProgramCodes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false); // Define loading state here
  const router = useRouter();
  const searchParams = useSearchParams();
  const clearCart = useCart((state) => state.removeAll);

  useEffect(() => {
    const productCodes = searchParams.get('productCodes');
    if (productCodes) {
      setProgramCodes(productCodes.split(','));
    }
  }, [searchParams]);

  const handleSubmit = async (data: InstructorFormValues) => {
    try {
      setLoading(true);

      // Separate out the files from the form data
      const { files, ...formData } = data;
      console.log("Files uploaded:", files);

  // If files are undefined, there might be an issue with capturing the file upload
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
      };

      // First, send the form data to the backend (without files)
      const response = await axios.post(apiUrl, requestBody);

      if (response.status === 200 || response.status === 201) {
        toast.success("Instructor form data submitted successfully!");

        // Prepare the FormData object for files
        const formDataForFiles = new FormData();
        formDataForFiles.append("firstName", formData.NAME_FIRST);
        formDataForFiles.append("lastName", formData.NAME_LAST);

        // Append files if they exist
        if (files && files.length > 0) {
          files.forEach((file) => {
            formDataForFiles.append("files", file, file.name);
          });
        }

        // Send files to your document handling route (similar to your volunteer form)
        const fileResponse = await axios.post("/api/sendInstructorDocs", formDataForFiles, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (fileResponse.status === 200 || fileResponse.status === 201) {
          toast.success("Instructor documents sent successfully!");

          // Store the submitted instructor data in localStorage
          const storedInstructors = JSON.parse(localStorage.getItem("submittedInstructors") || "[]");
          storedInstructors.push(requestBody);
          localStorage.setItem("submittedInstructors", JSON.stringify(storedInstructors));

          console.log("Stored Instructors after submission:", storedInstructors);

          // Update the current program index or navigate to success page
          if (currentProgramIndex < programCodes.length - 1) {
            setCurrentProgramIndex(currentProgramIndex + 1);
          } else {
            // Clear cart and navigate to success
            clearCart();
            router.push("/success");
          }
        } else {
          toast.error("Failed to send instructor documents. Please try again.");
        }
      } else {
        toast.error("Failed to submit instructor data. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred while submitting the data.");
      console.error("Error submitting instructor data:", error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div>
      <h1>Instructor Signup</h1>
      <InstructorSignupForm
        programCode={programCodes[currentProgramIndex] || ""}
        onSubmit={handleSubmit} // Pass the handleSubmit function as a prop
      />
    </div>
  );
};

export default InstructorSignupPage;
