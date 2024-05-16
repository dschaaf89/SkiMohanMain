"use client";
import Billboard from "@/components/ui/billboards";
import getBillboards from "@/actions/get-billboard";
import CalendarEvents from '@/components/ui/calendarEvents.client'; // Adjust the path based on your folder structure
import Container from "@/components/ui/container";
import WeatherWidget from "@/components/weatherwidget";
import NewsletterSignUp from "@/components/newsletterform";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { MsalProvider } from '@azure/msal-react';
import { msalConfig } from "@/msal-config";
import { PublicClientApplication } from '@azure/msal-browser';
import { BillboardData } from "@/types";
import { useEffect, useState } from "react";

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
      <div className="min-h-screen flex flex-col bg-cover bg-center" style={{ backgroundImage: "url(/mountain.jpg)" }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 flex-grow">
          {/* Carousel of Pictures */}
          <div className="md:col-span-2 p-2 bg-blue-500 bg-opacity-40 rounded-lg shadow-lg">
            <h1 className="text-white text-xl mb-4">Carousel of Pictures</h1>
            <div className="flex justify-center items-center">
              <Carousel
                opts={{ align: "start", loop: true }}
                className="w-full max-w-4xl"
              >
                <CarouselContent className="basis-11/12">
                  {billboards.map((billboard) => (
                    <CarouselItem key={billboard.id}>
                      <div className="p-1">
                        <Billboard data={billboard} />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </div>

          {/* Pass Conditions */}
          <div className="md:col-span-1 p-2 bg-green-500 bg-opacity-60 rounded-lg shadow-lg flex justify-center items-center flex-col">
            <iframe
              width="100%"
              height="200"
              src="https://www.youtube.com/embed/7VFEFBUuGTI?autoplay=1&mute=1"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="rounded-lg"
            ></iframe>
            <WeatherWidget />
          </div>

          {/* Main content */}
          <div className="md:col-span-3 p-2 bg-red-500 bg-opacity-40 rounded-lg shadow-lg">
            <p className="text-white">Main Content</p>
            {/* Your main content here */}
          </div>

          {/* Newsletter Sign-up */}
          <div className="md:col-span-1 p-2 bg-blue-500 bg-opacity-40 rounded-lg shadow-lg flex justify-center items-center flex-col">
            <h1 className="text-black font-bold text-3xl text-center p-10">
              Sign up for our monthly newsletter
            </h1>
            <NewsletterSignUp />
          </div>

          {/* Future Events */}
          <div className="md:col-span-2 p-2 bg-purple-500 bg-opacity-40 rounded-lg shadow-lg">
            <p className="text-white text-center text-5xl">Upcoming Events</p>
            <CalendarEvents />
          </div>
        </div>
      </div>
    </MsalProvider>
  );
};

export default HomePage;
