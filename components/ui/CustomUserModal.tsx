"use client";

import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';
import { useUser, useAuth, UserProfile } from '@clerk/nextjs';
import IconButton from '@/components/ui/icon-button';
import styles from './CustomUserModal.module.css';

interface CustomUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CustomUserData {
  email: string;
  stripeCustomerId: string;
  students: StudentData[];
}

interface StudentData {
  name: string;
  classNumber: number;
  instructorName: string;
  meetingPoint: string;
}

const CustomUserModal: React.FC<CustomUserModalProps> = ({ isOpen, onClose }) => {
  const { user } = useUser();
  const { signOut } = useAuth();
  const [userData, setUserData] = useState<CustomUserData | null>({
    email: user?.primaryEmailAddress?.emailAddress || '',
    stripeCustomerId: 'test_stripe_customer_id',
    students: [
      {
        name: 'John Doe',
        classNumber: 101,
        instructorName: 'Jane Smith',
        meetingPoint: 'Meeting Point A'
      },
      {
        name: 'Mary Johnson',
        classNumber: 102,
        instructorName: 'James Brown',
        meetingPoint: 'Meeting Point B'
      }
    ]
  });
  const [selectedTab, setSelectedTab] = useState('profile');

  const renderContent = () => {
    switch (selectedTab) {
      case 'profile':
        return (
          <div className={styles.fullWidth}>
            <UserProfile routing="hash" />
          </div>
        );
      case 'studentInfo':
        return (
          <div className={styles.customData}>
            <h3 className={styles.centeredTitle}>Student Information</h3>
            <div className={styles.studentGrid}>
              {userData?.students.map((student, index) => (
                <div key={index} className={styles.studentColumn}>
                  <p><strong>Student Name:</strong> {student.name}</p>
                  <p><strong>Class Number:</strong> {student.classNumber}</p>
                  <p><strong>Instructor Name:</strong> {student.instructorName}</p>
                  <p><strong>Meeting Point:</strong> {student.meetingPoint}</p>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (!isOpen) return null; // Only render the modal if it's open

  return (
    <Dialog as="div" className="relative z-10" open={isOpen} onClose={onClose}>
    <div className="fixed inset-0 bg-black bg-opacity-50" />

    <div className="fixed inset-0 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4 text-center">
        <Dialog.Panel className="w-full max-w-6xl overflow-hidden rounded-lg text-left align-middle bg-white shadow-2xl">
          <div className="relative flex w-full">
            <div className={styles.sidebar}>
              <button
                className={selectedTab === 'profile' ? styles.activeTab : ''}
                onClick={() => setSelectedTab('profile')}
              >
                Profile
              </button>
              <button
                className={selectedTab === 'studentInfo' ? styles.activeTab : ''}
                onClick={() => setSelectedTab('studentInfo')}
              >
                Student Information
              </button>
              <button
                onClick={() => signOut()}
                className={styles.signOutButton}
              >
                Sign Out
              </button>
            </div>
            <div className={styles.content}>
              <div className="absolute right-4 top-4">
                <IconButton onClick={onClose} icon={<X size={15} />} />
              </div>
              {renderContent()}
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </div>
  </Dialog>
  );
};

export default CustomUserModal;
