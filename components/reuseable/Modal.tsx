import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div 
                className="fixed inset-0 bg-black/70 z-40 transition-opacity"
                onClick={onClose}
            />
            
            {/* Modal */}
            <div className="fixed inset-0 z-50 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center">
                    <div className="relative transform overflow-hidden bg-[#34735F] rounded-xl shadow-xl transition-all w-full max-w-[350px] py-[28px]">
                        <div className="absolute right-3 top-3">
                            <button
                                onClick={onClose}
                                className="text-[#F8E4C9] hover:text-white"
                            >
                                <span className="sr-only">Close</span>
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
} 