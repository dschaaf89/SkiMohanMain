// "use client";

// import { Dialog, Transition } from '@headlessui/react';
// import { X } from 'lucide-react';
// import { Fragment } from 'react';
// import IconButton from '@/components/ui/icon-button';

// interface ModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   children: React.ReactNode;
//   title?: string; // Add title prop
//   description?: string; // Add description prop
// };

// const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children,  title,
//   description, }) => {
//   return (
//     <Transition show={isOpen} appear as={Fragment}>
//       <Dialog as="div" className="relative z-10" onClose={onClose}>
//         <div className="fixed inset-0 bg-black bg-opacity-50" />

//         <div className="fixed inset-0 overflow-y-auto">
//           <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-6 md:p-8">
//             <Transition.Child
//               as={Fragment}
//               enter="ease-out duration-300"
//               enterFrom="opacity-0 scale-95"
//               enterTo="opacity-100 scale-100"
//               leave="ease-in duration-200"
//               leaveFrom="opacity-100 scale-100"
//               leaveTo="opacity-0 scale-95"
//             >
//               <Dialog.Panel className="w-full max-w-5xl overflow-hidden rounded-lg text-left align-middle bg-white shadow-2xl">
//                 <div className="relative flex w-full items-center overflow-hidden p-6">
//                   <div className="absolute right-4 top-4">
//                     <IconButton onClick={onClose} icon={<X size={15} />} />
//                   </div>
//                   {title && <h2 className="text-lg font-bold">{title}</h2>} {/* Render title if provided */}
//                   {description && <p className="text-sm text-gray-600">{description}</p>} {/* Render description if provided */}
//                   {children}
//                 </div> 
//               </Dialog.Panel>
//             </Transition.Child>
//           </div>
//         </div>
//       </Dialog>
//     </Transition>
//   );
// };

// export default Modal;
"use client";

import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';
import IconButton from '@/components/ui/icon-button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string; // Add title prop
  description?: string; // Add description prop
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title, description }) => {
  if (!isOpen) return null; // Render nothing if the modal is closed

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-10">
    <div className="fixed inset-0 bg-black bg-opacity-50" />
    <div className="fixed inset-0 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4 text-center">
        <Dialog.Panel className="w-full max-w-2xl overflow-hidden rounded-lg bg-white p-6 shadow-xl">
          <div className="relative">
            <IconButton onClick={onClose} icon={<X size={15} />} />
            <div>
              {title && <h2 className="text-lg font-bold">{title}</h2>}
              {description && <p className="mt-2 text-gray-600">{description}</p>}
              <div>{children}</div>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </div>
  </Dialog>
  );
};

export default Modal;
