"use client";
import React from "react";
import WeatherWidget from "@/components/weatherwidget";
import NewsletterSignUp from "@/components/newsletterform";


const HomePage: React.FC = () => {
  const handleSubmit = (formData: {
    name: string;
    email: string;
    phone: string;
  }) => {
    console.log("Form data:", formData);
    // Handle the form submission.
  };
  const live = "https://www.youtube.com/watch?v=7VFEFBUuGTI";
  return (
    <div
      style={{
        backgroundImage: "url(/mountain.jpg)", // Path to your image file
        backgroundSize: "cover", // Cover the entire viewport
        backgroundPosition: "center", // Center the background image
        height: "100vh", // Full viewport height
      }}
      className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4"
    >
      {/* Carousel of Pictures */}
      <div
        style={{ backgroundColor: "rgba(59, 130, 246, 0.40)" }} // bg-blue-500 with 95% opacity
        className="md:col-span-2 p-2"
      >
        <h1 className="text-white text-xl">Carousel of Pictures</h1>
        {/* Place your Carousel component here */}
      </div>

      {/* Pass Conditions */}
      <div
        style={{ backgroundColor: "rgba(34, 197, 94, 0.6)" }} // bg-green-500 with 95% opacity
        className="md:col-span-1 p-2 flex justify-center items-center flex-col"
      >
        <iframe
          width="400"
          height="200"
          src="https://www.youtube.com/embed/7VFEFBUuGTI?autoplay=1&mute=1"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      
        <WeatherWidget />
      </div>

      {/* Main content */}
      <div
        style={{ backgroundColor: "rgba(239, 68, 68, 0.40)" }} // bg-red-500 with 95% opacity
        className="md:col-span-3 p-2"
      >
        <p className="text-white">Main Content</p>
        {/* Your main content here */}
      </div>

      {/* Newsletter Sign-up */}
      <div
        style={{ backgroundColor: "rgba(59, 130, 246, 0.40)" }} // bg-blue-500 with 95% opacity
        className="md:col-span-1 p-2 h-full flex justify-center items-center flex-col"
      >
        <h1 className="text-black font-bold text-3xl text-center p-10">
          Sign up for our monthly newsletter
        </h1>
        <NewsletterSignUp onSubmit={handleSubmit} />
        {/* Newsletter sign-up form here */}
      </div>

      {/* Future Events */}
      <div
        style={{ backgroundColor: "rgba(168, 85, 247, 0.40)" }} // bg-purple-500 with 95% opacity
        className="md:col-span-2 p-2 h-full"
      >
        <p className="text-white">Future events calendar feature</p>
        {/* Events calendar here */}
      </div>
    </div>
  );
};

export default HomePage;
