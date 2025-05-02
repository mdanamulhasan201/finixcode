"use client"
import React, { useState, useRef, useEffect } from 'react'
import { HiOutlineDotsVertical } from "react-icons/hi"
import { MdOutlineReport } from "react-icons/md"
import { IoShareOutline } from "react-icons/io5"
import { RiUserUnfollowLine } from "react-icons/ri"

export default function MoreOptionsDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button 
                className='w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50'
                onClick={() => setIsOpen(!isOpen)}
            >
                <HiOutlineDotsVertical className="w-5 h-5 text-gray-700" />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
                    <div className="py-1">
                        <button 
                            className="w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-3"
                            onClick={() => {
                                console.log('Report');
                                setIsOpen(false);
                            }}
                        >
                            <MdOutlineReport className="w-5 h-5 text-gray-500" />
                            <span>Report this event</span>
                        </button>
                        <button 
                            className="w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-3"
                            onClick={() => {
                                console.log('Share');
                                setIsOpen(false);
                            }}
                        >
                            <IoShareOutline className="w-5 h-5 text-gray-500" />
                            <span>Share</span>
                        </button>
                        <button 
                            className="w-full px-4 py-3 text-left text-red-600 hover:bg-gray-50 flex items-center gap-3"
                            onClick={() => {
                                console.log('Not interested');
                                setIsOpen(false);
                            }}
                        >
                            <RiUserUnfollowLine className="w-5 h-5 text-red-600" />
                            <span>Not interested</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
} 