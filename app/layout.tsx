import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import Footer from "@/components/footer";
import "./globals.css";
import Navbar from "@/components/navbar";
import Ticker from "@/components/ticker";

const font = Urbanist({ subsets: ["latin"] });
const messages = [
  "OPERATIONAL STATUS: CLOSED FOR SEASON",
  "Thanks for joining us this season!",
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
    <html lang="en">
      <body className={font.className}>
        <Navbar/>
        <Ticker messages={messages}/>
        {children}
        <Footer/>
        </body>
    </html>
  );
}
