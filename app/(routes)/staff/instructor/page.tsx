import React from "react";
import getProductsByProgramId from "@/actions/get-productByProgram";
import InstructorProductTable from "@/components/ui/instructorProductTable"; // Corrected the import statement
import ClinicTable from "@/components/clinicTable";
import { Product } from "@/types";

const Instructor = async () => {
  // Marking the function as async
  let products: Product[] = [];
  let error: string | null = null;

  try {
    products = await getProductsByProgramId(
      "7acbf527-b3f6-4fad-95c0-db290d59b976"
    );
    console.log("Number of products fetched:", products.length);
    console.log("Products data:", products);
    // Map products to include imageUrl at the top level
    products = products.map((product) => ({
      ...product,
      imageUrl: product.program?.imageUrl || "", // Ensure there's a fallback
    }));
  } catch (err) {
    console.error("Failed to load products:", err);
    error = "Failed to load products";
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-6xl font-bold text-blue-800 mb-6 text-center">
        Instructor
      </h1>
      <p>
        If you handle advanced intermediate runs easily, are at least 16 years
        old, fun-loving, friendly, hardworking, energetic, and you enjoy helping
        others, the answer is YES!!! You would make a great addition to our
        staff!
        <br />
        <br />
        Perhaps you need hours to fulfill community service requirements, choose
        to volunteer in lieu of being paid and all your training and teaching
        hours will apply. This could amount to 30-70 hours per year.
        <br />
        <br />
        Mohan Skiing & Boarding is a Professional Ski Instructors of America and
        American Association of Snowboard Instructors (PSIA/AASI) school; our
        experienced staff will help train you to be an effective instructor. You
        will have plenty of practice time in a caring and supportive learning
        environment. As an instructor, you will learn what to teach and when,
        how to organize a class using the tools we provide, how to manage your
        students effectively, learn key analyzing skills, and how to create a
        safe learning environment plus so much more.
        <br />
        We appreciate the amount of time you will dedicate to our ski school, so
        we try to give back to you as much as we possibly can, these include and
        certainly not limited to the below –
      </p>
      <br />
      <ul className="list-disc pl-5 mb-6 space-y-1">
        <li>
          Learning valuable life skills such as working in a team, public
          speaking, nurturing others, excellent communication skills and
          organizational skills to name a few.
        </li>
        <li>
          Our training is conducted by some amazing instructors who have a
          wealth of knowledge that they are willing and ready to share with you.
        </li>
        <li>
          Believe it or not but you will also improve your skiing/boarding
          abilities, its not only our students who are constantly learning you
          will too.
        </li>
        <li>
          Providing you meet the minimum requirement of teaching 2 sessions per
          week you will be eligible for a heavily discounted seasons pass for
          Snoqualmie Summit, discounted lessons for family and pro deals on
          equipment.{" "}
        </li>
        <li>
          You will also have access to the Mohan lodge during the times you are
          teaching, the lodge will provide you with fridges and kitchenettes to
          store/prepare food, rest rooms, storage for equipment and Wi-Fi. You
          may also use the overnight accommodations for a small $5 fee.
        </li>
        <li>
          You will be invited to staff events and gatherings through out the
          year as well as skiing trips to nearby resorts or even abroad!
        </li>
      </ul>
      <p>
        Please download and complete the following forms:
      </p>
      <br />
      <ul className="list-disc pl-5 mb-6 space-y-1">
      <li>
  <a 
    className="text-blue-500"
    href="https://skimohan.sharepoint.com/:b:/s/Mohan_Website_Documents/EZRZ3aN_oJ9KuYiONw3vMoEBzEHBEaT-91Q8OXmuT3gD8g?e=hKXO7W"
    target="_blank"
    rel="noopener noreferrer"
  >
    Background Check
  </a>
</li>
        <li> <a 
    className="text-blue-500"
    href="https://skimohan.sharepoint.com/:b:/s/Mohan_Website_Documents/EZp_lCr-ZPtIsoJlP8wO1LEB7TZxijxlEsZ7T0KNcL9Hng?e=QjNl2m"
    target="_blank"
    rel="noopener noreferrer"
  >Disclosure Form</a></li>
        <li><a 
    className="text-blue-500"
    href="https://skimohan.sharepoint.com/:b:/s/Mohan_Website_Documents/EU3nWgJNQfdEg4Z39d8eQzEBPineloHCXjuYnx5gEBwV9A?e=8zJB3g"
    target="_blank"
    rel="noopener noreferrer">
    Emergency Medical & Overnight Permission Form</a>
    </li>
        <li><a 
    className="text-blue-500"
    href="https://skimohan.sharepoint.com/:b:/s/Mohan_Website_Documents/EY4DXwFtiCFDo-EFKLjeOygBC0bM0izO8_GYSAggJO_72w?e=cRzDmV"
    target="_blank"
    rel="noopener noreferrer">I-9
    </a></li>
        <li>Parent-School Authorization Form</li>
        <li><a 
    className="text-blue-500"
    href="https://skimohan.sharepoint.com/:b:/s/Mohan_Website_Documents/EZXLcNMg8l1Ojurb9WL_GiIBrEmTHtxuipc0eAjm-4ZELw?e=Pxwv63"
    target="_blank"
    rel="noopener noreferrer">W-4</a></li>
      </ul>
      <br />
      <p>
        We respectfully request that ALL our instructors pay $60 towards staff
        liability insurance. Please note this fee is NON-refundable once the
        training has begun. Below are the training clinic requirements for all
        staff…
      </p>
      <br />
      <p>Clinic expectations are as follows:</p>
      <br />
      <ul className="list-disc pl-5 mb-6 space-y-1">
        <li>1-2 years tenure: 8 clinics</li>
        <li>3-5 years tenure: 4 Snow clinics</li>
        <li>6-8 years tenure: Last 2 Snow clinics</li>
        <li>8+ years tenure: Clinic #4 ONLY</li>
      </ul>
      <br />
      <br />
   
      <br />
      <div className="mb-8">
      <h1 className="flex items-center justify-center font-bold mb-6 text-center"> {/* Use a div with appropriate spacing and no large heading */}
        <InstructorProductTable products={products} />
      </h1>
      </div>
      <p>
        See below for the current season clinic schedule. Please note at the
        point of checkout you will be asked to complete your registration
        information.
      </p>
      <ClinicTable />
    </div>
  );
};

export default Instructor;
