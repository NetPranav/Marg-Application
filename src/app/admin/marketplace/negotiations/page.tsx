"use client";

import { Handshake, MessageSquare, ArrowRight } from "lucide-react";

export default function NegotiationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-brand-text">Active Negotiations</h1>
        <p className="text-sm text-brand-muted mt-1">Manage ongoing negotiations with factories</p>
      </div>

      <div className="bg-white rounded-2xl p-10 text-center text-brand-muted text-sm border border-black/[0.04]">
        <Handshake size={40} className="mx-auto mb-3 opacity-30" />
        <p className="font-medium text-brand-text mb-1">No Active Negotiations</p>
        <p>When factories respond to your quotations with revision requests, negotiations will appear here.</p>
      </div>
    </div>
  );
}
