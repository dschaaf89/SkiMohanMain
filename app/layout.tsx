import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import Footer from "@/components/footer";
import "./globals.css";
import Navbar from "@/components/navbar";
import Ticker from "@/components/ticker";
import ToastProvider from "@/providers/toast-provider";
import ModalProvider from "@/providers/modal-provider";
import { ClerkProvider } from '@clerk/nextjs';
const font = Urbanist({ subsets: ["latin"] });
const messages = [
  "Registration is Now Open.If your student is trying out for Winter Sports, please remember that there are no refunds after November 29th at 3pm. NO EXECPTIONS."
];
export const metadata: Metadata = {
  title: "Mohan Ski School Website",
  description: "Generated by Daniel Schaaf",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    
    <ClerkProvider >
    <html lang="en">
      <body className={font.className}>
        <ModalProvider/>
        <ToastProvider/>
        <Navbar/>
        <Ticker messages={messages}/>
        {children}
        <Footer/>
        </body>
    </html>
    </ClerkProvider>
  );
}
