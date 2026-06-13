"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { Crosshair, Navigation } from "lucide-react";
import { useRealtimeStore } from "@/store/realtimeStore";

// Fix for default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// India center
const centerPos: [number, number] = [18.9, 73.4]; 

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
        onClick={() => map.flyTo(centerPos, 8)}
        className="w-12 h-12 bg-brand-surface rounded-[1rem] flex items-center justify-center shadow-soft text-brand-text hover:bg-black/5 transition-colors border border-black/[0.03]"
      >
        <Crosshair size={20} />
      </button>
    </div>
  );
}

export default function AdminMapComponent() {
  const telemetryStream = useRealtimeStore((state) => state.telemetryStream);
  const activeShipments = useRealtimeStore((state) => state.activeShipments);

  // Initialize with seed data locations for fallback
  const [trucks, setTrucks] = useState<Record<string, {lat: number, lng: number, status: string}>>({
    "TRK-SEED": { lat: 18.5204, lng: 73.8567, status: "IN_TRANSIT" }
  });

  useEffect(() => {
    if (Object.keys(telemetryStream).length > 0) {
      setTrucks((prev) => {
        const next = { ...prev };
        Object.entries(telemetryStream).forEach(([id, data]) => {
          next[id] = { lat: data.latitude, lng: data.longitude, status: 'IN_TRANSIT' };
        });
        return next;
      });
    }
  }, [telemetryStream]);

  return (
    <div className="w-full h-full relative">
      <div className="absolute top-4 left-4 z-[400] bg-brand-surface px-4 py-2.5 rounded-[1rem] shadow-soft border border-black/[0.03] text-sm font-semibold flex items-center gap-2 text-brand-text">
        <Navigation className="text-brand-orange w-4 h-4" /> Live Fleet Tracking
      </div>

      <MapContainer
        center={centerPos}
        zoom={8}
        scrollWheelZoom={true}
        zoomControl={false}
        attributionControl={false}
        className="w-full h-full"
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png"
          opacity={0.8}
        />
        
        {/* Render Trucks */}
        {Object.entries(trucks).map(([id, pos]) => (
          <Marker 
            key={id} 
            position={[pos.lat, pos.lng]} 
            icon={createDotIcon(pos.status === 'IN_TRANSIT' ? "#FF7B47" : "#A39B98", 22)}
          >
            <Popup className="rounded-xl overflow-hidden shadow-soft border-none">
              <div className="p-1">
                <p className="font-bold text-brand-text mb-1">Truck {id}</p>
                <p className="text-xs text-brand-muted">{pos.lat.toFixed(4)}, {pos.lng.toFixed(4)}</p>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Highlight Factories/Warehouses (Hardcoded for demo based on seed data) */}
        <Marker position={[18.6270, 73.8340]} icon={createDotIcon("#211E1D", 16)}>
          <Popup>Pune Factory</Popup>
        </Marker>
        <Marker position={[19.2856, 73.0560]} icon={createDotIcon("#211E1D", 16)}>
          <Popup>Bhiwandi Hub</Popup>
        </Marker>

        <MapControls />
      </MapContainer>
    </div>
  );
}
