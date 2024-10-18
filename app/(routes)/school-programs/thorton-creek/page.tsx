"use client"; 
import getProductsByProgramId from "@/actions/get-productByProgram";
import ProductsTable from "@/components/ui/productTable";
import { Product } from "@/types";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect, useState } from "react";


const ThortonCreek = () => {
  const { user } = useUser(); // Client-side only
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  console.log('User object:', user);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProductsByProgramId("97322011-3674-4c89-b54b-9f207e073d6b");
        setProducts(fetchedProducts);
      } catch (err) {
        console.error('Failed to load products:', err);
        setError('Failed to load products');
      }
    };

    fetchProducts();
  }, []);


// Helper function to check if user has coordinator access
const hasCoordinatorAccess = () => {
  return user?.publicMetadata?.role === 'coordinator'; // Adjust based on how you're managing roles
};
 

  

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-6xl font-bold text-blue-800 mb-6 text-center">
      Thornton Creek Snowsports
      </h1>
      <p className="text-lg mb-4">
        OUR EXPERIENCED, FRIENDLY MOHAN INSTRUCTORS BRING FUN TO YOUR MOUNTAIN
        EXPERIENCE.
      </p>
      <h2 className="text-2xl font-bold mb-6 text-center">
      1/10, 1/17, 1/24, 1/31, 2/7 &amp; 2/21
      </h2>
      <ul className="list-disc list-inside mb-6">
        <li>
          We suggest you always check our website{" "}
          <a href="http://www.skimohan.com" className="text-blue-600 underline">
            www.skimohan.com
          </a>{" "}
          or call{" "}
          <a href="tel:+14258683820" className="text-blue-600 underline">
            (425) 868-3820
          </a>{" "}
          and then select option 1 to hear our latest operation updates just
          before leaving for the mountains or while en route. Our website and
          voicemail are the most reliable way for us to update the operation's
          status.
        </li>
        <li>
          The program offers a fantastic opportunity to help you or your
          children improve skills. As skills increase, students may be moved to
          another class to optimize their learning and progress.
        </li>
        <li>
          Weekly achievement ribbons given to all participants. Achievement pins
          awarded on the final week of lessons to all who attend.
        </li>
        <li>
          verage class size is under eight students. If there are fewer than
          three registered students for any class, we reserve the right to
          cancel the class or reduce the lesson time to one hour.
        </li>
        <li>
          Free make-up sessions will be announced for a Saturday and Sunday
          after lessons have ended, as long the ski area is open.
        </li>
        <li>
          As we operate in a winter environment, conditions can change quickly.
        </li>
        <li>
          If weather forces a postponement, classes are extended until all weeks
          are completed. No classes Presidents' Weekend (14th-16th).
        </li>
        <li>
          Students 14 years and older who are interested in teaching or
          assisting should visit our{" "}
          <a
             href="https://www.skimohan.com/staff/assistants"
            className="text-blue-600 underline"
          >
            Job Application page
          </a>
        </li>
        <li>
          Lift Tickets are not included, but should be purchased on the Summit
          website immediately.
        </li>
        <li>
          DAILY LIFT TICKETS need to be purchased and scheduled ahead of time on
          the Summit's website. Tickets are NOT guaranteed to be available.
        </li>
        <li>
          Equipment is not included. We suggest "Take Home Season Rentals" to
          avoid having to pick up rental equipment daily. See our Equipment page
          for more information.
        </li>
        <li>
          Before registering please make sure you have read and understood our
          refund policy, lateness policy and teaching philosophy. By completing
          registration, you are agreeing to these polices and shall be held
          accountable.
        </li>
        <li>
          See our Health Expectations page for information on health
          considerations and bus company health plans
        </li>
        <li>
          If you have any other question’s please read our Frequently asked
          questions or contact the office at Office@skimohan.com, on (425)
          868-3820 or through the Contact Us section on the website.
        </li>
      </ul>
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Program Coordinator <br />
          Beth Ledoux <br />
          Email:{" "}
          <a
            href="mailto:thorntoncreeksnowsports@skimohan.com"
            className="text-blue-600 underline"
          >
            thorntoncreeksnowsports@skimohan.com
          </a>
        </h2>
                {/* Render Coordinator's Portal Button if user has access */}
 {hasCoordinatorAccess() && (
          <div className="pb-5">
              <Link
  href={`${process.env.NEXT_PUBLIC_API_COORDINATORPORTAL_URL}?programId=ThortonCreek`}
  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
>
  Go to Coordinator's Portal
</Link>
          </div>
        )}
      </div>
      <div>
        <h3 className="text-xl font-bold mb-6 text-center">
          Bus Meeting Location:NE side of school bus zone (11051 34th Ave NE, Seattle, WA 98125)
        </h3>
        <ul className="list-disc list-inside mb-6">
          <li>
          The bus departs at 4:00 PM and returns at approximately 11:00 PM- 11:30 PM.
          </li>
          <li>
            6-week Friday programs include transportation and optional
            skiing/boarding lessons
          </li>
          <li>Participants of this Friday program should be high school age</li>
          <li>
            Participants must be self sufficient. There is little to no
            supervision while on the hill.{" "}
          </li>
          <li>Lesson duration: 2 hours</li>
          <li>Classes begin at 7 PM with peers of similar age and ability</li>
          <li>Substantial discount on lessons for bus rider students</li>
          <li>Great opportunity to help your children improve their skills</li>
          <li>
            As their skills increase, students may be moved to another class to
            optimize their learning and progress
          </li>
          
        </ul>
      </div>
      <h1> <strong>We are priortizing the lesson/transportation combo. If you want Transportation only please sign up for the waitlist and your program coordinator will contact you as space is available.</strong> </h1>
      
      <div>
      <h1 className="flex items-center justify-center font-bold mb-6 text-center">
          <ProductsTable products={products} />
        </h1>
      </div>

      <div>
        <h2 className="text-3xl font-bold mb-6 text-center">
          {" "}
          WARRANTY INFORMATION
        </h2>
        <p>
          Any delay or failure in the performance of Mohan Skiing & Boarding
          (Mohan) hereunder shall be excused if caused by Force Majeure (a cause
          or event that is not reasonably foreseeable or otherwise caused by or
          under the control of Mohan, including acts of God). Events that are
          beyond the reasonable anticipation and control to prevent, avoid,
          delay, or mitigate are not attributable Mohan failure to perform its
          obligations under this Agreement.
        </p>
        <p className="font-bold">
          Prior to the end of the business day, 3pm, on November 29th of the
          current season, participants may request, in writing, a refund for
          their lessons and/or transportation. When processed there will be a
          $25 fee subtracted for each refund. After 3pm of November 29th,
          participant’s lessons and/or transportation are NOT refundable unless:
          The program is not completed by April 30. In which case a prorated
          credit will be applied towards the following season.
        </p>
        <p>
          Please note that it is typical to postpone program operations
          throughout the season due to weather or road conditions. The decision
          to operate or postpone is at the sole discretion of Mohan. The
          operating status is posted daily on the Mohan website and phone number
          voicemail. Please check frequently for the latest information. If a
          program is postponed, it is our policy to AUTOMATICALLY add a make-up
          program date to the end of the program schedule until all
          postponements are completed.
        </p>
      </div>
    </div>
  );
};

export default ThortonCreek;
