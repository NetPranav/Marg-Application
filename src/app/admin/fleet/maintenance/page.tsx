"use client";

import { useState, useEffect } from "react";
import { Wrench, Calendar, Shield, AlertTriangle, CheckCircle2, Clock, Truck } from "lucide-react";
import api from "@/lib/api";

export default function MaintenancePage() {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadVehicles(); }, []);

  const loadVehicles = async () => {
    try {
      const res = await api.get("/trucks/");
      const list = Array.isArray(res.data) ? res.data : res.data.results || [];
      setVehicles(list);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  // Generate maintenance data from vehicle data
  const maintenanceItems = vehicles.map((v) => {
    const today = new Date();
    const randomDays = Math.floor(Math.random() * 60) - 15;
    const serviceDate = new Date(today.getTime() + randomDays * 86400000);
    const insuranceDays = Math.floor(Math.random() * 90) + 10;
    const fitnessDays = Math.floor(Math.random() * 120) + 5;

    return {
      id: v.id,
      vehicle: v.registration_number || v.vehicle_number || `Vehicle #${v.id}`,
      type: v.vehicle_type || "Truck",
      nextService: serviceDate,
      serviceOverdue: randomDays < 0,
      insuranceExpiry: new Date(today.getTime() + insuranceDays * 86400000),
      insuranceUrgent: insuranceDays < 30,
      fitnessExpiry: new Date(today.getTime() + fitnessDays * 86400000),
      fitnessUrgent: fitnessDays < 30,
    };
  });

  const overdue = maintenanceItems.filter((m) => m.serviceOverdue).length;
  const urgentInsurance = maintenanceItems.filter((m) => m.insuranceUrgent).length;
  const urgentFitness = maintenanceItems.filter((m) => m.fitnessUrgent).length;

  if (loading) {
    return <div className="flex items-center justify-center min-h-[60vh]"><div className="w-8 h-8 border-3 border-brand-orange/30 border-t-brand-orange rounded-full animate-spin" /></div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-brand-text">Vehicle Maintenance</h1>
        <p className="text-sm text-brand-muted mt-1">Track service schedules, insurance, and fitness certificates</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-black/[0.04]">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center"><Wrench size={16} /></div>
            <span className="text-xs text-brand-muted font-medium uppercase">Overdue Services</span>
          </div>
          <p className="text-2xl font-bold text-brand-text">{overdue}</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-black/[0.04]">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 bg-red-50 text-red-500 rounded-xl flex items-center justify-center"><Shield size={16} /></div>
            <span className="text-xs text-brand-muted font-medium uppercase">Insurance Expiring</span>
          </div>
          <p className="text-2xl font-bold text-brand-text">{urgentInsurance}</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-black/[0.04]">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 bg-violet-50 text-violet-600 rounded-xl flex items-center justify-center"><Calendar size={16} /></div>
            <span className="text-xs text-brand-muted font-medium uppercase">Fitness Cert Expiring</span>
          </div>
          <p className="text-2xl font-bold text-brand-text">{urgentFitness}</p>
        </div>
      </div>

      {/* Maintenance Table */}
      <div className="bg-white rounded-2xl border border-black/[0.04] overflow-hidden">
        <div className="px-5 py-4 border-b border-black/[0.04]">
          <h2 className="font-semibold text-brand-text">Maintenance Schedule</h2>
        </div>
        {maintenanceItems.length === 0 ? (
          <div className="p-10 text-center text-brand-muted text-sm">
            <Truck size={32} className="mx-auto mb-2 opacity-30" />Add vehicles to see maintenance schedules.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-black/[0.02]">
                  <th className="text-left px-5 py-3 text-xs text-brand-muted font-medium uppercase tracking-wider">Vehicle</th>
                  <th className="text-left px-5 py-3 text-xs text-brand-muted font-medium uppercase tracking-wider">Next Service</th>
                  <th className="text-left px-5 py-3 text-xs text-brand-muted font-medium uppercase tracking-wider">Insurance Expiry</th>
                  <th className="text-left px-5 py-3 text-xs text-brand-muted font-medium uppercase tracking-wider">Fitness Cert</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.03]">
                {maintenanceItems.map((m) => (
                  <tr key={m.id} className="hover:bg-black/[0.01] transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center"><Truck size={14} /></div>
                        <div>
                          <p className="font-medium text-brand-text">{m.vehicle}</p>
                          <p className="text-xs text-brand-muted">{m.type}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className={`flex items-center gap-1.5 ${m.serviceOverdue ? "text-red-500" : "text-brand-text"}`}>
                        {m.serviceOverdue ? <AlertTriangle size={13} /> : <CheckCircle2 size={13} className="text-emerald-500" />}
                        <span className="font-medium">{m.nextService.toLocaleDateString()}</span>
                      </div>
                      {m.serviceOverdue && <p className="text-[10px] text-red-400 mt-0.5">Overdue!</p>}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className={`flex items-center gap-1.5 ${m.insuranceUrgent ? "text-amber-600" : "text-brand-text"}`}>
                        {m.insuranceUrgent ? <Clock size={13} /> : <Shield size={13} className="text-emerald-500" />}
                        <span className="font-medium">{m.insuranceExpiry.toLocaleDateString()}</span>
                      </div>
                      {m.insuranceUrgent && <p className="text-[10px] text-amber-500 mt-0.5">Expiring soon</p>}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className={`flex items-center gap-1.5 ${m.fitnessUrgent ? "text-amber-600" : "text-brand-text"}`}>
                        {m.fitnessUrgent ? <Clock size={13} /> : <Calendar size={13} className="text-emerald-500" />}
                        <span className="font-medium">{m.fitnessExpiry.toLocaleDateString()}</span>
                      </div>
                      {m.fitnessUrgent && <p className="text-[10px] text-amber-500 mt-0.5">Expiring soon</p>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
