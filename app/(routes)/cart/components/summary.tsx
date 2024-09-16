"use client";

import axios from "axios";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { toast } from "react-hot-toast";
import { useUser } from '@clerk/nextjs';
import Modal from '@/components/ui/modal'; // Import your existing Modal component

const SummaryComponent = () => {
  const { user } = useUser();
  const searchParams = useSearchParams();
  const router = useRouter();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);
  const userId = user?.id; 
  const seasonId = "3523ea0b-4dc2-4efb-be8d-10e1740d2f63"; 

  const [acceptedRefundPolicy, setAcceptedRefundPolicy] = useState(false);
  const [acceptedTeachingPhilosophy, setAcceptedTeachingPhilosophy] = useState(false);
  const [acceptedLatenessPolicy, setAcceptedLatenessPolicy] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Modal states
  const [showRefundPolicy, setShowRefundPolicy] = useState(false);
  const [showTeachingPhilosophy, setShowTeachingPhilosophy] = useState(false);
  const [showLatenessPolicy, setShowLatenessPolicy] = useState(false);

  useEffect(() => {
    if (searchParams.get('success')) {
      toast.success('Payment completed.');
      removeAll();
      router.push(`/student-signup?items=${encodeURIComponent(JSON.stringify(items))}`);
    }

    if (searchParams.get('canceled')) {
      toast.error('Something went wrong.');
    }

    // Check if all terms are accepted before enabling the checkout button
    setTermsAccepted(acceptedRefundPolicy && acceptedTeachingPhilosophy && acceptedLatenessPolicy);
  }, [searchParams, removeAll, router, items, acceptedRefundPolicy, acceptedTeachingPhilosophy, acceptedLatenessPolicy]);

  const totalPrice = items.reduce((total, item) => {
    return total + (Number(item.price) * item.quantity);
  }, 0);
  const onCheckout = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/checkout`;
      const itemsWithProgramCodes = items.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        programCode: item.name,
      }));
  
      const response = await axios.post(url, {
        items: itemsWithProgramCodes,
        userId: user?.id,
        acceptedTerms: {
          refundPolicy: acceptedRefundPolicy,
          teachingPhilosophy: acceptedTeachingPhilosophy,
          latenessPolicy: acceptedLatenessPolicy,
        },
      });
  
      // Redirect to the Stripe checkout page
      window.location = response.data.url;
    } catch (error) {
      toast.error('Something went wrong during checkout.');
    }
  };

  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <div className="mb-4">
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={acceptedRefundPolicy}
            readOnly // The user can't manually check it, it gets checked on modal open
          />
          <span>
            I accept the{' '}
            <button
              type="button"
              className="text-blue-500 underline"
              onClick={() => {
                setShowRefundPolicy(true);
                setAcceptedRefundPolicy(true); // Automatically check the box
              }}
            >
              Refund Policy
            </button>
          </span>
        </label>
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={acceptedTeachingPhilosophy}
            readOnly // The user can't manually check it, it gets checked on modal open
          />
          <span>
            I accept the{' '}
            <button
              type="button"
              className="text-blue-500 underline"
              onClick={() => {
                setShowTeachingPhilosophy(true);
                setAcceptedTeachingPhilosophy(true); // Automatically check the box
              }}
            >
              Teaching Philosophy
            </button>
          </span>
        </label>
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={acceptedLatenessPolicy}
            readOnly // The user can't manually check it, it gets checked on modal open
          />
          <span>
            I accept the{' '}
            <button
              type="button"
              className="text-blue-500 underline"
              onClick={() => {
                setShowLatenessPolicy(true);
                setAcceptedLatenessPolicy(true); // Automatically check the box
              }}
            >
              Lateness Policy
            </button>
          </span>
        </label>
      </div>

      <div className="flex justify-between items-center border-t border-gray-200 pt-4">
        <div className="text-base font-medium text-gray-900">Order total</div>
        <Currency value={totalPrice} />
      </div>

      <div className="flex justify-end mt-4">
        <Button onClick={onCheckout} disabled={!userId || !termsAccepted}>Proceed to Checkout</Button>
      </div>

      {/* Refund Policy Modal */}
      <Modal
        isOpen={showRefundPolicy}
        onClose={() => setShowRefundPolicy(false)}
        title="Refund Policy"
        description="Please review the refund policy carefully."
      >
        <div className="space-y-4">
          <p>Operation & Refund Policy</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Any delay or failure in the performance of Mohan Skiing & Boarding (MSB) hereunder shall be excused if caused by Force Majeure (a cause or event that is not reasonably foreseeable or otherwise caused by or under the control of MSB, including acts of God). Events that are beyond the reasonable anticipation and control to prevent, avoid, delay, or mitigate are not attributable MSB failure to perform its obligations under this Agreement.</li>
            <li>Prior to December 1 of the current registration season, participants may request, in writing, a refund for their lessons &/or transportation.</li>
            <li>After November 29 of the current registration season, participants' lessons &/or transportation is NOT refundable unless the program is not completed by April 30. In this case, prorated refund checks will be issued. A $50 or 50% (whichever is greater) fee will be subtracted from each refund.</li>
            <li>Please note that it is typical to postpone program operations throughout the season due to weather or road conditions. The decision to operate or postpone is at the sole discretion of MSB. The operating status is posted daily on the MSB website and phone number voicemail. Please check frequently for the latest information.</li>
            <li>If a program is postponed, it is our policy to AUTOMATICALLY add a make-up program date to the end of the program schedule until all postponements are completed.</li>
          </ul>
        </div>
      </Modal>

      {/* Teaching Philosophy Modal */}
      <Modal
        isOpen={showTeachingPhilosophy}
        onClose={() => setShowTeachingPhilosophy(false)}
        title="Teaching Philosophy"
        description="Please review the teaching philosophy carefully."
      >
        <div className="space-y-4">
          <p>Mohan Skiing & Boarding</p>
          <h3>Teaching Philosophy</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>At Mohan, our goal is to make every student feel safe and confident about themselves and their abilities through their experiences of success on the slopes.</li>
            <li>To enable us to do this, our instructors have been trained to use certain areas of the mountain (primarily Holiday and Gallery) to teach more advanced techniques before transferring the class to challenging terrain. Once the students can demonstrate the specific technique, the class will progress to challenging terrain. We want the students to be ready to do so safely and with control. Please keep in mind that throughout the course of the season your students may go back to easier terrain multiple times.</li>
            <li>This method of teaching has been used at Mohan for several years with positive results, enabling us to teach in a safe environment for our students and instructors alike. Therefore, it is important to remember the area of the mountain where a lesson is taught does not always depict the ability level of the class.</li>
            <li>We believe learning is a lifelong journey that continues long after our lessons are over. Teaching our students how to ski safely, with care for themselves and others, is imperative to our school.</li>
          </ul>
          <p>Please tick to show you have read and understood the above.</p>
        </div>
      </Modal>

      {/* Lateness Policy Modal */}
      <Modal
        isOpen={showLatenessPolicy}
        onClose={() => setShowLatenessPolicy(false)}
        title="Lateness Policy"
        description="Please review the lateness policy carefully."
      >
        <div className="space-y-4">
          <p>Mohan Skiing & Boarding Lateness Policy</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Mohan Skiing & Boarding operates the following lateness policy for all its students.</li>
            <li>If you are 15 or more minutes late to your lesson, Mohan reserves the right to refuse you entry to your class for that day.</li>
            <li>Missing a class due to tardiness does NOT qualify your student for make-up classes.</li>
            <li>Absences that result in missing your class for two or more consecutive weeks will result in forfeiting the remaining classes without a refund.</li>
            <li>If you are late by less than 15 minutes, we will locate your class and take the student to their lesson.</li>
            <li>We ask all our customers to appreciate that the area where we teach our classes is vast, consisting of several different ski chairs and slopes. Therefore, locating a class can be time-consuming and also interrupts the lesson for the other students who have arrived on time.</li>
          </ul>
          <p>By checking the below box, you are agreeing to uphold the above policy.</p>
        </div>
      </Modal>
    </div>
  );
};

const Summary = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <SummaryComponent />
  </Suspense>
);

export default Summary;