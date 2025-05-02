"use client"
import React, { useEffect, useState } from 'react'
import Banner from '../reuseable/banner'
import data from '../../public/data/data.json'
import { AllEventData, BannerData } from '@/types'
import { formatEventTime } from '@/utils/dateFormat'
import { IoShareOutline } from "react-icons/io5"
import { FaRegHeart } from "react-icons/fa"
import { HiOutlineDotsVertical } from "react-icons/hi"
import Button from '../reuseable/button'
// import TitleSection from './TitleSection'

export default function HomePage() {
    const [eventData, setEventData] = useState<AllEventData>({
        currentEvent: null,
        allImages: {
            bannerImages: [],
            rightImages: []
        },
        allEvents: []
    });

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

    // Only render if we have valid data and images
    if (!eventData.currentEvent ||
        !eventData.allImages.bannerImages.length ||
        !eventData.allImages.rightImages.length) {
        return null;
    }

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
                        <div className='flex flex-col gap-1 '>
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
                                    <button className='w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50'>
                                        <HiOutlineDotsVertical className="w-5 h-5 text-gray-700" />
                                    </button>
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
                    <div className='w-full lg:w-4/12'>
                        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 min-w-[400px]">
                            <div className="flex justify-between items-center mb-3 border py-[18px] px-4 border-[#E5E5E5] p-2 rounded-[16px]">
                                <span className="text-red-500 text-sm font-medium">
                                    {eventData.currentEvent?.spotsLeft} spots left
                                </span>
                                <span className="text-gray-900 font-semibold">
                                    {eventData.currentEvent?.eventPrice}k /player <span className='text-gray-500 text-sm font-normal'> (Both)</span>
                                </span>
                            </div>
                            <Button text="Join event" className="w-full bg-emerald-400 hover:bg-emerald-500 text-white font-medium py-2 px-4 rounded-full transition-colors" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
