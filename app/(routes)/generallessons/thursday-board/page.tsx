"use client";
import getProductsByProgramId from "@/actions/get-productByProgram";
import ProductsTable from "@/components/ui/productTable";
import { Product } from "@/types";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect, useState } from "react";


const ThursdayBoard = () => {

  const { user } = useUser(); // Client-side only
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  console.log('User object:', user);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProductsByProgramId("ffa0ed45-7f19-49ee-bd9e-b931722c5d4c");
        setProducts(fetchedProducts);
      } catch (err) {
        console.error('Failed to load products:', err);
        setError('Failed to load products');
      }
    };

    fetchProducts();
  }, []);

  
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold text-blue-800 mb-6">Thursday Board</h1>

      <p className="text-lg mb-4">
        Our program has run for over three decades now, with a play on the idea
        of business folk getting out for a meeting on their boards on a midweek
        night where the snow is usually colder and drier. We are a group of
        adventurous funsters and experienced ski instructors, committed to
        advancing skills, in small groups. We meet in the spacious and luxurious
        Mohan Lodge at 6:30 PM for coffee and treats, and a discussion of
        conditions, techniques, and assignments. At 7 PM we break up into small
        groups and explore the mountain and the snow with a focus on individual
        achievement and skills acquisition, for 2 hours, sometimes longer. Board
        Meeting/lessons end at 9 PM, though some continue a bit longer if the
        fun cannot be contained, and we convene back at the Mohan Lodge for a
        second attack on Jean’s treats, before a relaxing drive down the hill
        with new successes and challenges to ponder. We would love to have you
        join us.
      </p>
      <h1 className="flex items-center justify-center font-bold mb-6 text-center">
          {/* <ProductsTable products={products} /> */}
        </h1>
      <h2 className="text-xl font-bold">SOME OF OUR CREW</h2>
      <p>
        Pat Smith - Eternally perched on the shoulders of giants, and a longtime
        clinic instructor with Mohan Skiing, and a longtime Mission Ridge
        instructor. Level III certified, 30 years as a ski boot fitter and
        equipment technician.
        <br />
        <br />
         Mark Satterthwaite - Eternal Mohan instructor, Level III
        certified, relentless positivity and bonhomie. Extensive networking in
        technical sales.
        <br />
        <br /> Chris Archey - A new member of the Thursday Board staff is Chris
        Archey, PSIA Level II instructor. Chris is a life long skier with a
        passion for sharing his love of skiing with others. Let's take some
        turns and have some fun.
        <br />
        <br /> Roger Lowell -<br />
        <br /> Gordy Ball -<br />
        <br />
        
      </p>
     
      {/* ... You would continue adding content here following the same pattern ... */}
      <p>
        Lift Tickets are NOT included. See our Lift Tickets page for details.
      </p>
      <br />
      <p>Equipment is NOT included. To avoid spending time with daily rentals, we
        suggest "Take Home Season Rentals." See our Equipment page for more
        information.</p>
        <br />
      <p>
         Evenings 7:00 PM - 9:00 PM <br />Starting Thursday, January 18,
        2024<br /> Summit Central (exit 53)<br /> 47 miles from Seattle<br /><br /> These Meetings are
        different! They’re on snow with flexible meeting dates and you have 7
        weeks in to attend 5 meetings
      </p>
      <br />
        <br />
    
    </div>
  );
};

export default ThursdayBoard;
