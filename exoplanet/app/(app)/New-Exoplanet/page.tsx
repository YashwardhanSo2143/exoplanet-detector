"use client";
import React, {useState} from "react";
import { useRouter } from "next/navigation";
import Bg from "../../components/bg/bg"
import File from "../../../public/file.png"
import Upload from "../../../public/upload.png"

export default function Page() {

    const [loading, setLoading] = useState(false)
    const [file, setFile] = useState<File | null>(null);
    const router = useRouter();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0])
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) {
            alert("No file selected");
            return;
        }
        
        const formData = new FormData();
        formData.append("file", file)
        const res = await fetch("http://127.0.0.1:8000/api/predict", {
            method:'POST',
            body: formData,
        });
        const data = await res.json();
        
        //save in local browser storage
        localStorage.setItem("latestPrediction", JSON.stringify(data));
        
        //Discovered Planet History save
        const history = JSON.parse(localStorage.getItem("Discovered-Planets") || "[]");
        history.push({filename: file.name, ...data});
        localStorage.setItem("Discorvered-Planets", JSON.stringify(history));
        router.push("/New-Exoplanet/predict");

    }
    
    return(
        <div>
            <Bg/>
            <main className="p-10 xl:px-60">
                <div className="text-center text-lg flex flex-col mb-4">
                    <h1 className="text-5xl"><span className="font-serif italic">W</span>hat's <span className="italic text-purple-500 font-serif">New</span></h1>
                    <div className="font-sans text-gray-400 py-8" >
                        <p>Let's find out together using our AI model that detects, whether the planet is habitable or not</p>
                        <p>Scientist are researching for decards to find = habitable zones where there will be possibilities of living orangansims</p>
                        <p>we work on that principal of detecting possibilities of life forms present in a planet</p>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="relative hover:-translate-y-2 group flex flex-col items-center justify-center w-full p-3 h-120 border-2 rounded-3xl backdrop-filter hover:backdrop-blur-xs overflow-hidden hover:border-purple-500 border-dashed transition-all duration-400">
                        <div className="absolute inset-0 bg-linear-to-b from-85% group-hover:transition-colors group-hover:duration-700 group-hover:to-purple-800"></div>
                        <img src={Upload.src} className="w-20 h-20 opacity-50 group-hover:opacity-100 transition-all duration-400 group-hover:scale-110"/>
                        <p className="group-hover:scale-110 text-xl text-gray-600 group-hover:text-white transition-all duration-500">Drag Drop .csv File</p>
                        <input
                        required
                        onChange={handleFileChange}
                        className=" absolute w-full h-full opacity-0 text-black cursor-pointer top-0 left-0"
                        type="file"
                        accept=".csv"></input>
                        {file && (
                            <div className="border-3 border-purple-700 p-3 mt-5 rounded-2xl">
                                <p className="flex items-center">
                                    <img src={File.src} className="w-10"/> 
                                    <span className="font-sans font-semibold">{file.name}</span>
                                </p>
                            </div>
                        )}
                    </div>
                    
                    <div className="flex items-center p-5 justify-center mt-5">
                        <button type="submit" className="bg-linear-to-r from-purple-500 to-purple-800 px-40 hover:-translate-y-1 hover:from-purple-600 hover:to-purple-950 hover:transition-all % p-4 rounded-4xl border-purple-800 border-3 cursor-pointer hover:duration-400 shadow-md hover:shadow-purple-950 transition-all duration-400">Analyse</button>
                    </div>
                    
                </form>
                <div className="flex flex-col justify-center w-full md:flex-row md:justify-evenly mt-10 md:scale-85 lg:scale-90 xl:scale-100">
                    <div className="flex z-10 backdrop-blur-lg hover:shadow-inner hover:rotate-z-0 hover:rotate-x-0 rotate-x-55 -rotate-z-45 overflow-hidden backdrop-filter hover:backdrop-blur-xs hover:shadow-white flex-col border-6 border-double w-60 rounded-3xl items-center justify-center cursor-pointer hover:scale-105 transition-all duration-500 group p-10">
                        <h1 className="text-3xl p-2 m-5 px-5 border-b-4 border-transparent font-serif bg-purple-500 group-hover:bg-purple-600 rounded-full transition-all duration-500">1</h1>
                        <div className="relative w-1/2 h-1 overflow-hidden rounded-full">
                            <div className="absolute left-1/2 -translate-x-1/2 h-full bg-purple-700 w-4 group-hover:w-full transition-all duration-500"></div>
                        </div>
                        <div className="relative">
                            <div className="absolute rotate-90 w-50 h-8 rounded-full bg-white translate-x-12 shadow-purple-300 group-hover:shadow-2xl transition-all duration-700"></div>
                            <div className="absolute -rotate-90 w-50 h-8 rounded-full bg-white -translate-x-62 shadow-purple-300 group-hover:shadow-2xl transition-all duration-700"></div>
                        </div>
                        <div className="text-center flex flex-col h-full w-full items-center justify-center">
                            <h1 className="text-xl p-5 group-hover:opacity-40 group-hover:scale-110 opacity-100 transition-all duration-500">Upload</h1>
                            <p className="text-lg  font-sans opacity-40 group-hover:opacity-100 transition-all duration-500">Select light curve CSV file</p>
                        </div>
                    </div>
                    <div className="flex z-20 backdrop-blur-lg hover:shadow-inner hover:rotate-z-0 hover:rotate-x-0 rotate-x-55 -rotate-z-45 overflow-hidden backdrop-filter hover:backdrop-blur-xs hover:shadow-white flex-col border-6 border-double w-60 rounded-3xl items-center justify-center cursor-pointer hover:scale-105 transition-all duration-500 group p-10">
                        <h1 className="text-3xl p-2 m-5 px-5 border-b-4 border-transparent font-serif bg-purple-500 group-hover:bg-purple-600 rounded-full transition-all duration-500">2</h1>
                        <div className="relative w-1/2 h-1 overflow-hidden rounded-full">
                            <div className="absolute left-1/2 -translate-x-1/2 h-full bg-purple-700 w-4 group-hover:w-full transition-all duration-500"></div>
                        </div>
                        <div className="relative">
                            <div className="absolute rotate-90 w-50 h-8 rounded-full bg-white translate-x-12 shadow-purple-300 group-hover:shadow-2xl transition-all duration-700"></div>
                            <div className="absolute -rotate-90 w-50 h-8 rounded-full bg-white -translate-x-62 shadow-purple-300 group-hover:shadow-2xl transition-all duration-700"></div>
                        </div>
                        <div className="text-center flex flex-col h-full w-full items-center justify-center">
                            <h1 className="text-xl p-5 group-hover:opacity-40 group-hover:scale-110 opacity-100 transition-all duration-500">Analyze</h1>
                            <p className="text-lg  font-sans opacity-40 group-hover:opacity-100 transition-all duration-500">AI model will process the data</p>
                        </div>
                    </div>
                    <div className="flex z-30 backdrop-blur-lg hover:shadow-inner hover:rotate-z-0 hover:rotate-x-0 rotate-x-55 -rotate-z-45 overflow-hidden backdrop-filter hover:backdrop-blur-xs hover:shadow-white flex-col border-6 border-double w-60 rounded-3xl items-center justify-center cursor-pointer hover:scale-105 transition-all duration-500 group p-10">
                        <h1 className="text-3xl p-2 m-5 px-5 border-b-4 border-transparent font-serif bg-purple-500 group-hover:bg-purple-600 rounded-full transition-all duration-500">3</h1>
                        <div className="relative w-1/2 h-1 overflow-hidden rounded-full">
                            <div className="absolute left-1/2 -translate-x-1/2 h-full bg-purple-700 w-4 group-hover:w-full transition-all duration-500"></div>
                        </div>
                        <div className="relative">
                            <div className="absolute rotate-90 w-50 h-8 rounded-full bg-white translate-x-12 shadow-purple-300 group-hover:shadow-2xl transition-all duration-700"></div>
                            <div className="absolute -rotate-90 w-50 h-8 rounded-full bg-white -translate-x-62 shadow-purple-300 group-hover:shadow-2xl transition-all duration-700"></div>
                        </div>
                        <div className="text-center flex flex-col h-full w-full items-center justify-center">
                            <h1 className="text-xl p-5 group-hover:opacity-40 group-hover:scale-110 opacity-100 transition-all duration-500">Results</h1>
                            <p className="text-lg font-sans opacity-40 group-hover:opacity-100 transition-all duration-500">View detection results</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}