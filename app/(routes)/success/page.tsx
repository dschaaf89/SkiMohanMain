"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface StudentInfo {
  NAME_FIRST: string;
  NAME_LAST: string;
  ProgCode: string;
  [key: string]: any; // Add this to accommodate any additional fields
}

interface PaymentDetails {
  totalAmount: string;
  paymentMethod: string;
  transactionId: string;
  paymentDate: string;
}

const SuccessPage: React.FC = () => {
  const [students, setStudents] = useState<StudentInfo[]>([]);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedStudents = JSON.parse(localStorage.getItem("submittedStudents") || "[]");
    const storedPaymentDetails = JSON.parse(localStorage.getItem("paymentDetails") || "null");
  
    console.log("Loaded Students:", storedStudents);
    console.log("Loaded Payment Details:", storedPaymentDetails);
  
    if (storedStudents.length === 0 || !storedPaymentDetails) {
      // Redirect to home if no data
      console.log("No data found, redirecting to home...");
      router.push("/");
    } else {
      setStudents(storedStudents);
      setPaymentDetails(storedPaymentDetails);
    }
  }, [router]);

  if (!students.length || !paymentDetails) {
    // Show a loading state or return null to prevent premature rendering
    return <div>Loading...</div>;
  }

  const handlePrint = () => {
    window.print(); // Triggers the browser's print functionality
  };

  const handleBackToMainPage = () => {
    // Clear the localStorage items
    localStorage.removeItem("submittedStudents");
    localStorage.removeItem("paymentDetails");

    // Redirect to main page
    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Payment Successful!</h1>
      <p className="text-lg mb-4">Here is your receipt:</p>

      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
        <p><strong>Total Amount:</strong> ${paymentDetails.totalAmount}</p>
        <p><strong>Payment Method:</strong> {paymentDetails.paymentMethod}</p>
        <p><strong>Transaction ID:</strong> {paymentDetails.transactionId}</p>
        <p><strong>Payment Date:</strong> {paymentDetails.paymentDate}</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mt-6">
        <h2 className="text-xl font-semibold mb-4">Student Information</h2>
        {students.length > 0 ? (
          students.map((student, index) => (
            <div key={index} className="mb-4">
              <p><strong>Student Name:</strong> {student.NAME_FIRST} {student.NAME_LAST}</p>
              <p><strong>Program :</strong> {student.ProgCode}</p>
            </div>
          ))
        ) : (
          <p>No student information available.</p>
        )}
      </div>

      <div className="mt-6 flex space-x-4">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg"
          onClick={handleBackToMainPage} // Updated to clear localStorage
        >
          Back to Main Page
        </button>
        <button
          className="bg-green-500 text-white py-2 px-4 rounded-lg"
          onClick={handlePrint}
        >
          Print Receipt
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
