"use client";

import Modal from "@/components/ui/modal";
import { StudentSignupForm, StudentFormValues } from "@/components/ui/studentSignUpForm";

interface StudentFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: StudentFormValues) => void;
  currentSlot: number;
  programCode: string;
}

const StudentFormModal: React.FC<StudentFormModalProps> = ({ isOpen, onClose, onSubmit, currentSlot, programCode }) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className="p-6 max-h-screen overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Student #{currentSlot}</h2>
        <StudentSignupForm
          onSubmit={(data) => {
            console.log("Submitting data:", data);
            onSubmit(data);
          }}
          programCode={programCode}
        />
      </div>
    </Modal>
  );
};

export default StudentFormModal;
