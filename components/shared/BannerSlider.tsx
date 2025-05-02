"use client"
import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';

export default function BannerSlider() {
    const [showModal, setShowModal] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const sliderImages = [
        "/image/banner/imageSlider1.png",
        "/image/banner/imageSlider1.png",
        "/image/banner/imageSlider1.png"
    ];

    const rightImages = [
        "/image/banner/image1.png",
        "/image/banner/image1.png",
        "/image/banner/image1.png",
        "/image/banner/image1.png",
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
    };

    const modalSettings = {
        ...settings,
        initialSlide: currentImageIndex,
        autoplay: false
    };

    return (
        <>
            <div className="relative container px-4 sm:px-[40px]">
                <div className='w-full flex flex-col lg:flex-row justify-between items-stretch gap-4 py-10'>
                    {/* left side  */}
                    <div className='w-full lg:w-7/12 h-[300px] sm:h-[400px] lg:h-[500px]'>
                        <Slider {...settings} className='rounded-xl h-full'>
                            {sliderImages.map((img, index) => (
                                <div key={index} className="relative h-[300px] sm:h-[400px] lg:h-[500px]">
                                    <Image
                                        width={1000}
                                        height={500}
                                        src={img}
                                        alt={`Slide ${index + 1}`}
                                        className="w-full h-full object-cover rounded-xl"
                                    />
                                </div>
                            ))}
                        </Slider>
                    </div>

                    {/* right side  */}
                    <div className='w-full lg:w-5/12 flex flex-col gap-4'>
                        <div className="relative w-full h-[145px] sm:h-[192px] lg:h-[242px] rounded-xl">
                            <Image
                                width={500}
                                height={242}
                                src={rightImages[0]}
                                alt="Right Banner 1"
                                className="w-full h-full object-cover rounded-xl"
                                priority
                            />
                        </div>
                        <div
                            className="relative w-full h-[145px] sm:h-[192px] lg:h-[242px] rounded-xl cursor-pointer"
                            onClick={() => {
                                setCurrentImageIndex(1);
                                setShowModal(true);
                            }}
                        >
                            <Image
                                width={500}
                                height={242}
                                src={rightImages[1]}
                                alt="Right Banner 2"
                                className="w-full h-full object-cover rounded-xl"
                                priority
                            />
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-xl">
                                <span className="text-white text-xl font-semibold">+{rightImages.length - 2} photos</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
                    <div className="absolute top-4 right-4 z-50">
                        <button
                            onClick={() => setShowModal(false)}
                            className="text-white text-4xl hover:text-gray-300 cursor-pointer"
                        >
                            ×
                        </button>
                    </div>
                    <div className="w-full max-w-4xl">
                        <Slider {...modalSettings}>
                            {rightImages.map((img, index) => (
                                <div key={index} className="relative h-[70vh]">
                                    <Image
                                        width={1000}
                                        height={500}
                                        src={img}
                                        alt={`Slide ${index + 1}`}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            )}
        </>
    );
}
