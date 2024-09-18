"use client"
import { useState } from "react";
import ClinicTable from "@/components/clinicTable";
import { Button } from "@/components/ui/button";
import { VolunteerForm } from "./components/volunteer-form";

const Volunteer = () => {
  const [showForm, setShowForm] = useState(false);

  const handleApplyNowClick = () => {
    setShowForm(true);
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      {!showForm ? (
        <>
          <h1 className="text-6xl font-bold text-blue-800 mb-6 text-center">
            Volunteer
          </h1>
          <h1 className="text-6xl font-bold mb-6 text-center">
            VOLUNTEERS NEEDED - JOIN US TODAY!!
          </h1>
          <h1 className="text-2xl font-bold mb-6 text-center">
            OUR SCHOOL PROGRAMS RELY HEAVILY ON VOLUNTEER PARENTS AND/OR TEACHERS TO
            HELP COORDINATE AND FACILITATE THE WEEKLY PROGRAM. OUTLINED BELOW ARE
            THE DESCRIPTIONS OF THE POSITIONS AND THEIR VARIOUS RESPONSIBILITIES.
          </h1>
          <h1 className="text-xl font-bold mb-6">
            VOLUNTEER POSITIONS:
          </h1>
          <h1 className="text-xl font-bold mb-6">
            PROGRAM COORDINATOR:
          </h1>
          <p>
            Responsibilities include: Promoting ski/board club, directing parents/students to
            on-line registration, conducting one information meeting for students/parents, being
            available to answer questions about ski/board club as they arise, selecting and
            scheduling your school's/program's chaperones (generally the PC is also the head
            chaperone and coordinates emergency driver's teams.)
          </p>
          <br />
          <h1 className="text-xl font-bold mb-6">
            BUS CHAPERONE
          </h1>
          <p>
            Loads & checks-in students as they board the bus both to & from Summit. Enforces good
            behavior and rules on the bus.
          </p>
          <br />
          <h1 className="text-xl font-bold mb-6">
            EMERGENCY DRIVER
          </h1>
          <p>
            Team available to take a student to either an Emergency room or home. This is for
            students who are too ill to stay up at the mountain but do not require ambulance
            transportation to an emergency room. You must check in at the Mohan Hut as soon as you
            arrive (prior to the start of any daily lessons) and you are required to stay until the
            last bus.
          </p>
          <br />
          <h1 className="text-l font-bold mb-6">
            TO BE AN EMERGENCY DRIVER, YOU MUST
          </h1>
          <ul className="list-disc pl-5 mb-6 space-y-1">
            <li>Hold a valid driver's license</li>
            <li>Provide a minimum of $100,000/$300,000 liability insurance for yourselves and the vehicle</li>
            <li>Have two adults in the car, one male and one female</li>
            <li>Have a full length sleeping area in the vehicle with easy access</li>
            <li>Maintain the vehicle in mechanical condition with snow or studded tires</li>
            <li>Carry chains, road flares, a first aid kit, several blankets, a plastic sack, deicer, and a window scraper</li>
          </ul>
      
          <h1 className="text-l font-bold mb-6">
            APPLICANT INSTRUCTIONS
          </h1>
          <p>
            Please contact the Program Coordinator for the school program you are interested in
            assisting. Complete the Volunteer Registration form on-line. There is no fee to
            register. You will be required to complete Sections C & D of the Washington State Patrol
            Form.
          </p>
          <br />
          <h1 className="text-l font-bold mb-6">
            VOLUNTEER TICKET AND PASS GUIDELINES
          </h1>
          <p>
            The Ski Area controls all policies and guidelines for Discount Season Passes & Free Daily Lift tickets.
          </p>
          <br />
          <h1 className="text-l font-bold mb-6">
            SINGLE DAY BUS TICKETS
          </h1>
          <p>
            If there is a vacant seat on one of our buses, the head chaperone may sell $75 single
            ride tickets to anyone wishing the single day transportation option.
          </p>
          <br />
          {/* <h1 className="text-l font-bold mb-6">
            PROGRAM COORDINATOR SEASON PASSES
          </h1>
          <p>
            Mohan Skiing and Boarding will pay the first three hundred fifty dollars ($350) of your
            season pass. Please submit your receipt for your pass and you will receive the
            reimbursement. Please keep in mind that this season pass is only good for the named
            Program Coordinator and there may only be one PC per program!
          </p> */}
          <br />
          <h1 className="text-l font-bold mb-6">
            BUS CHAPERONES
          </h1>
          <p>
            Every bus may receive up to two (2) free dated tickets. This allows each program to
            provide a chaperone and emergency driver with a ticket for the day. No other non-paying
            passengers are to be allowed on the bus for any reason without the advance permission of
            the Ski School Director.
          </p>
          <br />
          <h1 className="text-l font-bold mb-6">
            EMERGENCY DRIVERS
          </h1>
          <p>
            EACH Bus is allowed one (1) Emergency Driver. The Emergency Driver receives one (1) free
            dated ticket. Emergency Drivers must report to the ski school meeting hut upon arriving
            at the mountains (before the buses arrive). They are to check in with the ski patrol at
            least once every 2 hours to check for injured participants. Finally, they must NOT leave
            the mountains until all participants are accounted for and all the buses from their
            program have left the parking lot for the return trip.
          </p>
          <br />
          <h1 className="text-l font-bold mb-6">
            SATURDAY AND SUNDAY PROGRAM GREETERS
          </h1>
          <p>
            We want one (1) or two (2) greeters for most sessions we teach group lessons. Mohan
            Skiing and Boarding will pay 50% of the daily ticket price for each greeter agreeing to
            work at least two sessions on that day. Since we only use one or two greeters per
            session, anyone interested in this position should submit their Volunteer application to
            the ski school office ASAP. We will then select the greeters as needed for each session.
          </p>
          <br />
          <p>
            Please Note: Forms are required regardless of other background checks done through your
            school or other organizations.
          </p>
          <br />

          <h1>Volunteer Forms</h1>
          <p>
        Please download and complete the following forms and Save as a PDF:
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

<li>
  <a 
    className="text-blue-500"
    href="https://skimohan.sharepoint.com/:b:/s/Mohan_Website_Documents/EWXgNyGXj89NpbGNkU1cVcwBvOjpIjl63mM0KCN06qH9rA?e=bjkMmz"
    target="_blank"
    rel="noopener noreferrer"
  >
   Volunteer App
  </a>
</li>

<li>
  <a 
    className="text-blue-500"
    href="https://skimohan.sharepoint.com/:b:/s/Mohan_Website_Documents/EdHauKuROidLgSDEWHEWAB0Bt7DxFHBJMhureE_EpZbR-w?e=CvBqne"
    rel="noopener noreferrer"
  >
   Friday Night Volunteer App
  </a>
</li>

      </ul>
          <div className="text-center">
            <Button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={handleApplyNowClick}>
              Apply Now
            </Button>
          </div>
          <br /><br />
          <ClinicTable />
        </>
      ) : (
        <VolunteerForm />
      )}
    </div>
  );
};

export default Volunteer;
