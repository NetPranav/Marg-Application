"use client";

import { useState, useEffect } from "react";
import { Navigation, MapPin, Truck, Phone, MessageSquare, Eye, Clock, Package, User } from "lucide-react";
import api from "@/lib/api";

const STATUS_COLORS: Record<string, string> = {
  IN_TRANSIT: "bg-blue-100 text-blue-700",
  DISPATCHED: "bg-violet-100 text-violet-700",
  DELIVERED: "bg-emerald-100 text-emerald-700",
  DELAYED: "bg-red-100 text-red-600",
  PENDING: "bg-gray-100 text-gray-600",
  APPROVED: "bg-amber-100 text-amber-700",
};

export default function ActiveShipmentsPage() {
  const [shipments, setShipments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");

  useEffect(() => { loadShipments(); }, []);

  const loadShipments = async () => {
    try {
      const res = await api.get("/shipments/");
      const list = Array.isArray(res.data) ? res.data : res.data.results || [];
      setShipments(list.filter((s: any) => ["IN_TRANSIT", "DISPATCHED", "APPROVED"].includes(s.status)));
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-[60vh]"><div className="w-8 h-8 border-3 border-brand-orange/30 border-t-brand-orange rounded-full animate-spin" /></div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-brand-text">Active Shipments</h1>
        <p className="text-sm text-brand-muted mt-1">{shipments.length} shipments currently active</p>
      </div>

      {shipments.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 text-center text-brand-muted text-sm border border-black/[0.04]">
          <Navigation size={40} className="mx-auto mb-3 opacity-30" />
          <p className="font-medium text-brand-text mb-1">No Active Shipments</p>
          <p>Shipments will appear here once they are dispatched.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {shipments.map((s) => (
            <div key={s.id} className="bg-white rounded-2xl p-5 border border-black/[0.04] hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-brand-text text-lg">#{s.tracking_number || s.id}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${STATUS_COLORS[s.status] || "bg-gray-100 text-gray-600"}`}>
                      {s.status?.replace(/_/g, " ")}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors" title="Call Driver"><Phone size={15} /></button>
                  <button className="p-2 bg-violet-50 text-violet-600 rounded-xl hover:bg-violet-100 transition-colors" title="Message"><MessageSquare size={15} /></button>
                  <button className="p-2 bg-black/[0.03] text-brand-muted rounded-xl hover:bg-black/[0.06] transition-colors" title="View Details"><Eye size={15} /></button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center"><MapPin size={14} /></div>
                  <div>
                    <p className="text-[10px] text-brand-muted uppercase">Origin</p>
                    <p className="text-sm font-medium text-brand-text truncate">{s.origin_name || s.factory_name || "Factory"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-red-50 text-red-500 rounded-lg flex items-center justify-center"><MapPin size={14} /></div>
                  <div>
                    <p className="text-[10px] text-brand-muted uppercase">Destination</p>
                    <p className="text-sm font-medium text-brand-text truncate">{s.destination_name || s.warehouse_name || "Warehouse"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center"><User size={14} /></div>
                  <div>
                    <p className="text-[10px] text-brand-muted uppercase">Driver</p>
                    <p className="text-sm font-medium text-brand-text">{s.driver_name || "Unassigned"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center"><Clock size={14} /></div>
                  <div>
                    <p className="text-[10px] text-brand-muted uppercase">ETA</p>
                    <p className="text-sm font-medium text-brand-text">{s.eta || "—"}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
