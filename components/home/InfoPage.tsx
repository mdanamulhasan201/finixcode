import Image from 'next/image';
import { BannerData } from '../../types';
import { useState } from 'react';
import Link from 'next/link';
import { MdAccessTime, MdOutlineDateRange, MdOutlineLocationOn } from 'react-icons/md';
import { TbAntennaBars5, TbAntennaBars3 } from 'react-icons/tb';
import MessageModal from '../shared/MessageModal';
import ProfileModal from '../shared/ProfileModal';

interface InfoPageProps {
    currentEvent: BannerData;
}

interface HostData {
    id: number;
    name: string;
    image: string;
    "activities hosted": string;
    "host rating": string;
    description?: string;
}

export default function InfoPage({ currentEvent }: InfoPageProps) {
    const [expandedAbout, setExpandedAbout] = useState<{ [key: string | number]: boolean }>({});
    const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [selectedHost, setSelectedHost] = useState<HostData | null>(null);

    const getFirstTwoWords = (text: string) => {
        return text.split(' ').slice(0, 40).join(' ') + '...';
    };

    const toggleAbout = (id: string | number) => {
        setExpandedAbout(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const handleMessageClick = (host: HostData) => {
        setSelectedHost(host);
        setIsMessageModalOpen(true);
    };

    const handleViewProfile = (host: HostData) => {
        setSelectedHost(host);
        setIsProfileModalOpen(true);
    };

    const handleSendMessage = (message: string) => {
        console.log('Sending message to host:', selectedHost?.name, 'Message:', message);
        setIsMessageModalOpen(false);
    };

    return (
        <div className="space-y-6 ">
            {currentEvent?.Info && currentEvent.Info.map((info) => (
                <div key={info.id} className="space-y-6">
                    {/* Sports, Gender, Age */}
                    <div className="flex justify-between items-center gap-2 border-b border-[#E5E5E5] pb-6">
                        <div className='flex flex-wrap gap-2'>
                            {info.title.split(',').map((sport, idx) => (
                                <span key={idx} className="bg-blue-100 text-[#4A4A4A] px-[24px] py-[14px] rounded-[48px] text-[16px]">
                                    {sport.trim()}
                                </span>
                            ))}
                            <span className="bg-pink-100 px-[20px] py-[14px] rounded-[48px]  text-[#4A4A4A]   text-[16px]">
                                {info.gender}
                            </span>
                            <span className="bg-[#EFEDFF] text-[#4A4A4A] px-[20px] py-[14px] rounded-[48px] text-[16px]">
                                Age: {info.age}
                            </span>
                        </div>
                        <span className="bg-green-100 text-[#4A4A4A] px-[20px] py-[14px] rounded-[48px] text-[16px] flex items-center gap-2">
                            {info.type === 'Advanced' ? (
                                <TbAntennaBars5 className="text-2xl text-green-500" />
                            ) : (
                                <TbAntennaBars3 className="text-2xl text-green-500" />
                            )}
                            {info.type}
                        </span>
                    </div>

                    {/* About this event */}
                    <div className='border-b border-[#E5E5E5] pb-6'>
                        <h3 className="text-[32px] font-[700] text-[#171717] mb-2">About this event</h3>
                        <p className="text-gray-700">
                            {expandedAbout[info.id] ? info.about : getFirstTwoWords(info.about)}
                        </p>
                        <button
                            className="text-blue-500 cursor-pointer mt-2"
                            onClick={() => toggleAbout(info.id)}
                        >
                            {expandedAbout[info.id] ? 'Read less' : 'Read more'}
                        </button>
                    </div>

                    {/* Location */}
                    <div className='border-b border-[#E5E5E5] pb-10'>
                        <h3 className="text-xl font-semibold mb-2">Location</h3>
                        <div className='flex flex-col gap-3 lg:flex-row items-center justify-between'>
                            <div>
                                <p className="font-medium">NDE Field</p>
                                <p className="text-gray-700">{info.location}</p>
                            </div>
                            <Link href={info.map} target='_blank' className='text-[#4E566B] border cursor-pointer hover:text-[#DA6049] transform duration-300 border-[#4E566B] text-[16px] font-[500] px-[16px] py-[12px] rounded-[99px]'>Open maps</Link>
                        </div>
                    </div>

                    {/* Good to know */}
                    <div className='border-b border-[#E5E5E5] pb-10'>
                        <h3 className="text-[32px] font-[700] text-[#171717] mb-4">Good to know</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Highlights */}
                            <div className="bg-[#DA6049] text-white p-4 rounded-lg">
                                <h4 className="font-semibold mb-2">Highlights</h4>
                                <ul className="space-y-2">
                                    {info.Highlights.map((highlight) => (
                                        <li key={highlight.id} className="flex items-start">
                                            <div className="space-y-2">
                                                <p className='flex items-center gap-2'>
                                                    <MdOutlineDateRange />
                                                    {highlight.date}</p>
                                                <p className='flex items-center gap-2'>
                                                    <MdAccessTime />
                                                    {highlight.time}</p>
                                                <p className='flex items-center gap-2'>
                                                    <MdAccessTime />
                                                    {highlight.Arrive}</p>
                                                <p className='flex items-center gap-2'>
                                                    <MdOutlineLocationOn />
                                                    {highlight.Venue}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Refund & cancellation policy */}
                            <div className="bg-[#34735F] text-white p-4 rounded-lg">
                                <h4 className="font-semibold mb-2">Refund & cancellation policy</h4>
                                <ul className="space-y-2">
                                    {info.Refund.map((refund) => (
                                        <li key={refund.id} className="flex items-start">
                                            <span className="mr-2">•</span>
                                            <span>{refund.title}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className='flex justify-end items-center'>
                                    <button className="text-white cursor-pointer mt-2 ">Learn more</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Hosted by */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Hosted by</h3>
                        {info["Hosted by"].map((host) => (
                            <div key={host.id} className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 bg-[#4E566B] py-6 md:py-[37px] px-4 md:px-[16px] rounded-lg">
                                <div className='w-[80px] h-[80px] md:w-[100px] md:h-[100px]'>
                                    <Image
                                        width={100}
                                        height={100}
                                        src={host.image}
                                        alt={host.name}
                                        className="w-full h-full rounded-full object-cover"
                                    />
                                </div>
                                <div className='space-y-1 text-center md:text-left'>
                                    <h4 className="font-medium text-[20px] md:text-[24px] text-white">{host.name}</h4>
                                    <p className="text-sm text-white">{host["activities hosted"]} activities hosted</p>
                                    <p className="text-sm text-white">{host["host rating"]} host rating</p>
                                </div>
                                <div className="flex flex-col md:flex-row gap-2 md:ml-auto md:space-x-2 w-full md:w-auto">
                                    <button 
                                        onClick={() => handleMessageClick(host)}
                                        className="w-full cursor-pointer md:w-auto px-[24px] py-[10px] border border-gray-300 bg-[#FDE8CD] hover:bg-[#fde8cdc8] transform duration-300 rounded-full text-[14px] md:text-[16px] font-[500]"
                                    >
                                        Message
                                    </button>
                                    <button 
                                        onClick={() => handleViewProfile(host)}
                                        className="w-full cursor-pointer md:w-auto px-[24px] py-[10px] border text-white border-[#FDE8CD] hover:bg-[#fde8cdc8] transform duration-300 hover:text-white rounded-full text-[14px] md:text-[16px] font-[500]"
                                    >
                                        View profile
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            <MessageModal 
                isOpen={isMessageModalOpen}
                onClose={() => setIsMessageModalOpen(false)}
                onSend={handleSendMessage}
                recipientName={selectedHost?.name || ''}
            />

            <ProfileModal
                isOpen={isProfileModalOpen}
                onClose={() => setIsProfileModalOpen(false)}
                hostData={selectedHost}
            />
        </div>
    );
} 