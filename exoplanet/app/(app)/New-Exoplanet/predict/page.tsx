"use client";
import { useEffect, useState } from "react";
import Bg from "../../../components/bg/bg"

interface PredictionResult {
  success: boolean;
  prediction: string;
  confidence: string;
  plot: string;
  color: string;
  features: number
  model: string;
  filename?: string;
  uploadTime?: string;
}

export default function PredictPage() {
  const [result, setResult] = useState<PredictionResult | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("latestPrediction");
    if (stored) {
      setResult(JSON.parse(stored));
    }
  }, []);

  if (!result) return (
    <div className="flex flex-col justify-center items-center min-h-screen text-gray-300">
      <h1 className="text-3xl font-bold mb-3">No prediction found</h1>
      <p className="text-lg">Please upload a CSV file to see results.</p>
    </div>
  );

  return (
    <div className="min-h-screen text-gray-200 p-8 flex flex-col items-center">
      <Bg/>
      <div className="border-3 backdrop-filter backdrop-blur-lg shadow-inner shadow-gray-300 border-purple-600 rounded-3xl p-8 w-full max-w-2xl mb-8 flex flex-col items-center">
        <h1 className="text-5xl font-light font-serif text-purple-400 text-center mb-4">
          {result.prediction}<span className="font-serif font-medium italic text-white"> Detected!</span>
        </h1>
        <p className="text-center text-green-400 text-lg font-sans font-extralight">
          Confidence: {result.confidence}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <div className="border-3 border-purple-600 group backdrop-filter backdrop-blur-xs hover:backdrop-blur-sm hover:scale-110 p-6 rounded-2xl z-20 shadow-md relative overflow-hidden shadow-gray-400 transition-all duration-300">
          <div className="w-40 h-15 shadow-2xl group-hover:shadow-purple-300 rotate-180 bg-white absolute translate-x-25 z-10 translate-y-80 group-hover:translate-y-78 transition-all duration-300"></div>
          <h2 className="font-semibold text-xl mb-4">Light Curve Visualization</h2>
          <img
            src={`data:image/png;base64,${result.plot}`}
            alt="Light Curve Plot"
            className="w-full rounded-lg shadow-lg"
          />
          <div className="flex gap-4 mt-6">
            <button className="backdrop-filter backdrop-blur-sm bg-purple-950 hover:bg-purple-500 cursor-pointer transition-all hover:duration-300 border-gray-900 border p-3 rounded-2xl">
              Download Plot
            </button>
            <button className="backdrop-filter backdrop-blur-sm hover:bg-purple-900 cursor-pointer transition-all hover:duration-300 border-gray-900 border-2 p-3 rounded-2xl">
              Export Report
            </button>
          </div>
        </div>
        
        <div className="border-3 border-purple-600 group backdrop-filter backdrop-blur-xs hover:backdrop-blur-sm hover:scale-110 p-6 rounded-2xl z-20 shadow-md relative overflow-hidden shadow-gray-400 transition-all duration-300">
          <div className="w-40 h-15 shadow-2xl group-hover:shadow-purple-300 rotate-180 bg-white absolute translate-x-25 z-10 translate-y-80 group-hover:translate-y-78 transition-all duration-300"></div>
          <h2 className="font-semibold text-xl">Analysis Details</h2>
          <div className="text-gray-400 text-md space-y-4">
            <div>
              <span className="font-bold">File name:</span> {result.filename || "Unknown"}
            </div>
            <div>
              <span className="font-bold">Upload time:</span> {result.uploadTime || "Unknown"}
            </div>
            <div>
              <span className="font-bold">Series length:</span> {result.features}
            </div>
            <div>
              <span className="font-bold">Model:</span> {result.model}
            </div>
            <div>
              <span className="font-bold">Features:</span> {result.features}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
