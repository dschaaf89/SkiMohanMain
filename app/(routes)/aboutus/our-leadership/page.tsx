import Image from "next/image";

const FoundersPastLeadership = () => {
  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-6xl font-bold text-blue-800 mb-6 text-center">
        Founders & Past Leaders
      </h1>
      <div className="flex items-center mb-6"> {/* Flex container */}
        <div className="flex-shrink-0 mr-6"> {/* Image container */}
          <Image
            src="/lead-sally.jpg" // Replace with your image path
            alt="Sally Strand"
            width={400} // Set the width you want
            height={200} // Set the height you want
            objectFit="cover" // Adjust to your liking
          />
        </div>
        <div> {/* Text container */}
          <h2 className="text-xl font-bold mb-2">
            SALLY STRAND
          </h2>
          <h3 className="text-l font-bold mb-4">
            FOUNDER
          </h3>
          <p>
            Sally Ann Strand dedicated her life to the art of teaching. She spent 32 years as a Northshore biology teacher and 10 more as a substitute. Past graduates remember her as a favorite teacher because she made science come alive. Her passion encouraged countless students to become doctors, surgeons and other health care professionals. She established the Northshore Ski School in 1960 with 35 students and one bus. With her husband and staff, she created and later passed on a highly rated ski school that is still in operation after 57 years with over 200 staff and over 3000 students each season.
          </p>
        </div>
        
      </div>
      <div className="flex items-center mb-6"> {/* Flex container */}
        <div className="flex-shrink-0 mr-6"> {/* Image container */}
          <Image
            src="/rob-and-john-2.jpg" // Replace with your image path
            alt="Rob Stimmel and John Mohan"
            width={400} // Set the width you want
            height={400} // Set the height you want
            objectFit="cover" // Adjust to your liking
          />
        </div>
        <div> {/* Text container */}
          <h2 className="text-xl font-bold mb-2">
          ROB STIMMEL
          </h2>
          <h3 className="text-l font-bold mb-4">
            FOUNDER
          </h3>
          <p>
          Rob was an innovator and constantly worked to improve the program to enhance the student experience as well as implementing the Assistant Life Skills training program. His tireless energy was truly inspirational. Rob joined the school in 1967 and was director from 2000 to his tragic death in 2015.
          </p>
          <br />
          <h2 className="text-xl font-bold mb-2">
          JOHN MOHAN

          </h2>
          <h3 className="text-l font-bold mb-4">
            FOUNDER
          </h3>
          <p>
          John is an internationally known instructor and wrote 'Teaching People Skiing and Boarding'. John has taught for Ski Magazine and has was awarded the 'Golden Acorn & PSIA-NW Instructor of the Year'. John was the PSIA-NW Certification V.P. for over 13 years and is currently a professor at Northwest University, and has also taught at the University of Washington, Bellevue Schools & the National Ski Academy. John also helped develop SKIwee, a Ski Magazine program for children.
          </p>
        </div>
        
      </div>
    </div>
  );
};

export default FoundersPastLeadership;
