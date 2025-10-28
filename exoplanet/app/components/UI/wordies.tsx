"use client"
import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight, MoveLeft } from "lucide-react";

export default function Wordies() {
    const [titleNumber, setTiitleNumber] = useState(0);
    const words = useMemo(() => ["ExoPlanets", "Gases", "Blackholes", "Theories", "WormHoles",  "Orangnisms", "Elements", "Solar Glares", "Stars", "Moons", "Astroids", "Wonders","Mysteries"], [])
    
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (titleNumber === words.length -1) {
                setTiitleNumber(0);
            } else {
                setTiitleNumber(titleNumber + 1);
            }
        }, 4000)
        return () => clearTimeout(timeout);
    }, [titleNumber, words])
    
    return (
        <div className="w-full flex flex-col items-center justify-center">
            <div className="flex flex-col items-center text-center">
                <h1 className="font-regular text-6xl max-w-2xl text-center tracking-tighter">
                    <span className="text-spektr-cyan-50">Universe is Full Off</span>
                    <span className="relative flex w-full font-sans justify-center md:pb-4 md:pt-3 overflow-hidden">
                        &nbsp;
                        {words.map((word, index) => (
                            <motion.span
                    key={index}
                    className="absolute font-serif fnot-extralight text-purple-500"
                    initial={{ opacity: 0, y: "-100" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            y: titleNumber > index ? -150 : 150,
                            opacity: 0,
                          }
                    }
                  >
                    {word}
                  </motion.span>
                        ))}
                    </span>
                </h1>
                <p className="text-center text-gray-500 w-90 pt-6">We search and analyze habitatble zone in exoplanets that are spread across the endless Universe</p>
            </div>
        </div>
    )}