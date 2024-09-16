"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

interface StudentInfo {
  NAME_FIRST: string;
  NAME_LAST: string;
  ProgCode: string;
  [key: string]: any; // Add this to accommodate any additional fields
}

interface OrderDetails {
  Name_First: string;
  Name_Last: string;
  phone: string;
  address: string;
  paymentMethod: string;
  totalAmount: number;
  paymentDate: string;
  transactionId:string;
}

const SuccessPage: React.FC = () => {
  const [students, setStudents] = useState<StudentInfo[]>([]);
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  // Fetch student info from localStorage and order details from API
  useEffect(() => {
    const storedStudents = JSON.parse(localStorage.getItem("submittedStudents") || "[]");
    setStudents(storedStudents);

    if (sessionId) {
      console.log("Fetching order details for session:", sessionId);
      const fetchOrderDetails = async () => {
        try {
          const response = await axios.post(`${process.env.NEXT_PUBLIC_PAYMENT_API}`, {
            sessionId,  // Send session_id as part of the request body
          });

          console.log("Order API response:", response.data);

          setOrderDetails(response.data.order);  // Set the fetched order details
        } catch (error) {
          console.error("Error fetching order details:", error);
        }
      };

      fetchOrderDetails();
    }

    setIsLoading(false);
  }, [sessionId]);

  if (isLoading) {
    return <div>Loading...</div>;  // Add a loading indicator
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Payment Successful!</h1>
      <p className="text-lg mb-4">Here is your receipt:</p>

      {/* Order Details */}
      {orderDetails && (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4">Order Details</h2>
          <p><strong>First Name:</strong> {orderDetails.Name_First}</p>
          <p><strong>Last Name:</strong> {orderDetails.Name_Last}</p>
          <p><strong>Phone:</strong> {orderDetails.phone}</p>
          <p><strong>Address:</strong> {orderDetails.address}</p>
          <p><strong>Payment Method:</strong> {orderDetails.paymentMethod}</p>
          <p><strong>transactionId:</strong> {orderDetails.transactionId}</p>
          <p><strong>Total Amount:</strong> ${orderDetails.totalAmount}</p>
          <p><strong>Payment Date:</strong> {orderDetails.paymentDate}</p>
        </div>
      )}

      {/* Student Information */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mt-6">
        <h2 className="text-xl font-semibold mb-4">Student Information</h2>
        {students.length > 0 ? (
          students.map((student, index) => (
            <div key={index} className="mb-4">
              <p><strong>Student Name:</strong> {student.NAME_FIRST} {student.NAME_LAST}</p>
              
            </div>
          ))
        ) : (
          <p>No student information available.</p>
        )}
      </div>

      <div className="mt-6 flex space-x-4">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg"
          onClick={() => {
            localStorage.removeItem("submittedStudents");
            localStorage.removeItem("paymentDetails");
            router.push("/");  // Redirect to main page
          }}
        >
          Back to Main Page
        </button>
        <button
          className="bg-green-500 text-white py-2 px-4 rounded-lg"
          onClick={() => window.print()}  // Print the receipt
        >
          Print Receipt
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
