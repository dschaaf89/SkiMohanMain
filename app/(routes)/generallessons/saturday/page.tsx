"use client"; import getProductsByProgramId from "@/actions/get-productByProgram";
import ProductsTable from "@/components/ui/productTable";
import { Product } from "@/types";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect, useState } from "react";


const Saturdaylessons = () => {

  const { user } = useUser(); // Client-side only
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  console.log('User object:', user);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProductsByProgramId("f900ee4c-93fa-461f-a30a-3be54cb0e25b");
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
      <h1 className="text-4xl font-bold text-blue-800 mb-6 text-center">
        Saturday Ski and Snowboard Lessons
      </h1>

      <p className="text-lg mb-4">
        OUR EXPERIENCED, FRIENDLY MOHAN INSTRUCTORS BRING FUN TO YOUR MOUNTAIN
        EXPERIENCE.
      </p>
      <h2 className="text-2xl font-bold mb-6 text-center">
        1/11, 1/18, 1/25, 2/1, 2/8, & 2/22 Week 7 Make-up 3/1
      </h2>
      <ul className="list-disc list-inside mb-6">
        <li>We suggest you always check our website <a href="http://www.skimohan.com" className="text-blue-600 underline">www.skimohan.com</a> or call <a href="tel:+14258863820" className="text-blue-600 underline">(425) 888-3820</a> and then select option 1 to hear our latest operation updates just before leaving for the mountains or while en route. Our website and voice mail are the most reliable way for us to update the operation's status, which is updated daily by 6AM.</li>
        <li>The program offers a fantastic opportunity to help you and/or your children improve skills.  As skills increase, students may be moved to another class to optimize their learning and progress.</li>
        <li><strong>Student must be 10 years old or older to take snowboard lessons.</strong></li>
        <li>Weekly achievement ribbons given to all participants.  Achievement pins awarded on the final week of lessons to all who attend.</li>
        <li>Average class size for 5-year-old students is about three. Some may be bigger or smaller.  Larger classes have assistants assigned. <strong>All students must be at least 5-years old by the first lesson.</strong>  Most classes have an instructor and assistant, so students learn faster.</li>
        <li>Average class size for 6 through Adults is under eight students.  If there are fewer than three registered students for any class, we reserve the right to cancel the class or reduce the lesson time to one hour.</li>
        <li>As we operate in a winter environment, conditions can change quickly.  If weather forces a postponement, classes are extended until all weeks are completed.</li>
        <li><strong className="text-red-500 font-bold">There WILL not be classes Presidents' Weekend (14th - 16th)</strong></li>
        <li><strong>Students 14 years and older who are interested in teaching or assisting should visit our <a href="https://www.skimohan.com/staff/assistants"className="text-blue-600 underline">Job Application page</a>.</strong></li>
        <li>Lift Tickets are not included, but should be purchased on the Summit website immediately.</li>
        <li>DAILY LIFT TICKETS need to be purchased and scheduled ahead of time on the Summit's website. Tickets are NOT guaranteed to be available.</li>
        <li>Equipment is not included.  We suggest "Take Home Season Rentals" to avoid having to pick up rental equipment daily.  See our Equipment page for more information.</li>
        <li>Before registering please make sure you have read and understood our refund policy, lateness policy and teaching philosophy. By completing registration, you are agreeing to these polices and shall be held accountable.</li>
        <li>See our Health Expectations page for information on health considerations and bus company health plans</li>
        <li>If you have any other question’s please read our Frequently asked questions or contact the office at Office@skimohan.com, on (425) 868-3820 or through the Contact Us section on the website.</li>
      </ul>

      <h1 className="flex items-center justify-center font-bold mb-6 text-center">
          <ProductsTable products={products} />
        </h1>

      {/* ... You would continue adding content here following the same pattern ... */}
      <div>
        <p>
          WARRANTY INFORMATION Any delay or failure in the performance of Mohan
          Skiing & Boarding (Mohan) hereunder shall be excused if caused by
          Force Majeure (a cause or event that is not reasonably foreseeable or
          otherwise caused by or under the control of Mohan, including acts of
          God). Events that are beyond the reasonable anticipation and control
          to prevent, avoid, delay, or mitigate are not attributable Mohan
          failure to perform its obligations under this Agreement.

          
        </p>
      </div>
    </div>
  );
};

export default Saturdaylessons;
