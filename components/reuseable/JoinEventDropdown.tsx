"use client"
import React, { useState } from 'react'
import Button from './button'
import Modal from './Modal'
import Image from 'next/image'
interface JoinEventDropdownProps {
    onJoin?: () => void;
    className?: string;
}

export default function JoinEventDropdown({ onJoin, className }: JoinEventDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<'bkash' | 'cash' | null>(null);

    const handleJoinClick = (type: 'bkash' | 'cash') => {
        setSelectedOption(type);
    };

    return (
        <div className="relative w-full">
            <Button 
                text="Join event" 
                className={className}
                onClick={() => setIsOpen(true)}
            />
            
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <div className="p-5">
                    {/* Money Icon */}
                    <div className="flex justify-center mb-2">
                      <Image src="/image/payment/logo.png" alt="money" width={100} height={100} />
                    </div>

                    {/* Title */}
                    <h3 className="text-[22px] font-semibold text-center text-[#F8E4C9] mb-5">Choose Payment Method</h3>

                    {/* Options */}
                    <div className="space-y-2">
                        <button 
                            onClick={() => handleJoinClick('bkash')}
                            className="w-full text-left py-1.5 transition-colors flex items-center gap-2.5"
                        >
                            <div className={`w-[18px] h-[18px] rounded-full border-[1.5px] ${selectedOption === 'bkash' ? 'border-[#F8E4C9] bg-[#F8E4C9]' : 'border-[#F8E4C9]/70'} flex items-center justify-center flex-shrink-0`}>
                                {selectedOption === 'bkash' && <div className="w-[8px] h-[8px] rounded-full bg-emerald-600"></div>}
                            </div>
                            <div>
                                <div className="flex items-center gap-1.5">
                                    <p className="font-medium text-[15px] text-[#F8E4C9]">bKash</p>
                                    <svg className="w-4 h-4 text-[#F8E4C9]" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                                    </svg>
                                </div>
                                <p className="text-sm text-[#F8E4C9]/70 leading-tight">Send the payment now via bKash to confirm your spot instantly.</p>
                            </div>
                        </button>
                        
                        <button 
                            onClick={() => handleJoinClick('cash')}
                            className="w-full text-left py-1.5 transition-colors flex items-center gap-2.5"
                        >
                            <div className={`w-[18px] h-[18px] rounded-full border-[1.5px] ${selectedOption === 'cash' ? 'border-[#F8E4C9] bg-[#F8E4C9]' : 'border-[#F8E4C9]/70'} flex items-center justify-center flex-shrink-0`}>
                                {selectedOption === 'cash' && <div className="w-[8px] h-[8px] rounded-full bg-emerald-600"></div>}
                            </div>
                            <div>
                                <div className="flex items-center gap-1.5">
                                    <p className="font-medium text-[15px] text-[#F8E4C9]">Cash</p>
                                    <svg className="w-4 h-4 text-[#F8E4C9]" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                                    </svg>
                                </div>
                                <p className="text-sm text-[#F8E4C9]/70 leading-tight">Pay the event fee directly to the host before the game starts.</p>
                            </div>
                        </button>
                    </div>

                    {/* Continue Button */}
                    <button 
                        className="w-full mt-5 bg-[#262626] text-[#F8E4C9] font-medium py-2.5 px-4 rounded-lg hover:bg-[#333333] transition-colors"
                        onClick={() => {
                            if (selectedOption) {
                                onJoin?.();
                                setIsOpen(false);
                            }
                        }}
                    >
                        Continue
                    </button>
                </div>
            </Modal>
        </div>
    )
} 