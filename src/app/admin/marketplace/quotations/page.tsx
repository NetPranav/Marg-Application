"use client";

import { FileText, Clock, CheckCircle2, XCircle, RefreshCw } from "lucide-react";

export default function QuotationsPage() {
  // Quotations would come from a dedicated backend endpoint
  const quotations: any[] = [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-brand-text">Quotations</h1>
        <p className="text-sm text-brand-muted mt-1">Track your submitted quotations and their status</p>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Pending", value: 0, icon: Clock, color: "bg-amber-50 text-amber-600" },
          { label: "Accepted", value: 0, icon: CheckCircle2, color: "bg-emerald-50 text-emerald-600" },
          { label: "Rejected", value: 0, icon: XCircle, color: "bg-red-50 text-red-500" },
          { label: "Revision Requested", value: 0, icon: RefreshCw, color: "bg-blue-50 text-blue-600" },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-white rounded-2xl p-4 border border-black/[0.04]">
              <div className={`w-8 h-8 ${s.color} rounded-lg flex items-center justify-center mb-2`}><Icon size={15} /></div>
              <p className="text-xl font-bold text-brand-text">{s.value}</p>
              <p className="text-xs text-brand-muted mt-0.5">{s.label}</p>
            </div>
          );
        })}
      </div>

      {/* Quotation List */}
      <div className="bg-white rounded-2xl p-10 text-center text-brand-muted text-sm border border-black/[0.04]">
        <FileText size={40} className="mx-auto mb-3 opacity-30" />
        <p className="font-medium text-brand-text mb-1">No Quotations Yet</p>
        <p>Submit quotes from the Available Requests page to see them here.</p>
      </div>
    </div>
  );
}
