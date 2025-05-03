import React, { useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';
import { BannerData } from '@/types';
import { formatEventTime } from '@/utils/dateFormat';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { TbAntennaBars5, TbAntennaBars3 } from 'react-icons/tb';
import { FaLocationDot } from 'react-icons/fa6';
import toast from 'react-hot-toast';


interface EventCarouselProps {
    events: BannerData[];
    onEventSelect: (event: BannerData) => void;
    favorites: { [key: number]: boolean };
    onFavoriteToggle: (eventId: number) => void;
}

const ImageCarousel = ({ images, title }: { images: { id: number; image: string }[]; title: string }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        appendDots: (dots: React.ReactNode) => (
            <div
                style={{
                    position: 'absolute',
                    bottom: '10px',
                    width: '100%',
                    padding: '0',
                    margin: '0',
                    listStyle: 'none',
                    textAlign: 'center',
                }}
            >
                <ul style={{ margin: '0' }}> {dots} </ul>
            </div>
        ),
        customPaging: () => (
            <div className="w-2 h-2 mx-1 rounded-full bg-white opacity-70" />
        )
    };

    return (
        <div className="relative h-[200px] rounded-t-lg overflow-hidden">
            <Slider {...settings}>
                {images.map((img) => (
                    <div key={img.id} className="relative h-[200px]">
                        <Image
                            src={img.image}
                            alt={`${title} - Image ${img.id}`}
                            fill
                            className="object-cover"
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default function EventCarousel({ events, onEventSelect, favorites, onFavoriteToggle }: EventCarouselProps) {
    const sliderRef = useRef<Slider>(null);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        rows: 1,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ],
        customPaging: () => (
            <div className={`w-2 h-2 mx-1 rounded-full transition-all duration-300 bg-gray-300`} />
        ),
        appendDots: (dots: React.ReactNode) => (
            <div
                style={{
                    position: 'absolute',
                    bottom: '-25px',
                    width: '100%',
                    padding: '10px 0',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '4px'
                }}
            >
                {dots}
            </div>
        )
    };

    const handleCardClick = (e: React.MouseEvent, event: BannerData) => {
        e.stopPropagation();
        onEventSelect(event);
    };

    const goToNext = () => {
        if (sliderRef.current) {
            sliderRef.current.slickNext();
        }
    };

    const goToPrev = () => {
        if (sliderRef.current) {
            sliderRef.current.slickPrev();
        }
    };

    return (
        <div className='bg-white'>
            <div className="container px-4 sm:px-[40px] py-6 ">
                <div className="mb-6 flex justify-between items-center">
                    <h2 className="text-2xl font-semibold">Other events you may like</h2>
                    <div className="flex gap-2">
                        <button
                            onClick={goToPrev}
                            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                            aria-label="Previous slide"
                        >
                            <IoIosArrowBack className="w-5 h-5 text-gray-700" />
                        </button>
                        <button
                            onClick={goToNext}
                            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                            aria-label="Next slide"
                        >
                            <IoIosArrowForward className="w-5 h-5 text-gray-700" />
                        </button>
                    </div>
                </div>
                <div className="slick-container">
                    <Slider ref={sliderRef} {...settings}>
                        {events.map((event, index) => (
                            <div key={`${event.id}-${index}`} className="px-2">
                                <div className="relative group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 ">
                                    {/* Image Carousel */}
                                    <div className="relative">
                                        <ImageCarousel images={event.bannerImage} title={event.title} />
                                        <button
                                            className="absolute top-4 right-4 z-10 w-8 h-8 bg-white rounded-full flex items-center justify-center transition-opacity"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                onFavoriteToggle(event.id);
                                                if (!favorites[event.id]) {
                                                    toast.success('Added to favorites!', {
                                                        duration: 2000,
                                                        position: 'top-right',
                                                        style: {
                                                            background: '#34735F',
                                                            color: '#fff',
                                                        },
                                                    });
                                                } else {
                                                    toast.success('Removed from favorites!', {
                                                        duration: 2000,
                                                        position: 'top-right',
                                                        style: {
                                                            background: '#DA6049',
                                                            color: '#fff',
                                                        },
                                                    });
                                                }
                                            }}
                                        >
                                            {favorites[event.id] ? (
                                                <FaHeart className="w-4 h-4 text-red-500" />
                                            ) : (
                                                <FaRegHeart className="w-4 h-4 text-gray-700" />
                                            )}
                                        </button>
                                    </div>

                                    <div className='p-3'>
                                        {/* Tags */}
                                        <div className="flex justify-between gap-2 mt-3">
                                            <div className='flex gap-2'>
                                                {event.Info[0].title.split(',').slice(0, 1).map((sport, idx) => (
                                                    <span key={idx} className="bg-blue-100 text-[#4A4A4A] px-3 py-1 rounded-full text-sm">
                                                        {sport.trim()}
                                                    </span>
                                                ))}
                                                <span className="bg-[#EFEDFF] text-[#4A4A4A] px-3 py-1 rounded-full text-sm">
                                                    {event.Info[0].age}
                                                </span>
                                            </div>
                                            <span className=" text-[#4A4A4A] px-3 py-1 rounded-full text-sm flex items-center gap-1">

                                                {event.Info[0].type === 'Advanced' ? (
                                                    <TbAntennaBars5 className="text-2xl text-green-500" />
                                                ) : (
                                                    <TbAntennaBars3 className="text-2xl text-green-500" />
                                                )}
                                                {event.Info[0].type}
                                            </span>
                                        </div>

                                        {/* Title and Details */}
                                        <h3
                                            className="text-lg font-semibold mt-2 cursor-pointer hover:text-[#DA6049] text-[#34735F] transition-colors"
                                            onClick={(e) => handleCardClick(e, event)}
                                        >
                                            {event.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm mt-2">
                                            {formatEventTime(event.time)}
                                        </p>                                    <div className='flex items-center gap-2 mt-2'>

                                            <FaLocationDot className='text-red-600 text-sm' />

                                            <p className="text-gray-600 text-sm">{event.location}</p>
                                        </div>


                                        {/* Price and Spots */}
                                        <div className="flex justify-between items-center mt-2">
                                            <span className="text-black text-sm">
                                                {`${event.Player.length}/${event.Player.length + event.spotsLeft} attending`}
                                            </span>
                                            <span className="text-gray-900 font-semibold">
                                                {event.eventPrice}/person
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
                <style jsx global>{`
                .slick-container {
                    margin: 0 -8px;  /* Compensate for padding */
                    padding-bottom: 40px; /* Make room for dots */
                }
                .slick-track {
                    display: flex !important;
                    float: none !important;
                }
                .slick-slide {
                    height: auto;
                    float: none;
                }
                .slick-slide > div {
                    height: 100%;
                }
                .slick-dots {
                    bottom: 0;
                }
                .slick-dots li {
                    margin: 0;
                }
                .slick-dots li button:before {
                    display: none;
                }
                /* Inner carousel dots styling */
                .slick-slider .slick-dots {
                    z-index: 1;
                }
                .slick-slider .slick-dots li {
                    margin: 0 2px;
                }
                .slick-slider .slick-dots li.slick-active div {
                    opacity: 1;
                    transform: scale(1.2);
                }
            `}</style>
            </div>
        </div>

    );
} 