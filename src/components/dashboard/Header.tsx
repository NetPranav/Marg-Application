"use client";

import { motion } from "framer-motion";
import Logo from "@/components/brand/Logo";

interface HeaderProps {
  statusText?: string;
  statusColorClass?: string;
}

export default function Header({ 
  statusText = "Signal Active", 
  statusColorClass = "bg-brand-cyan" 
}: HeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex items-center justify-between px-6 py-5 sticky top-0 z-50 bg-brand-bg/80 backdrop-blur-md"
    >
      <Logo className="text-brand-orange" />

      <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm border border-black/5">
        <div className={`w-2 h-2 rounded-full ${statusColorClass} relative`}>
          <div className={`absolute inset-0 ${statusColorClass} rounded-full animate-ping opacity-75`} />
        </div>
        <span className="text-xs font-medium text-brand-text/70">{statusText}</span>
      </div>

      <div className="relative w-10 h-10 rounded-full overflow-hidden shadow-md border-2 border-white">
        {/* Placeholder avatar. In production, this would be the actual driver photo. */}
        <div className="w-full h-full bg-brand-text flex items-center justify-center text-white text-sm font-semibold">
          AV
        </div>
      </div>
    </motion.header>
  );
}
