// "use client";
// import Billboard from "@/components/ui/billboards";
// import getBillboards from "@/actions/get-billboard";
// import CalendarEvents from '@/components/ui/calendarEvents.client'; // Adjust the path based on your folder structure
// import Container from "@/components/ui/container";
// import WeatherWidget from "@/components/weatherwidget";
// import NewsletterSignUp from "@/components/newsletterform";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import { MsalProvider } from '@azure/msal-react';
// import { msalConfig } from "@/msal-config";
// import { PublicClientApplication } from '@azure/msal-browser';
// import { BillboardData } from "@/types";
// import { useEffect, useState } from "react";

// // Initialize MSAL instance
// const msalInstance = new PublicClientApplication(msalConfig);

// const HomePage: React.FC = () => {
//   const [billboards, setBillboards] = useState<BillboardData[]>([]);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await getBillboards();
//         setBillboards(response);
//       } catch (error) {
//         console.error("Error fetching billboards:", error);
//         setError("Failed to load billboards.");
//       }
//     }

//     fetchData();
//   }, []);
//   return (
//     <MsalProvider instance={msalInstance}>
//       <div className="min-h-screen flex flex-col bg-cover bg-center" style={{ backgroundImage: "url(/mountain.jpg)" }}>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 flex-grow">
//           {/* Carousel of Pictures */}
//           <div className="md:col-span-2 p-2 bg-blue-500 bg-opacity-40 rounded-lg shadow-lg">
//             <h1 className="text-white text-xl mb-4">Carousel of Pictures</h1>
//             <div className="flex justify-center items-center">
//               <Carousel
//                 opts={{ align: "start", loop: true }}
//                 className="w-full max-w-4xl"
//               >
//                 <CarouselContent className="basis-11/12">
//                   {billboards.map((billboard) => (
//                     <CarouselItem key={billboard.id}>
//                       <div className="p-1">
//                         <Billboard data={billboard} />
//                       </div>
//                     </CarouselItem>
//                   ))}
//                 </CarouselContent>
//                 <CarouselPrevious />
//                 <CarouselNext />
//               </Carousel>
//             </div>
//           </div>

//           {/* Pass Conditions */}
//           <div className="md:col-span-1 p-2 bg-green-500 bg-opacity-60 rounded-lg shadow-lg flex justify-center items-center flex-col">
//             <iframe
//               width="100%"
//               height="200"
//               src="https://www.youtube.com/embed/7VFEFBUuGTI?autoplay=1&mute=1"
//               title="YouTube video player"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//               allowFullScreen
//               className="rounded-lg"
//             ></iframe>
//             <WeatherWidget />
//           </div>

//           {/* Main content */}
//           <div className="md:col-span-3 p-2 bg-red-500 bg-opacity-40 rounded-lg shadow-lg">
//             <p className="text-white">Main Content</p>
//             {/* Your main content here */}
//           </div>

//           {/* Newsletter Sign-up */}
//           <div className="md:col-span-1 p-2 bg-blue-500 bg-opacity-40 rounded-lg shadow-lg flex justify-center items-center flex-col">
//             <h1 className="text-black font-bold text-3xl text-center p-10">
//               Sign up for our monthly newsletter
//             </h1>
//             <NewsletterSignUp />
//           </div>

//           {/* Future Events */}
//           <div className="md:col-span-2 p-2 bg-purple-500 bg-opacity-40 rounded-lg shadow-lg">
//             <p className="text-white text-center text-5xl">Upcoming Events</p>
//             <CalendarEvents />
//           </div>
//         </div>
//       </div>
//     </MsalProvider>
//   );
// };

// export default HomePage;
"use client";
import Billboard from "@/components/ui/billboards";
import getBillboards from "@/actions/get-billboard";
import CalendarEvents from "@/components/ui/calendarEvents.client";
import WeatherWidget from "@/components/weatherwidget";
import NewsletterSignUp from "@/components/newsletterform";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "@/msal-config";
import { PublicClientApplication } from "@azure/msal-browser";
import { BillboardData } from "@/types";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import Image from "next/image";

// Initialize MSAL instance
const msalInstance = new PublicClientApplication(msalConfig);

