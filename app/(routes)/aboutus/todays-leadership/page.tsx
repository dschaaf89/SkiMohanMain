import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const TodaysLeadership = () => {
  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-6xl font-bold text-blue-800 mb-6 text-center">
        Todays Leadership Team
      </h1>
      <div className="grid grid-cols-3 gap-8">
        {" "}
        {/* Grid container */}
        {/* Column 1 */}
        <div className="space-y-4">
          {" "}
          <Card className="flex flex-col h-full bg-gray-100">
            <CardHeader>
              <CardTitle className="text-center">DAN ALBERTINI</CardTitle>
              <CardDescription className="text-center text-black">
                {" "}
                STAFF SERVICES DIRECTOR & BOARD MEMBER
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Image
                src="/New-Dan.jpg"
                alt="Dan Albertini"
                width={250}
                height={200}
                objectFit="cover"
              />
            </CardContent>
            <CardFooter className="text-center">
              <p>
                Dan has 20 years experience with Mohan. He started as a ski
                instructor which naturally led him into the role of clinic
                instructor and then Supervisor. Dan now serves as a member on
                the Mohan Board of Directors. His love is creating smiles by
                handing out awards and recognition.
              </p>
            </CardFooter>
          </Card>
          {/* Vertical spacing */}
        </div>
        {/* Column 2 */}
        <div className="space-y-4">
          {" "}
          {/* Vertical spacing */}
          <Card className="flex flex-col h-full bg-gray-100">
            <CardHeader>
              <CardTitle className="text-center">GORDY BALL</CardTitle>
              <CardDescription className="text-center text-black">
                {" "}
                TECHNICAL DIRECTOR & BOARD MEMBER
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Image
                src="/New-Gordy_0.jpg"
                alt="GORDY BALL"
                width={250}
                height={200}
                objectFit="cover"
              />
            </CardContent>
            <CardFooter className="text-center">
              <p>
                {" "}
                Gordy has over forty years experience teaching and leading ski
                enthusiasts of all ages. He continues to serve the Professional
                Ski Instructors of America (PSIA) as an examiner and has served
                on the Board of Directors, and as a divisional clinic leader.
                "Developing a community of skillful, joyful, student centered
                instructors that lead students into successful mountain
                experiences" continues to be his lifelong goal.
              </p>
            </CardFooter>
          </Card>
        </div>
        {/* Column 3 */}
        <div className="space-y-4">
          {" "}
          {/* Vertical spacing */}
          <Card className="flex flex-col h-full bg-gray-100">
            <CardHeader>
              <CardTitle className="text-center">TIM BERGLUND</CardTitle>
              <CardDescription className="text-center text-black">
                {" "}
                SUPERVISOR & BOARD MEMBER
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Image
                src="/Tim Ski photo 2.jpg" // Replace with the path to the third image
                alt="Tim Berglund"
                width={300}
                height={400}
                objectFit="cover"
              />
            </CardContent>
            <CardFooter className="text-center">
              <p>
                {" "}
                Tim has been teaching with Mohan Ski School since 1989. Tim
                began as an assistant while in junior high school, before being
                promoted to instructor. While on staff for Mohan, Tim has served
                as a full-time instructor for 5 yrs, resident desk supervisor,
                ski and snowboard clinician and currently serves on the Mohan
                Board of Directors. Tim has lived by the motto taught by John
                Mohan himself, "We are teaching people how to have fun, not how
                to ski. People learn to ski, because they are having fun.
              </p>
            </CardFooter>
          </Card>
        </div>
        <br />
      </div>
      <div className="grid gap-8">
        {" "}
        {/* Grid container */}
        {/* Column 1 */}
        <div className="space-y-4"> {/* Vertical spacing */}</div>
        {/* Column 2 */}
        <div className="space-y-4">
          {" "}
          {/* Vertical spacing */}
          {/* <Card className="flex flex-col h-full bg-gray-100">
            <CardHeader>
              <CardTitle className="text-center">Nathaniel Gibbs</CardTitle>
              <CardDescription className="text-center text-black-800">
                General Manager
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Image
                src="/NathanielGibbs.png" // Replace with the path to the third image
                alt="Nathaniel Gibbs"
                width={250}
                height={200}
                objectFit="cover"
              />
            </CardContent>
            <CardFooter className="text-center">
              <p>
                {" "}
                Nathaniel has been in the ski industry for 8+ years and has been
                skiing for much longer. He enjoys being up on the mountain with
                the fabulous Mohan team and the students that join us up on the
                slopes. He is currently Mohan’s General Manager, and you will
                see him in the community at events as well as up on the slopes
                during the season. He also oversees the mountain operations
                alongside the Technical Director and oversees the Mohan Office.
                He loves to get to know all the Mohanian students and their
                families so come up and say hello! Nathaniel will do what he can
                to help provide everyone with the opportunity to be up on the
                slopes, experiencing skiing and boarding and the wonders of the
                snowy mountains. Outside of Mohan, Nathaniel is a member of
                Rotary International and is a local Rotarian where he does
                community service events and supports the local community with
                his clubs.
              </p>
            </CardFooter>
          </Card> */}
        </div>
        {/* Column 3 */}
        <div className="space-y-4"> {/* Vertical spacing */}</div>
      </div>
      <br />
      <br />
      <div className="grid grid-cols-2 gap-8">
        {/* Column 1 */}
        <div className="space-y-4">
          {/* <Card className="flex flex-col h-full bg-gray-100">
            <CardHeader>
              <CardTitle className="text-center">Ruth Richardson</CardTitle>
              <CardDescription className="text-center text-black-800">
                OFFICE MANAGER
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Image
                src="/RuthLodge.jpg" // Replace with the path to the third image
                alt="Ruth Richardson"
                width={200}
                height={200}
                objectFit="cover"
              />
            </CardContent>
            <CardFooter className="text-center">
              <p>
                Ruth began volunteering in our office in 2017 while getting
                reintroduced to skiing. She was a test student for all of our
                instructors to finesse their skill with. She is well versed with
                the Mohan teachings and brings over 25 years of practice
                management to the Mohan Family. She is our point guard on and
                off of the mountain for staff and student registration
                protocols. She also coordinates all of our private lessons and
                handles most of the emails and phone calls during the season.
                Her personal goal in and out of the office is to flip an upside
                down smile to the way it should be.
              </p>
            </CardFooter>
          </Card> */}
        </div>

        {/* Column 2 */}
        <div className="space-y-4">
        <Card className="flex flex-col h-full bg-gray-100">
            <CardHeader>
              <CardTitle className="text-center">Emily Sheehan</CardTitle>
              <CardDescription className="text-center text-black-800">
              Program Coordinator Manager
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Image
                src="/Emily.jpg" // Replace with the path to the third image
                alt="Emily Sheehan"
                width={200}
                height={200}
                objectFit="cover"
              />
            </CardContent>
            <CardFooter className="text-center">
              <p>
              An avid skier and snow enthusiast, Emily loves being up on the mountain with the team at Mohan. On top of over 25+ years of ski experience (she’s been skiing as long as she could walk), she is a PSIA Level I Instructor with over 2+ years in the skiing industry. While not working in the office or instructing students, she’s out with her gimbal on the slopes making movies for Mohan. She works in the office to make sure all your questions are answered quickly and efficiently, so that you’re all set to buckle up your boots and get out there! She loves working with new students and building community within Mohan. When she’s not skiing (or answering skiing related emails,) Emily works as a narrative/commercial film director/producer.  
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TodaysLeadership;
