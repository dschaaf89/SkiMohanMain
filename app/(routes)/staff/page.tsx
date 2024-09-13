import Link from "next/link";
import Image from "next/image";

const Staff = () => {
  return (
    <div className="px-4 md:px-8 py-8 max-w-6xl mx-auto">
      
    {/* Main Image */}
    <div className="relative w-full h-96 mb-8">
        <Image
          src="/Instructors Charging.jpg"
          alt="Instructors Charging"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
<h2 className="text-3xl font-bold mb-4">Be Part of Our Team</h2>

      <p className="mb-4">
        When we say to someone, "Have you ever considered being an instructor with us?" 9 times out of 10 the response is usually, “Who, me? Nooooo.”
      </p>

      <p className="mb-4">
        But if you handle advanced intermediate runs easily, are at least <strong>16 years old</strong>, fun-loving, friendly, hardworking, energetic, and enjoy helping others, the answer is YES!!! You would make a great addition to our staff!
      </p>

      <p className="mb-4">
        Perhaps you need hours to fulfill community service requirements. Choose to volunteer in lieu of being paid, and all your training and teaching hours will apply. This could amount to <strong>30-70 hours per year</strong>.
      </p>

      <p className="mb-4">
        Mohan Skiing & Boarding is a Professional Ski Instructors of America and American Association of Snowboard Instructors (PSIA/AASI) school. Our experienced staff will help train you to be an effective instructor. You will have plenty of practice time in a caring and supportive learning environment. As an instructor, you will learn what to teach and when, how to organize a class using the tools we provide, how to manage your students effectively, learn key analyzing skills, and how to create a safe learning environment, plus so much more.
      </p>

      <h3 className="text-2xl font-bold mb-4">Class Assistant</h3>

      <p className="mb-4">
        As a Class Assistant (MUST be at least <strong>14 years old</strong>), you will learn indispensable life skills and begin to see how and why a skilled instructor knows what to teach. You will train with them directly and become a mentor to your students.
      </p>

      <p className="mb-4">
        We appreciate the amount of time you will dedicate to our ski school, so we try to give back to you as much as we possibly can. These benefits include, but are certainly not limited to, the following:
      </p>

      <ul className="list-disc list-inside mb-4">
        <li>Learning valuable life skills such as working in a team, public speaking, nurturing others, excellent communication skills, and organizational skills.</li>
        <li>Our training is conducted by some amazing instructors who have a wealth of knowledge that they are willing and ready to share with you.</li>
        <li>Believe it or not, you will also improve your skiing/boarding abilities. It’s not only our students who are constantly learning, you will too.</li>
        <li>Providing you meet the minimum requirement of teaching 2 sessions per week, you will be eligible for a heavily discounted season pass for Snoqualmie Summit, discounted lessons for family, and pro deals on equipment.</li>
        <li>You will also have access to the Mohan lodge during the times you are teaching. The lodge will provide you with fridges and kitchenettes to store/prepare food, restrooms, storage for equipment, and Wi-Fi. You may also use the overnight accommodations for a small $5 fee.</li>
        <li>You will be invited to staff events and gatherings throughout the year, as well as skiing trips to nearby resorts or even abroad!</li>
      </ul>

      <p className="mb-4">
        We respectfully request that staff/volunteers pay <strong>$60</strong> towards staff training and liability insurance. Please note this fee is <strong>NON-refundable</strong> once the training has begun. Below are the training clinic requirements for all staff:
      </p>

      <h3 className="text-2xl font-bold mb-4">Clinic Expectations</h3>

      <ul className="list-disc list-inside mb-4">
        <li><strong>1-2 years tenure</strong>: 8 clinics</li>
        <li><strong>3-5 years tenure</strong>: 4 Snow clinics</li>
        <li><strong>6+ years tenure</strong>: Last 2 Snow clinics</li>
      </ul>

      <p className="mb-4">Here are a few words from some of our existing instructors:</p>

      <blockquote className="pl-4 border-l-4 border-gray-300 mb-4">
        <p className="italic">
          “I joined the Mohan Family last year after being recruited by a current instructor and I’m already looking forward to this year’s season and many more to come. My main reason for joining the school was the discounted seasons pass and lesson discounts for my kids, but now I realize it’s for the people at the school, the memories we make together, and the safe but fun environment for my two children.”
        </p>
        <p className="text-right">— Hansel, Instructor for 2 years</p>
      </blockquote>

      <blockquote className="pl-4 border-l-4 border-gray-300 mb-4">
        <p className="italic">
          “I’ve been with Mohan for 8 years now and I’m hoping for many more to come! The most rewarding aspect of being a ski instructor at Mohan is not only teaching someone how to ski and witness their improvement over the weeks but to pass along your love and passion for the most wonderful winter sport there is... skiing!”
        </p>
        <p className="text-right">— Valentina, Instructor for 9 years</p>
      </blockquote>

      <blockquote className="pl-4 border-l-4 border-gray-300 mb-4">
        <p className="italic">
          “It’s been 5 years since I became an instructor at Mohan, thanks to my 2 daughters who were also instructors. There aren’t many challenges, it’s all fun, but if I had to name one, I’d say it can sometimes be a challenge to get up there, being ready to go with lesson plan in hand when the elements are against you! But every time a student gets that ‘a-ha’ moment and they are so pleased they’ve finally got it down and are enjoying it at the same time, it makes it ALL worth it!”
        </p>
        <p className="text-right">— Greg, Instructor for 6 years</p>
      </blockquote>

      <p className="mb-4">
        If you have any other questions about becoming an instructor or class assistant with us, please reach out to our office staff at <a href="mailto:office@skimohan.com" className="text-blue-500 underline">office@skimohan.com</a>.
      </p>

      {/* Main Content with Sections */}
      <div className="py-12 bg-white">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Become an Instructor */}
          <div className="p-6 bg-gray-100 rounded-lg shadow-lg flex flex-col items-center">
            <div className="relative w-full h-48 mb-4">
              <Image
                src="/ski_mohan_logo.png"
                alt="Ski Mohan Logo"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <h2 className="text-xl font-semibold mb-2 text-center">
              Become an Instructor
            </h2>
            <div className="mt-auto">
              <Link href="/staff/instructor" passHref>
                <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-700">
                  Start Here
                </button>
              </Link>
            </div>
          </div>

    

          {/* Volunteer to Help */}
          <div className="p-6 bg-gray-100 rounded-lg shadow-lg flex flex-col items-center">
            <div className="relative w-full h-48 mb-4">
              <Image
                src="/snowPic6.jpg"
                alt="Family Adventures"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <h2 className="text-xl font-semibold mb-2 text-center">
              Become an Assistant
            </h2>
            <div className="mt-auto">
              <Link href="/staff/assistant" passHref>
                <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-700">
                  Start Here
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Staff;
