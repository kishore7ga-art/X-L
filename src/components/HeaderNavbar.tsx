"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function HeaderNavbar() {
  const editorUrl = process.env.NEXT_PUBLIC_EDITOR_URL || "https://x-f-sigma.vercel.app/editor/mec";

  return (
    <header className="fixed top-4 inset-x-0 z-50 mx-auto max-w-6xl px-4 pointer-events-auto">
      <nav className="flex items-center justify-between rounded-full border border-white/15 bg-black/80 px-6 py-3 shadow-2xl backdrop-blur-xl transition-all duration-300">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 border border-white/20">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-black tracking-tight text-white flex items-center gap-1.5">
            XITE
            <span className="rounded-full bg-blue-500/20 px-2 py-0.5 text-[9px] font-bold uppercase text-blue-400 border border-blue-500/30">
              3D Landing
            </span>
          </span>
        </div>

        <a
          href={editorUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white font-bold text-xs tracking-wide uppercase transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] cursor-pointer"
        >
          <span>Enter Into Editor</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </nav>
    </header>
  );
}
