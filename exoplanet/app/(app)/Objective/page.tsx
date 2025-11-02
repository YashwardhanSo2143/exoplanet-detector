import React from "react";
import Bg from "../../components/bg/bg";
import Mars from "../../../public/mars.jpg";
import Earth from "../../../public/earth.png";

export default function Page() {
  return (
    <div className="mx-6 md:mx-20 xl:mx-32 text-gray-100">
      <Bg />

      {/* Title */}
      <h1 className="text-center text-4xl sm:text-5xl lg:text-6xl my-10 font-serif italic underline decoration-2 decoration-purple-600 underline-offset-8">
        Our <span className="text-purple-500">O</span>bjective
      </h1>

      {/* SECTION 1 */}
      <div className="flex flex-col my-20 gap-16">
        <div className="flex flex-col-reverse md:grid md:grid-cols-2 items-center gap-10">
          <div className="relative group border-4 border-double border-transparent hover:border-sky-700 rounded-3xl overflow-hidden transition-all duration-700">
            <img
              src={Earth.src}
              alt="Earth"
              className="w-full rounded-3xl transition-all duration-1000 group-hover:scale-110"
            />
            <p className="hidden xl:block absolute bg-transparent w-200 h-95 rounded-b-full shadow-2xl shadow-blue-500 -z-10 rotate-180 -translate-x-20 -translate-y-50"></p>
          </div>

          <div className="flex flex-col gap-6 text-center md:text-left">
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl">
              Understanding Our Place in the{" "}
              <span className="text-purple-400 italic">Universe</span>
            </h1>
            <p className="font-sans text-base sm:text-lg leading-relaxed text-gray-300">
              Our objective is to harness the power of artificial intelligence
              to accelerate the search for habitable worlds beyond our solar
              system. Using advanced machine learning algorithms trained on
              NASA's Kepler mission data, we analyze stellar light curves to
              detect the subtle signatures of exoplanets as they transit across
              distant stars. By democratizing exoplanet detection technology, we
              empower researchers and enthusiasts alike to explore one of
              humanity’s greatest questions: Are we alone?
            </p>
          </div>
        </div>

        {/* SECTION 2 */}
        <div className="flex flex-col md:grid md:grid-cols-2 items-center gap-10">
          <div className="flex flex-col gap-6 text-center md:text-left order-2 md:order-1">
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl">
              Bridging the Gap Between Discovery of the{" "}
              <span className="text-purple-400 italic">Universe</span>
            </h1>
            <p className="font-sans text-base sm:text-lg leading-relaxed text-gray-300">
              The transit method we employ has revolutionized exoplanet science,
              enabling the discovery of over 5,000 confirmed worlds orbiting
              distant stars. Our AI-powered detector measures the tiny dip in
              starlight that occurs when a planet passes in front of its host
              star, estimating the planet’s size and orbit with precision. With
              machine learning, we process vast datasets in seconds, guiding
              astronomers toward promising planetary candidates for deeper
              exploration.
            </p>
          </div>

          <div className="relative group border-4 border-double border-transparent hover:border-amber-800 rounded-3xl overflow-hidden transition-all duration-700 order-1 md:order-2">
            <img
              src={Mars.src}
              alt="Mars"
              className="w-full rounded-3xl transition-all duration-1000 group-hover:scale-110"
            />
            <p className="hidden xl:block absolute opacity-0 bg-white w-[700px] h-[550px] rounded-b-full shadow-2xl shadow-amber-600 -z-10 rotate-180 -translate-x-44 -translate-y-32"></p>
          </div>
        </div>
      </div>

      {/* SECTION 3 */}
      <div className="flex flex-col items-center mt-20 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif italic underline decoration-2 decoration-purple-700 underline-offset-8">
          Worlds Within Reach of Future{" "}
          <span className="text-purple-500">Exploration</span>
        </h1>
        <h2 className="tracking-wide text-base sm:text-lg lg:text-xl text-stone-300 mt-10 xl:px-28 font-sans leading-relaxed">
          Recent discoveries fuel our mission's urgency.{" "}
          <a
            href="https://science.nasa.gov/exoplanet-catalog/gj-251-c/"
            className="underline-offset-4 underline decoration-purple-600 text-purple-300"
          >
            GJ 251c
          </a>
          , a super-Earth just 18 light-years away, orbits within its star's
          habitable zone where liquid water could exist. At 40 light-years,
          <a
            href="https://science.nasa.gov/exoplanet-catalog/gliese-12-b/"
            className="underline-offset-4 underline decoration-purple-600 text-purple-300"
          >
            {" "}
            Gliese 12 b
          </a>
          , an Earth-sized world with a temperate surface, represents one of the
          closest potentially habitable planets. Even{" "}
          <a
            href="https://science.nasa.gov/exoplanet-catalog/k2-18-b/"
            className="underline-offset-4 underline decoration-purple-600 text-purple-300"
          >
            K2-18b
          </a>{" "}
          has shown possible biosignature gases. Each light curve we analyze
          brings us closer to answering humanity’s oldest question.
        </h2>
      </div>
    </div>
  );
}
