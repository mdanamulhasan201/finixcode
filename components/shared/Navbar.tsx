"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "../ui/button"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Calendar as CalendarComponent } from "../ui/calendar"
import { format } from "date-fns"
import Image from "next/image"
import { FaRegCalendarMinus, FaUser } from "react-icons/fa"
import { HiMenuAlt3 } from "react-icons/hi"
import { IoSearchOutline } from "react-icons/io5"
import { IoMdMenu } from "react-icons/io"

export default function Navbar() {
    const [date, setDate] = useState<Date | undefined>(undefined)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    // const user = {
    //     name: "John Doe",
    //     email: "EMAIL",
    //     image: "IMAGE",
    // }

    return (
        <div className="bg-white">
            <div className="container py-4 px-4 sm::px-[40px] flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center">
                    <div>
                        <Image width={32} height={32} src="/image/logo/icon.png" alt="logo" />
                    </div>
                </Link>

                {/* Date and Search Section - Hidden on Mobile */}
                <div className="hidden lg:flex items-center gap-4">
                    {/* Date Selector */}
                    <Popover>
                        <PopoverTrigger asChild>
                            <div className="flex items-center gap-2 bg-gray-50 border-[#F6F6F6] border rounded-full pl-4 pr-1 py-2 shadow-sm cursor-pointer w-48 xl:w-64">
                                <span className="text-[14px] text-gray-500 font-[400]">{date ? format(date, "MMM dd, yyyy") : "Select date"}</span>
                                <div className="w-8 h-8 rounded-full bg-emerald-400 flex items-center justify-center text-white ml-auto">
                                    <FaRegCalendarMinus className="h-4 w-4 text-black" />
                                </div>
                            </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <CalendarComponent mode="single" selected={date} onSelect={setDate} initialFocus />
                        </PopoverContent>
                    </Popover>

                    {/* Search Bar */}
                    <div className="relative">
                        <div className="flex items-center bg-gray-50  border-[#F6F6F6] border rounded-full px-4 py-2 shadow-sm xl:w-64 h-12">
                            <input
                                type="text"
                                placeholder="Search"
                                className="flex-1 border-none bg-transparent shadow-none outline-none focus:outline-none focus:ring-0 focus:ring-offset-0 p-0 text-gray-700 placeholder-gray-400 text-[14px]  font-[400]"
                            />


                            <div className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-full bg-gray-200 ml-2">
                                <IoSearchOutline className="h-5 w-5 text-gray-700" />
                            </div>
                        </div>
                    </div>


                </div>

                {/* Right side navigation */}
                <div className="flex items-center gap-4">
                    {/* Leaderboard Link */}
                    <Link href="/" className="hidden md:flex items-center gap-2 bg-[#F4F5EF] rounded-full py-[14px] px-[16px]">
                        <div className="w-[13px] h-[18px]">
                            <Image width={100} height={100} src="/image/logo/SmallIcon.png" alt="logo" className="w-full h-full" />
                        </div>
                        <span className="text-[16px] font-[500] text-[#34735F]">Leaderboard</span>
                    </Link>
                    <Link href="/leaderboard" className="rounded-full hidden md:block cursor-pointer text-[16px] font-[500] border text-[#34735F] border-[#34735F] bg-white hover:bg-gray-50 px-[24px] py-[14px]">

                        <span > Login / Sign up</span>
                    </Link>

                    {/* User Menu Button with Dropdown */}
                    <div className="relative">
                        <div
                            className="hidden md:flex items-center  border rounded-full py-2 px-4 cursor-pointer"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <IoMdMenu className="h-5 w-5 text-[#4A4A4A] mr-3" />
                            <div className="w-8 h-8 rounded-full bg-[#4A4A4A] flex items-center justify-center text-white">
                                <FaUser className="h-5 w-5" />
                            </div>
                        </div>

                        {/* Dropdown Menu */}
                        {isMenuOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10 border">
                                <Link href="/" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                                    Profile
                                </Link>
                                <Link href="/" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                                    Settings
                                </Link>
                                <div className="border-t border-gray-100 my-1"></div>
                                <button
                                    onClick={() => {
                                        setIsMenuOpen(false)
                                    }}
                                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu - Hidden on desktop */}
                    <div className="lg:hidden flex items-center ">
                        <Sheet>
                            <SheetTrigger asChild>
                                <HiMenuAlt3 className="text-2xl" />
                            </SheetTrigger>
                            <SheetContent side="left" className="p-5">
                                {/* Logo */}
                                <div className="w-14 h-18 mb-6">
                                    <Image width={100} height={100} src="/image/logo/icon.png" alt="logo" className="w-full h-full" />
                                </div>

                                <div className="flex flex-col gap-4">
                                    {/* Navigation Links */}
                                    <Link href="/leaderboard" className="flex items-center gap-2 bg-[#F4F5EF] rounded-full py-[14px] px-[16px]">
                                        <div className="w-[13px] h-[18px]">
                                            <Image width={100} height={100} src="/image/logo/SmallIcon.png" alt="logo" className="w-full h-full" />
                                        </div>
                                        <span className="text-[16px] font-[500] text-[#34735F]">Leaderboard</span>
                                    </Link>

                                    <Link href="/" className="block px-4 py-3 text-gray-800 hover:bg-gray-100 rounded-lg">
                                        Profile
                                    </Link>
                                    <Link href="/" className="block px-4 py-3 text-gray-800 hover:bg-gray-100 rounded-lg">
                                        Settings
                                    </Link>


                                    <div className="mt-auto pt-4">
                                        <Button className="w-full rounded-full py-[14px]">
                                            Login / Sign up
                                        </Button>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </div>
    )
}
