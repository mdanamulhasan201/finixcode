"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Calendar, Trophy, Menu, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import Image from "next/image"

export default function Navbar() {
    const [date, setDate] = useState<Date | undefined>(undefined)

    return (
        <div className="bg-white">
            <div className="container  py-4 border px-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center">
                    <div>
                        <Image width={32} height={32} src="/image/icon.png" alt="logo" />
                    </div>
                </Link>

                <div className="flex items-center gap-4">
                    {/* Date Selector */}
                    <Popover>
                        <PopoverTrigger asChild>
                            <div className="flex items-center gap-2 bg-gray-50 rounded-full pl-4 pr-1 py-2 shadow-sm cursor-pointer w-64">
                                <span className="text-sm text-gray-500">{date ? format(date, "MMM dd, yyyy") : "Select date"}</span>
                                <div className="w-8 h-8 rounded-full bg-emerald-400 flex items-center justify-center text-white ml-auto">
                                    <Calendar className="h-4 w-4 text-black" />
                                </div>
                            </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <CalendarComponent mode="single" selected={date} onSelect={setDate} initialFocus />
                        </PopoverContent>
                    </Popover>

                    {/* Search Bar */}
                    <div className="relative">
                        <div className="flex items-center bg-gray-50  rounded-full px-4 py-2 shadow-sm w-64 h-12">
                            <input
                                type="text"
                                placeholder="Search"
                                className="flex-1 border-none bg-transparent shadow-none outline-none focus:outline-none focus:ring-0 focus:ring-offset-0 p-0 text-gray-700 placeholder-gray-400"
                            />


                            <div className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-full bg-gray-200 ml-2">
                                <Search className="h-5 w-5 text-gray-700" />
                            </div>
                        </div>
                    </div>


                </div>

                {/* Right side navigation */}
                <div className="flex items-center gap-4">
                    {/* Leaderboard Link */}
                    <Link href="/leaderboard" className="flex items-center text-emerald-600">
                        <Trophy className="h-5 w-5 mr-2" />
                        <span className="text-sm font-medium">Leaderboard</span>
                    </Link>

                    <Button className="rounded-full border border-gray-300 bg-white text-gray-800 hover:bg-gray-50">
                        Login / Sign up
                    </Button>

                    <div className="flex items-center bg-gray-100 rounded-full p-2">
                        <Menu className="h-5 w-5 text-gray-600 mr-3" />
                        <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white">
                            <User className="h-5 w-5" />
                        </div>
                    </div>
                </div>

                {/* Mobile Menu - Hidden on desktop */}
                <div className="md:hidden flex items-center">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="ml-2">
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent>
                            <div className="flex flex-col gap-4 mt-6">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <div className="flex items-center gap-2 bg-gray-50 rounded-full pl-4 pr-1 py-1.5 shadow-sm cursor-pointer">
                                            <span className="text-sm text-gray-500">{date ? format(date, "MMM dd, yyyy") : "Select date"}</span>
                                            <div className="w-8 h-8 rounded-full bg-emerald-400 flex items-center justify-center text-white">
                                                <Calendar className="h-4 w-4" />
                                            </div>
                                        </div>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <CalendarComponent mode="single" selected={date} onSelect={setDate} initialFocus />
                                    </PopoverContent>
                                </Popover>
                                <Button className="w-full rounded-full">Login / Sign up</Button>
                            </div>
                        </SheetContent>
                    </Sheet>
                    <Button variant="ghost" size="icon" className="ml-2">
                        <User className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
