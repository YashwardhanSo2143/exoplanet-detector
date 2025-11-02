"use client";

import React, { useEffect, useState } from "react";
import Bg from "../../components/bg/bg";

interface Planet {
  name: string;
  confidence: string;
  created_at: string;
}

export default function DiscoveredPlanetsPage() {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/predict/all");
        if (!res.ok) throw new Error("Failed to fetch planets");
        const data = await res.json();
        setPlanets(data);
      } catch (error) {
        console.error("Error fetching planets:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlanets();
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0014] text-white flex flex-col items-center py-10 px-6">
      <Bg />
      <h1 className="text-3xl md:text-4xl font-semibold mb-8 text-purple-400">
        🪐 Discovered Planets
      </h1>

      {loading ? (
        <div className="text-gray-400 text-lg">Loading planets...</div>
      ) : planets.length === 0 ? (
        <div className="text-gray-500 text-lg">No planets discovered yet.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {planets.map((planet, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-[#1A0928] shadow-md border border-purple-900 hover:border-purple-500 transition-all duration-300"
            >
              <h2 className="text-xl font-bold text-purple-300 mb-2">
                {planet.name}
              </h2>
              <p className="text-gray-300 mb-1">
                Confidence:{" "}
                <span className="text-purple-400 font-medium">
                  {planet.confidence}%
                </span>
              </p>
              <p className="text-gray-500 text-sm">
                Discovered on:{" "}
                {new Date(planet.created_at).toLocaleString(undefined, {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
