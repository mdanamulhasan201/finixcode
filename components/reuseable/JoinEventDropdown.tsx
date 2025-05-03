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
                    <h3 className="text-[32px] font-[700] text-center text-[#FDE8CD] mb-5">Choose Payment Method</h3>

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
                                    <h4 className="font-medium text-[20px] text-white">bKash</h4>
                                    <div className='w-[22px] h-[22px]'>
                                        <Image src="/image/payment/bks.png" alt="bkash" width={100} height={100} className='w-full h-full object-contain' />
                                    </div>
                                </div>
                                <p className="text-sm text-white leading-tight">Send the payment now via bKash to confirm your spot instantly.</p>
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
                                    <h4 className="font-medium text-[20px] text-white">Cash</h4>
                                    <div className='w-[22px] h-[22px]'> 
                                        <Image src="/image/payment/cash.png" alt="cash" width={100} height={100} className='w-full h-full object-contain' />
                                    </div>
                                </div>
                                <p className="text-sm text-white leading-tight">Pay the event fee directly to the host before the game starts.</p>
                            </div>
                        </button>
                    </div>

                    {/* Continue Button */}
                    <button
                        className="w-full mt-5 bg-[#262626] text-white font-medium p-[16px] rounded-[100px] hover:bg-[#333333] transition-colors"
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