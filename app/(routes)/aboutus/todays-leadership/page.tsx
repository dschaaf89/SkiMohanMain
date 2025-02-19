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
        Today's Leadership Team
      </h1>
      <div className="grid grid-cols-3 gap-8">
        {/* Column 1 */}
        <div className="space-y-4">
          <Card className="flex flex-col h-full bg-gray-100">
            <CardHeader>
              <CardTitle className="text-center">DAN ALBERTINI</CardTitle>
              <CardDescription className="text-center text-black">
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
        </div>

        {/* Column 2 */}
        <div className="space-y-4">
          <Card className="flex flex-col h-full bg-gray-100">
            <CardHeader>
              <CardTitle className="text-center">GORDY BALL</CardTitle>
              <CardDescription className="text-center text-black">
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
                Gordy has over forty years experience teaching and leading ski
                enthusiasts of all ages. He continues to serve the Professional
                Ski Instructors of America (PSIA) as an examiner and has served
                on the Board of Directors, and as a divisional clinic leader.
                "Developing a community of skillful, joyful, student-centered
                instructors that lead students into successful mountain
                experiences" continues to be his lifelong goal.
              </p>
            </CardFooter>
          </Card>
        </div>

        {/* Column 3 */}
        <div className="space-y-4">
          <Card className="flex flex-col h-full bg-gray-100">
            <CardHeader>
              <CardTitle className="text-center">TIM BERGLUND</CardTitle>
              <CardDescription className="text-center text-black">
                SUPERVISOR & BOARD MEMBER
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Image
                src="/Tim Ski photo 2.jpg"
                alt="Tim Berglund"
                width={300}
                height={400}
                objectFit="cover"
              />
            </CardContent>
            <CardFooter className="text-center">
              <p>
                Tim has been teaching with Mohan Ski School since 1989. Tim
                began as an assistant while in junior high school, before being
                promoted to instructor. While on staff for Mohan, Tim has served
                as a full-time instructor for 5 yrs, resident desk supervisor,
                ski and snowboard clinician, and currently serves on the Mohan
                Board of Directors. Tim has lived by the motto taught by John
                Mohan himself, "We are teaching people how to have fun, not how
                to ski. People learn to ski, because they are having fun."
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 mt-8">
        {/* Column 1 */}
        <div className="space-y-4"></div>

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
                src="/Emily.jpg"
                alt="Emily Sheehan"
                width={200}
                height={200}
                objectFit="cover"
              />
            </CardContent>
            <CardFooter className="text-center">
              <p>
                An avid skier and snow enthusiast, Emily loves being up on the
                mountain with the team at Mohan. On top of over 25+ years of ski
                experience (she’s been skiing as long as she could walk), she is
                a PSIA Level I Instructor with over 2+ years in the skiing
                industry.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TodaysLeadership;
