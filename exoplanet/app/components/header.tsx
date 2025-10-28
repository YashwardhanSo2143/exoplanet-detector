"use client"
import React, { useState } from "react";
import Link from "next/link";


export default function Header() {
    const menuOpen = useState(false)
    return(
        <div className="py-10 top-0 sticky backdrop-filter backdrop-blur-xl z-50 justify-center items-center flex shadow-inner shadow-gray-200 rounded-b-full">
            <header className="">
                <div className="z-10">
                    <ul className="flex gap-x-10 text-2xl font-sans">
                        <li className="hover:scale-110 relative bg-transparent transition-all duration-300 border-b-2 border-transparent hover:shadow-purple-800 hover:border-b-purple-400 group justify-center flex">
                            <div className="xl:block opacity-0 group-hover:opacity-90 hidden w-30 h-10 bg-white -translate-y-20 shadow-gray-200 shadow-2xl absolute rounded-full transition-all duration-800"></div>
                            <Link href="/dashboard" className="">
                            
                                <span className="font-serif italic group-hover:text-purple-400  group-hover:-translate-y-1 transition-colors duration-300">D</span>ashboard
                            </Link>
                        </li>                      
                        <li className="hover:scale-110 relative bg-transparent transition-all duration-300 border-b-2 border-transparent hover:shadow-purple-800 hover:border-b-purple-400 group justify-center flex">
                            <div className="xl:block opacity-0 group-hover:opacity-90 hidden w-30 h-10 bg-white -translate-y-20 shadow-gray-200 shadow-2xl absolute rounded-full transition-all duration-800"></div>
                            <Link href="/New-Exoplanet" className="">
                                <span className="font-serif italic">New</span> <span className="font-serif italic group-hover:text-purple-400 transition-colors duration-500">E</span>xoplanet
                            </Link>
                        </li>
                        <li className="hover:scale-110 relative bg-transparent transition-all duration-300 border-b-2 border-transparent hover:shadow-purple-800 hover:border-b-purple-400 group justify-center flex">
                            <div className="xl:block opacity-0 group-hover:opacity-90 hidden w-35 h-10 bg-white -translate-y-20 shadow-gray-200 shadow-2xl rounded-full absolute transition-all duration-800"></div>
                            <Link href="/Discovered-planets" className="">
                                <span className="font-serif italic">D</span>iscovered <span className="font-serif italic group-hover:text-purple-400 transition-colors duration-500">P</span>lanets
                            </Link>
                        </li>
                    </ul>
                </div>
            </header>
        </div>
    )
}