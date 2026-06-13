"use client";

import { motion } from "framer-motion";
import { useRealtimeStore } from "@/store/realtimeStore";

export default function ETACard() {
  const activeShipments = useRealtimeStore((state) => state.activeShipments);
  
  // For a driver, there is typically only 1 active shipment assignment
  const currentShipment = activeShipments[0];

  const destination = currentShipment?.warehouse_name || "Bhiwandi Central Hub";
  const origin = currentShipment?.factory_name || "Pune Factory";
  
  // Mock telemetry data for ETA (we would calculate this from distance in production)
  const progressPercent = 70; 

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
      className="bg-white rounded-[2rem] p-6 shadow-soft mx-6 mb-4 relative overflow-hidden border border-black/[0.03]"
    >
      <div className="flex flex-col gap-6 relative z-10">
        
        {/* Destination Header */}
        <div className="text-[10px] font-bold tracking-widest text-brand-text/60 uppercase">
          Destination: {destination}
        </div>

        {/* ETA Section */}
        <div className="flex items-end justify-between">
          <div className="flex items-baseline gap-1 text-brand-text">
            <span className="text-[4.5rem] font-light leading-none tracking-tighter">02</span>
            <span className="text-xl font-medium mb-1">h</span>
            <span className="text-[4.5rem] font-light leading-none tracking-tighter ml-2">45</span>
            <span className="text-xl font-medium mb-1">m</span>
          </div>
          <div className="text-right text-brand-text/70 text-sm font-medium leading-tight mb-2">
            Estimated<br />Arrival
          </div>
        </div>

        {/* Progress Bar Container */}
        <div className="relative pt-2 pb-2">
          {/* Background Track */}
          <div className="w-full h-2.5 bg-brand-orange/20 rounded-full overflow-hidden">
            {/* Active Fill */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
              className="h-full bg-brand-orange rounded-full relative"
            />
          </div>
          {/* Slider Thumb Indicator */}
          <motion.div
            initial={{ left: 0 }}
            animate={{ left: `calc(${progressPercent}% - 6px)` }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
            className="absolute top-1/2 -translate-y-1/2 w-3.5 h-6 bg-white rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.15)] border border-brand-orange/10 z-10"
          />
        </div>

        {/* Footer Info */}
        <div className="flex justify-between items-center text-xs font-medium text-brand-text/60">
          <span>Origin: {origin}</span>
          <span>Distance: 184 km left</span>
        </div>
      </div>
    </motion.div>
  );
}
