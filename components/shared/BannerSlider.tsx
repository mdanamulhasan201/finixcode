"use client"
import React from 'react';
import Banner from '../reuseable/banner';

export default function BannerSlider() {
    const sliderImages = [
        "/image/banner/imageSlider1.png",
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

    return <Banner sliderImages={sliderImages} rightImages={rightImages} />;
}
