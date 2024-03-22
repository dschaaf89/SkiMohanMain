import Image from "next/image";

const MariaJoseScholarship = () => {
  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-6xl font-bold text-blue-800 mb-6 text-center">
        Maria Jose Scholarship
      </h1>
      <div className="flex justify-center mb-10">
      <Image
          src="/Maria Jose.jpg" // Use the correct path to your image file
          alt="Picture of the late Maria Jose"
          width={400} // Adjust the size as needed
          height={500} // Adjust the size as needed
          layout="intrinsic"
        />
        </div>
      <div className="mt-6 text-justify">
          <p>
            In memory of Maria Jose Cepa Contreras Mohan Skiing & Boarding
            offers a limited number of scholarships to help defray the costs of
            lift tickets, equipment, lessons, and busing. Maria Jose loved this
            program because she believed in helping others. Out of everything
            that Mohan does, this program was dear to her heart. In her honor we
            name it after her. Maria Jose's family has agreed to donate her gear
            to this cause. The goal of the scholarship program is to offer
            outdoor recreation opportunities to those who might not have the
            chance to participate. We hope to instill a lifelong love of winter
            sports and the outdoors to students of all backgrounds. Mohan
            scholarships are need-based and consider total household income
            using the same income guidelines as the National School Lunch
            Program. In addition to meeting the income guidelines of the
            National School Lunch Program, students must be in good academic
            standing. In order to serve as many students as possible, priority
            will be given to qualified first-time applicants.
          </p>
          <p>At this time, we can offer scholarships for:</p>
          <ul className="list-disc list-inside">
            <li>
              100% off transportation, lessons, lifts, and rentals (scholarship
              value of approximately $800 - $900)
            </li>
            <li>
              50% off transportation, lessons, lifts, and rentals (scholarship
              value of approximately $400 - $450)
            </li>
            <li>
              100% off transportation and lessons (scholarship value of
              approximately $335 - $395)
            </li>
            <li>
              50% off transportation and lessons (total scholarship of
              approximately $170 - $195)
            </li>
          </ul>
          <p>
            All documentation must be submitted by December 15th. Incomplete
            and/or late applications will NOT be considered until after all on
            time and complete applicants have been awarded scholarships. If
            funds still remain partial scholarships may be awarded to applicants
            that did not make the December 15th deadline.
          </p>
          <p>
            All submitted scholarship applications will go under review. We will
            contact applicants via email by December 20th to notify you of the
            application status.
          </p>
          <p className="underline text-blue-800 cursor-pointer">
            Scholarship Application (link to Application)
          </p>
          <p className="underline text-blue-800 cursor-pointer">
            Donate to this scholarship fund (Link to donation)
          </p>
        </div>
   
        
         
      </div>
   
  );
};

export default MariaJoseScholarship;