const HomePage: React.FC = () => {
  const [billboards, setBillboards] = useState<BillboardData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getBillboards();
        setBillboards(response);
      } catch (error) {
        console.error("Error fetching billboards:", error);
        setError("Failed to load billboards.");
      }
    }

    fetchData();
  }, []);

  return (
    <MsalProvider instance={msalInstance}>
{/* Full-screen Hero Section with Carousel */}
<div className="relative w-screen h-screen flex items-center justify-center bg-cover bg-center">
  {/* Carousel of Billboards */}
  <Carousel
    opts={{ align: "start", loop: true }}
    className="absolute inset-0 w-full h-full"
  >
    <CarouselContent className="w-full h-full">
      {billboards.length > 0 ? (
        billboards.map((billboard) => (
          <CarouselItem key={billboard.id} className="w-full h-full">
            <div className="relative w-full h-full">
              {/* Ensure the Billboard component fills the container */}
              <Billboard
                data={billboard}
              />
            </div>
          </CarouselItem>
        ))
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-white text-xl">No Billboards Found</p>
        </div>
      )}
    </CarouselContent>
    <CarouselPrevious className="absolute left-0 z-20 p-2" />
    <CarouselNext className="absolute right-0 z-20 p-2" />
  </Carousel>

  {/* Overlay for darkened effect */}
  <div className="absolute inset-0 bg-black bg-opacity-30"></div>

  {/* Hero Content */}
  <div className="relative z-10 flex flex-col md:flex-row items-center justify-center w-full px-8">
    {/* Centered Hero Text */}
    <div className="text-white flex flex-col justify-center text-center w-full">
      <h1 className="text-4xl md:text-5xl font-bold">
        Skiing And Boarding Has a Soul
      </h1>
      <p className="text-xl md:text-3xl mt-4">This is where it lives.</p>
    </div>
  </div>
</div>




  
<div className="py-12 bg-gray-800 text-white text-center">
  <div className="container mx-auto px-4">
    <div className="flex flex-col lg:flex-row lg:space-x-8">
      
      {/* Left Column: YouTube Video */}
      <div className="w-full lg:w-1/2">
        <iframe
          width="100%"
          height="300"
          src="https://www.youtube.com/embed/7VFEFBUuGTI?autoplay=1&mute=1"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="rounded-lg"
        ></iframe>
      </div>

      {/* Right Column: Weather Widget */}
      <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
        <div className="
          bg-blue-500 bg-opacity-70 p-6 rounded-lg shadow-lg text-center
          w-full sm:max-w-xs md:max-w-sm lg:max-w-md
        ">
          <h2 className="text-white text-2xl md:text-xl sm:text-xl mb-4">Current Weather</h2>
          <WeatherWidget />
        </div>
      </div>
      
    </div>
  </div>
</div>

      {/* Main Content with Sections */}
      <div className="py-12 bg-white">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Become an Instructor */}
          <div className="p-6 bg-gray-100 rounded-lg shadow-lg flex flex-col items-center">
            <div className="relative w-full h-48 mb-4">
              <Image
                src="/ski_mohan_logo.png"
                alt="Ski Mohan Logo"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <h2 className="text-xl font-semibold mb-2 text-center">
              Become an Instructor
            </h2>
            <div className="mt-auto">
              <Link href="/staff/instructor" passHref>
                <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-700">
                  Start Here
                </button>
              </Link>
            </div>
          </div>

           {/* Become an Assistant */}
           <div className="p-6 bg-gray-100 rounded-lg shadow-lg flex flex-col items-center">
            <div className="relative w-full h-48 mb-4">
              <Image
                src="/Instructors Charging.jpg"
                alt="Ski Mohan Logo"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <h2 className="text-xl font-semibold mb-2 text-center">
              Become an Assistant
            </h2>
            <div className="mt-auto">
              <Link href="/staff/assistant" passHref>
                <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-700">
                  Start Here
                </button>
              </Link>
            </div>
          </div>

          {/* Learning to Ski or Snowboard */}
          <div className="p-6 bg-gray-100 rounded-lg shadow-lg flex flex-col items-center">
            <div className="relative w-full h-48 mb-4">
              <Image
                src="/snowpic2.jpg"
                alt="Lessons"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <h2 className="text-xl font-semibold mb-2 text-center">
              Learning to Ski or Snowboard
            </h2>
            <div className="mt-auto">
              <Link href="/generallessons" passHref>
                <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-700">
                  Start Here
                </button>
              </Link>
            </div>
          </div>

          {/* Volunteer to Help */}
          <div className="p-6 bg-gray-100 rounded-lg shadow-lg flex flex-col items-center">
            <div className="relative w-full h-48 mb-4">
              <Image
                src="/snowPic6.jpg"
                alt="Family Adventures"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <h2 className="text-xl font-semibold mb-2 text-center">
              Volunteer to Help
            </h2>
            <div className="mt-auto">
              <Link href="/staff/volunteer" passHref>
                <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-700">
                  Start Here
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Welcome Video Area */}
      <div className="py-12 bg-gray-800 text-white text-center">
        <h2 className="text-3xl mb-4">Welcome Video</h2>
        <div className="flex justify-center my-8">
        <iframe 
  width="560" 
  height="315" 
  src="https://www.youtube.com/embed/kJ2Qw2tggKw?si=Iuqkl9ZvTjCk-hg4" 
  title="YouTube video player" 
  style={{ border: "0" }} 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
  referrerPolicy="strict-origin-when-cross-origin" 
  allowFullScreen
></iframe>


        </div>
      </div>

      {/* Newsletter and Future Events */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-4">
        {/* Newsletter Sign-up */}
        <div className="p-6 bg-blue-500 bg-opacity-40 rounded-lg shadow-lg flex justify-center items-center flex-col">
          <h1 className="text-black font-bold text-3xl text-center">
            Sign up for our monthly newsletter
          </h1>
          <NewsletterSignUp />
        </div>

        {/* Upcoming Events */}
        <div className="md:col-span-2 p-6 bg-purple-500 bg-opacity-40 rounded-lg shadow-lg">
          <p className="text-white text-center text-5xl">Upcoming Events</p>
          <CalendarEvents />
        </div>
      </div>
    </MsalProvider>
  );
};

export default HomePage;
