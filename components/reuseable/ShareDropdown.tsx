import React, { useState, useRef, useEffect } from 'react';
import { IoShareOutline } from "react-icons/io5";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { MdContentCopy } from "react-icons/md";
import toast from 'react-hot-toast';

interface ShareDropdownProps {
    url?: string;
}

export default function ShareDropdown({ url = typeof window !== 'undefined' ? window.location.href : '' }: ShareDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const shareOptions = [
        {
            name: 'Facebook',
            icon: <FaFacebookF className="w-4 h-4" />,
            shareUrl: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
            color: 'text-blue-600'
        },
        {
            name: 'Twitter',
            icon: <FaTwitter className="w-4 h-4" />,
            shareUrl: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
            color: 'text-blue-400'
        },
        {
            name: 'LinkedIn',
            icon: <FaLinkedinIn className="w-4 h-4" />,
            shareUrl: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
            color: 'text-blue-700'
        },
        {
            name: 'WhatsApp',
            icon: <FaWhatsapp className="w-4 h-4" />,
            shareUrl: `https://wa.me/?text=${encodeURIComponent(url)}`,
            color: 'text-green-500'
        }
    ];

    const handleShare = (shareUrl: string) => {
        window.open(shareUrl, '_blank', 'width=600,height=400');
        setIsOpen(false);
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(url);
            toast.success('Link copied to clipboard!', {
                duration: 2000,
                position: 'top-right',
                style: {
                    background: '#34735F',
                    color: '#fff',
                },
            });
            setIsOpen(false);
        } catch (error: unknown) {
            console.error('Failed to copy link:', error);
            toast.error('Failed to copy link', {
                duration: 2000,
                position: 'top-right',
                style: {
                    background: '#DA6049',
                    color: '#fff',
                },
            });
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className='w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50'
            >
                <IoShareOutline className="w-5 h-5 text-gray-700" />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                    {shareOptions.map((option, index) => (
                        <button
                            key={option.name}
                            onClick={() => handleShare(option.shareUrl)}
                            className={`w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 ${
                                index !== shareOptions.length - 1 ? 'border-b border-gray-100' : ''
                            }`}
                        >
                            <span className={option.color}>{option.icon}</span>
                            <span className="text-sm text-gray-700">{option.name}</span>
                        </button>
                    ))}
                    <button
                        onClick={copyToClipboard}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 border-t border-gray-100"
                    >
                        <span className="text-gray-600">
                            <MdContentCopy className="w-4 h-4" />
                        </span>
                        <span className="text-sm text-gray-700">Copy Link</span>
                    </button>
                </div>
            )}
        </div>
    );
} 