// import { BillboardData } from "@/types";

// const URL=`${process.env.NEXT_PUBLIC_API_URL}/billboards`;

// const getBillboard = async (): Promise<BillboardData> => {
//   console.log(`Fetching from URL: ${URL}`);

//   const data = await fetch(URL)
//   console.log(data.json);

//   return data.json();
// };

// export default getBillboard;

// import { BillboardData } from "@/types";

// const URL = `${process.env.NEXT_PUBLIC_API_URL}/billboards`;

// const getBillboards = async (): Promise<BillboardData[]> => {
//   try {
//     const response = await fetch(URL); // Directly using fetch
//     if (!response.ok) {
//       throw new Error(`Failed to fetch: ${response.statusText}`);
//     }
//     return await response.json();
//   } catch (error) {
//     // Assuming error is of type Error for simplicity in handling
//     console.error("Error fetching billboards:", error instanceof Error ? error.message : "Unknown error");
//     throw error; // Rethrow to handle it outside, e.g., to show an error message in the UI
//   }
// };

// export default getBillboards;

// import { BillboardData } from "@/types";

// const URL = `${process.env.NEXT_PUBLIC_API_URL}/billboards`;

// const getBillboards = async (): Promise<BillboardData[]> => {
//   try {
//     console.log(`Fetching from URL: ${URL}`);
//     const response = await fetch(URL);
//     console.log(response);
//     console.log('HTTP Status:', response.status);
//     if (!response.ok) {
//       throw new Error(`HTTP error, status = ${response.status}`);
//     }
//     const data = await response.json();
//     console.log('Data received:', data);
//     return data;
//   } catch (error) {
//     console.error("Error fetching billboards:", error);
//     return []; // Return empty or handle appropriately
//   }
// };

// export default getBillboards;
import { BillboardData } from "@/types";
import axios, { AxiosError } from 'axios';

const URL = process.env.BILLBOARDS_PUBLIC_API!;

const getBillboards = async (): Promise<BillboardData[]> => {
  try {
    const response = await axios.get(URL, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        console.error("Request failed with status code:", axiosError.response.status);
        console.error("Response data:", axiosError.response.data);
      } else if (axiosError.request) {
        console.error("No response received:", axiosError.request);
      } else {
        console.error("Error setting up the request:", axiosError.message);
      }
    } else {
      console.error("Error fetching billboards:", (error as Error).message);
    }
    throw error;
  }
};

export default getBillboards;