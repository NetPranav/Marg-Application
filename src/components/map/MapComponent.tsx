"use client";

import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Polyline, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import { Crosshair, Layers } from "lucide-react";
import { renderToString } from "react-dom/server";

// Fix for default marker icons in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const startPos: [number, number] = [41.8781, -87.6298]; // Chicago
const currentPos: [number, number] = [41.4, -86.8]; // En route
const endPos: [number, number] = [40.7128, -74.006]; // NYC/Warehouse

const routeCoordinates: [number, number][] = [
  startPos,
  [41.5, -87.0],
  currentPos,
  [41.1, -80.0],
  endPos,
];

// Custom marker styles
const createDotIcon = (color: string, size: number = 20) => {
  return L.divIcon({
    className: "custom-dot-icon",
    html: `<div style="width: ${size}px; height: ${size}px; background-color: ${color}; border: 4px solid white; border-radius: 50%; box-shadow: 0 4px 10px rgba(0,0,0,0.2);"></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
};

function MapControls() {
  const map = useMap();
  
  return (
    <div className="absolute bottom-4 right-4 z-[400] flex flex-col gap-2">
      <button 
        onClick={() => map.flyTo(currentPos, 7)}
        className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg text-brand-text hover:bg-gray-50 transition-colors"
      >
        <Crosshair size={22} />
      </button>
      <button 
        className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg text-brand-text hover:bg-gray-50 transition-colors"
      >
        <Layers size={22} />
      </button>
    </div>
  );
}

export default function MapComponent() {
  return (
    <div className="w-full h-full relative">
      {/* Label Overlay */}
      <div className="absolute top-4 left-4 z-[400] bg-white px-4 py-2 rounded-xl shadow-sm text-sm font-semibold flex items-center gap-2 text-brand-text">
        <span className="text-brand-orange text-lg">◬</span> I-90 West
      </div>

      <MapContainer
        center={currentPos}
        zoom={6}
        scrollWheelZoom={false}
        zoomControl={false}
        attributionControl={false}
        className="w-full h-full"
      >
        {/* Soft grayscale map style */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png"
          opacity={0.8}
        />
        
        {/* Route Line */}
        <Polyline 
          positions={routeCoordinates} 
          pathOptions={{ 
            color: "#FF7B47", 
            weight: 5, 
            dashArray: "15, 15",
            lineCap: "round",
            lineJoin: "round"
          }} 
        />

        {/* Start Point */}
        <Marker position={startPos} icon={createDotIcon("#FF7B47", 16)} />
        
        {/* Current Truck Location */}
        <Marker position={currentPos} icon={createDotIcon("#FF7B47", 24)} />
        
        {/* Destination */}
        <Marker position={endPos} icon={createDotIcon("#FF7B47", 16)} />

        <MapControls />
      </MapContainer>
    </div>
  );
}
