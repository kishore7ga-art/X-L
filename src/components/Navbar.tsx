"use client";

import XiteLogo from "./XiteLogo";
import { ArrowRight } from "lucide-react";

export default function Navbar() {
  const editorUrl = process.env.NEXT_PUBLIC_EDITOR_URL || "https://xite.co.in/editor/kishore7ga-college";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-3.5 px-4 sm:px-8 backdrop-blur-2xl bg-black/60 border-b border-white/[0.08] transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Brand Logo & Title */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="p-2 rounded-xl bg-white/[0.06] border border-white/[0.12] transition-all duration-300 group-hover:bg-white/[0.12] group-hover:scale-105">
            <XiteLogo className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-sm font-black tracking-widest text-white font-mono uppercase">
              XITE
            </span>
            <span className="text-[9px] font-mono text-neutral-400 tracking-wider uppercase hidden sm:inline">
              3D PLATFORM
            </span>
          </div>
        </a>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono text-neutral-300 font-bold uppercase tracking-wider">
          <a href="#architecture" className="hover:text-white transition-colors">
            Architecture
          </a>
          <a href="#features" className="hover:text-white transition-colors">
            Features
          </a>
          <a href="#ecosystem" className="hover:text-white transition-colors">
            Ecosystem
          </a>
          <a href="#governance" className="hover:text-white transition-colors">
            Governance
          </a>
        </nav>

        {/* Right: Enter Editor Action */}
        <a
          href={editorUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white font-bold text-xs tracking-wider uppercase transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_0_25px_rgba(99,102,241,0.6)] cursor-pointer"
        >
          <span>ENTER EDITOR</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </div>
    </header>
  );
}
