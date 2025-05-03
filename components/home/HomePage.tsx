"use client"
import React, { useEffect, useState } from 'react'
import Banner from '../reuseable/banner'
import data from '../../public/data/data.json'
import { AllEventData, BannerData } from '@/types'
import { formatEventTime } from '@/utils/dateFormat'
import { IoShareOutline } from "react-icons/io5"
import { FaRegHeart } from "react-icons/fa"
import JoinEventDropdown from '../reuseable/JoinEventDropdown'
import MoreOptionsDropdown from '../reuseable/MoreOptionsDropdown'
import InfoPage from './InfoPage'
import PlayerPage from './PlayerPage'
import CommentsPage from './CommentsPage'
import EventCarousel from '../reuseable/EventCarousel'

export default function HomePage() {
    const [eventData, setEventData] = useState<AllEventData>({
        currentEvent: null,
        allImages: {
            bannerImages: [],
            rightImages: []
        },
        allEvents: []
    });
    const [activeTab, setActiveTab] = useState<'Info' | 'Player' | 'Comments'>('Info');

    useEffect(() => {
        try {
            if (data && data.length > 0) {
                const firstItem = data[0];

                // Filter and validate all images
                const bannerImages = firstItem.bannerImage
                    .map(item => item.image)
                    .filter(img => img && img.trim() !== "");

                const rightImages = firstItem.rightImage
                    .map(item => item.image)
                    .filter(img => img && img.trim() !== "");

                // Store all data in state
                setEventData({
                    currentEvent: {
                        ...firstItem,
                        spotsLeft: firstItem.spotsLeft
                    } as BannerData,
                    allImages: {
                        bannerImages,
                        rightImages
                    },
                    allEvents: data.map(item => ({
                        ...item,
                        spotsLeft: item.spotsLeft
                    })) as BannerData[]
                });
            }
        } catch (error) {
            console.error('Error processing data:', error);
        }
    }, []);

    useEffect(() => {
        console.log('All events:', eventData.allEvents);
        console.log('Current event:', eventData.currentEvent);
        console.log('Filtered events:', eventData.allEvents.filter(event => event.id !== eventData.currentEvent?.id));
    }, [eventData]);

    const handleEventSelect = (selectedEvent: BannerData) => {
        const bannerImages = selectedEvent.bannerImage
            .map(item => item.image)
            .filter(img => img && img.trim() !== "");

        const rightImages = selectedEvent.rightImage
            .map(item => item.image)
            .filter(img => img && img.trim() !== "");

        setEventData(prev => ({
            ...prev,
            currentEvent: selectedEvent,
            allImages: {
                bannerImages,
                rightImages
            }
        }));
        
        // Reset to Info tab when switching events
        setActiveTab('Info');
        
        // Scroll to top of the page
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleJoinEvent = () => {
        console.log('Joining event...');
    };

    // Only render if we have valid data and images
    if (!eventData.currentEvent ||
        !eventData.allImages.bannerImages.length ||
        !eventData.allImages.rightImages.length) {
        return null;
    }

    const renderTabContent = () => {
        if (!eventData.currentEvent) return null;
        
        switch (activeTab) {
            case 'Info':
                return <InfoPage currentEvent={eventData.currentEvent} />;
            case 'Player':
                return <PlayerPage currentEvent={eventData.currentEvent} />;
            case 'Comments':
                return <CommentsPage />;
            default:
                return null;
        }
    };

    return (
        <div className="w-full">
            <Banner
                sliderImages={eventData.allImages.bannerImages}
                rightImages={eventData.allImages.rightImages}
            />

            {/* title section --- top  */}
            <div className="container px-4 sm:px-[40px] py-6">
                <div className='flex flex-col lg:flex-row justify-between items-start w-full'>
                    {/* left side */}
                    <div className='w-full lg:w-7/12'>
                        <div className='flex flex-col gap-1'>
                            <div className='flex items-center justify-between gap-2'>
                                <h2 className="text-2xl font-semibold text-gray-800">
                                    {eventData.currentEvent?.title}
                                </h2>
                                <div className='flex items-center gap-2'>
                                    <button className='w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50'>
                                        <IoShareOutline className="w-5 h-5 text-gray-700" />
                                    </button>
                                    <button className='w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50'>
                                        <FaRegHeart className="w-5 h-5 text-gray-700" />
                                    </button>
                                    <MoreOptionsDropdown />
                                </div>
                            </div>
                            <p className="text-gray-600">
                                {eventData.currentEvent?.location}
                            </p>
                            <p className="text-gray-600">
                                {eventData.currentEvent?.time && formatEventTime(eventData.currentEvent.time)}
                            </p>
                        </div>
                    </div>
                    {/* right side */}
                    <div className='w-full lg:w-4/12 mt-2 lg:mt-0'>
                        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 md:min-w-[400px]">
                            <div className="flex justify-between items-center mb-3 border py-[18px] px-4 border-[#E5E5E5] p-2 rounded-[16px]">
                                <span className="text-red-500 text-[16px] font-[500]">
                                    {eventData.currentEvent?.spotsLeft} spots left
                                </span>
                                <span className="text-[#171717] text-[18px] font-[700]">
                                    {eventData.currentEvent?.eventPrice}k /player 
                                    <span className='text-[#808080] text-[14px] font-[400]'> (Both)</span>
                                </span>
                            </div>

                            <JoinEventDropdown
                                onJoin={handleJoinEvent}
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* tab section */}
            <div className="container w-full px-4 sm:px-[40px] py-6">
                <div className='flex flex-col gap-4 w-full md:w-7/12'>
                    {/* Tab Navigation */}
                    <div className="border-b border-gray-200">
                        <div className="flex -mb-px">
                            <button 
                                onClick={() => setActiveTab('Info')}
                                className={`py-2 px-4 cursor-pointer text-center border-b-2 font-medium text-sm ${
                                    activeTab === 'Info' 
                                    ? 'border-[#DA6049] text-black' 
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                Info
                            </button>
                            <button 
                                onClick={() => setActiveTab('Player')}
                                className={`py-2 px-4 cursor-pointer text-center border-b-2 font-medium text-sm ${
                                    activeTab === 'Player' 
                                    ? 'border-[#DA6049] text-black' 
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                Player
                            </button>
                            <button 
                                onClick={() => setActiveTab('Comments')}
                                className={`py-2 px-4 cursor-pointer text-center border-b-2 font-medium text-sm ${
                                    activeTab === 'Comments' 
                                    ? 'border-[#DA6049] text-black' 
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                Comments
                            </button>
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="mt-4">
                        {renderTabContent()}
                    </div>
                </div>
            </div>

            {/* Event Carousel */}
            <EventCarousel 
                events={eventData.allEvents} 
                onEventSelect={handleEventSelect}
            />
        </div>
    )
}
