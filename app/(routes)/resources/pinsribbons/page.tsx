import Image from "next/image";
const pinsribbons = () => {
  return ( 
  <div className="max-w-6xl mx-auto p-8">
  <h1 className="text-6xl font-bold text-blue-800 mb-6 text-center">
 
  Pins & Ribbons - Students Earn Medals of Achievement
  </h1>
  <div className="flex justify-center mb-10">
      <Image
          src="/ribbons.jpg" // Use the correct path to your image file
          alt="picture of some ribbons given out"
          width={300} // Adjust the size as needed
          height={300} // Adjust the size as needed
          layout="intrinsic"
        />
        </div>
  <p>
  As students progress through the season, they receive ribbons to demonstrate their progress in their lessons. At the end of most classes, students receive one of more than 15 different ribbons to show to their family and friends. These ribbons are great tools to reward and motivate students, and lift their spirits if something didn’t go right during the day. Ribbons can reward students for demonstrating a particular skill, such as "Terrific Turner", or a certain behavior or attitude, such as "Most Daring.)
  </p>
  <br />
  <p>At the end of the season, students have the opportunity to demonstrate what they have learned to our supervisors and earn one of more than ten beautiful "PASS" (Personal Achievement Snow Skill) medal pins. These pin awards indicate either a student's progression from one level of skiing ability to another, or the achievement of a particular skill. After students have been awarded any four Advanced Specialty pins, they are eligible to receive our "Certified Double Diamond" medal pin.</p>
 
</div> );
}
 
export default pinsribbons;