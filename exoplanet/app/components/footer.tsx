"use client";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden mt-20 w-full backdrop-blur-lg  border-t border-white/20 shadow-inner shadow-gray-300 rounded-t-4xl">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left side — logo or name */}
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-semibold bg-linear-to-r from-purple-400 to-blue-300 bg-clip-text text-transparent">
            ExoTerestrial
          </h1>
        </div>

        {/* Middle — links */}
        <div className="flex text-cente gap-8 text-sm text-white/80 font-medium">
          <a href="/Objective" className="hover:text-purple-300 transition-all duration-300">
            Objective
          </a>
          <a href="/New-Exoplanet" className="hover:text-purple-300 transition-all duration-300">
            New Planet
          </a>
        
        </div>

        {/* Right side — credit */}
        <p className="text-sm text-white/50">
          © {new Date().getFullYear()} <span className="text-purple-300 font-medium">Yashwardhan Solanki</span>. All rights reserved.
        </p>
      </div>

      {/* Floating light glow effect */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-80 h-20 bg-purple-500/30 blur-3xl rounded-full opacity-60 pointer-events-none"></div>
    </footer>
  );
}
