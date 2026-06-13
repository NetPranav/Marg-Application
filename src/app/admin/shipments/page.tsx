'use client';

import { useState } from 'react';
import { Box, MapPin, Weight, DollarSign, CheckCircle2, ChevronRight, Truck, UserCircle2, X } from 'lucide-react';

const mockTieUpLoads = [
  { id: 'LD-1042', origin: 'Pune Factory Hub', destination: 'Mumbai Port', weight: '24,000 kg', material: 'Automotive Parts', payout: '₹14,500', eta: '4h 30m', priority: 'HIGH' },
  { id: 'LD-1043', origin: 'Delhi DC', destination: 'Noida Hub', weight: '12,500 kg', material: 'Electronics', payout: '₹8,200', eta: '1h 45m', priority: 'MEDIUM' },
];

const mockOpenMarket = [
  { id: 'MKT-992', origin: 'Ahmedabad', destination: 'Surat', weight: '18,000 kg', material: 'Textiles', payout: '₹11,000', eta: '3h 15m', priority: 'LOW' },
];

const mockDriverRecs = [
  { id: 1, name: 'Suresh Patil', rating: 4.9, distance: '12 km away', truck: 'MH-12-AB-1234', type: 'Heavy Container' },
  { id: 2, name: 'Amit Singh', rating: 4.8, distance: '15 km away', truck: 'MH-14-XY-9876', type: 'Flatbed' },
  { id: 3, name: 'Rajesh Kumar', rating: 4.7, distance: '18 km away', truck: 'MH-09-CD-5555', type: 'Heavy Container' },
];

export default function ShipmentsPage() {
  const [activeTab, setActiveTab] = useState<'TIE_UP' | 'OPEN_MARKET'>('TIE_UP');
  const [assignmentModal, setAssignmentModal] = useState<{ isOpen: boolean; load: any | null }>({ isOpen: false, load: null });
  const [selectedDriver, setSelectedDriver] = useState<number | null>(null);

  const displayLoads = activeTab === 'TIE_UP' ? mockTieUpLoads : mockOpenMarket;

  const handleAccept = (load: any) => {
    setAssignmentModal({ isOpen: true, load });
    setSelectedDriver(null);
  };

  const handleDispatch = () => {
    alert(`Successfully dispatched ${assignmentModal.load?.id} to selected driver!`);
    setAssignmentModal({ isOpen: false, load: null });
  };

  return (
    <div className="w-full relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-brand-text tracking-tight mb-2">Shipment Marketplace</h1>
          <p className="text-brand-muted font-medium">Accept and dispatch loads from your tied-up factories or the open market.</p>
        </div>
      </div>

      {/* Toggle Tabs */}
      <div className="flex gap-2 mb-8 bg-black/5 p-1.5 rounded-[1.2rem] w-fit">
        <button 
          onClick={() => setActiveTab('TIE_UP')}
          className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${activeTab === 'TIE_UP' ? 'bg-white text-brand-text shadow-sm' : 'text-brand-muted hover:text-brand-text'}`}
        >
          Tie-Up Factory Requests
        </button>
        <button 
          onClick={() => setActiveTab('OPEN_MARKET')}
          className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${activeTab === 'OPEN_MARKET' ? 'bg-white text-brand-text shadow-sm' : 'text-brand-muted hover:text-brand-text'}`}
        >
          Open Market Bids
        </button>
      </div>

      {/* Load Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        {displayLoads.map(load => (
          <div key={load.id} className="bg-brand-surface border border-black/[0.03] rounded-[2rem] p-6 shadow-soft flex flex-col relative group hover:border-brand-orange/30 transition-colors">
            {load.priority === 'HIGH' && (
              <div className="absolute top-0 right-8 bg-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-b-lg">
                HIGH PRIORITY
              </div>
            )}
            
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-brand-orange font-bold text-sm mb-1 block">{load.id}</span>
                <h3 className="text-xl font-bold text-brand-text">{load.material}</h3>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600 mb-1">{load.payout}</div>
                <div className="text-[10px] text-brand-muted font-bold uppercase tracking-wider">Estimated Payout</div>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-6 relative">
              <div className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-black/[0.05]" />
              <div className="flex-1 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-orange/10 flex items-center justify-center shrink-0 z-10">
                    <MapPin className="w-4 h-4 text-brand-orange" />
                  </div>
                  <div>
                    <div className="text-[10px] text-brand-muted font-bold uppercase tracking-wider">Origin</div>
                    <div className="font-semibold text-brand-text">{load.origin}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 z-10">
                    <MapPin className="w-4 h-4 text-blue-500" />
                  </div>
                  <div>
                    <div className="text-[10px] text-brand-muted font-bold uppercase tracking-wider">Destination</div>
                    <div className="font-semibold text-brand-text">{load.destination}</div>
                  </div>
                </div>
              </div>

              <div className="w-1/3 bg-brand-bg/50 rounded-2xl p-4 flex flex-col gap-3">
                <div>
                  <div className="text-[10px] text-brand-muted font-bold uppercase tracking-wider mb-0.5">Total Weight</div>
                  <div className="font-bold text-sm text-brand-text">{load.weight}</div>
                </div>
                <div>
                  <div className="text-[10px] text-brand-muted font-bold uppercase tracking-wider mb-0.5">Est. Transit Time</div>
                  <div className="font-bold text-sm text-brand-text">{load.eta}</div>
                </div>
              </div>
            </div>

            <div className="mt-auto flex gap-3 pt-4 border-t border-black/[0.03]">
              <button 
                onClick={() => handleAccept(load)}
                className="flex-1 bg-brand-text text-white py-3 rounded-xl font-bold hover:bg-brand-orange transition-colors flex items-center justify-center gap-2"
              >
                Accept Shipment <ChevronRight className="w-4 h-4" />
              </button>
              <button className="px-6 py-3 rounded-xl font-bold text-brand-muted hover:bg-black/5 transition-colors border border-black/5">
                Review Contract
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Intelligent Assignment Center (Modal) */}
      {assignmentModal.isOpen && assignmentModal.load && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-brand-surface w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 md:p-8 bg-brand-text text-white relative">
              <button 
                onClick={() => setAssignmentModal({ isOpen: false, load: null })}
                className="absolute top-6 right-6 w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-3 mb-2">
                <Box className="w-6 h-6 text-brand-orange" />
                <h2 className="text-2xl font-bold tracking-tight">Intelligent Assignment Center</h2>
              </div>
              <p className="text-white/60 font-medium">System Recommendations for Load {assignmentModal.load.id}</p>
              
              <div className="mt-6 bg-white/10 rounded-2xl p-4 flex justify-between items-center">
                <div>
                  <div className="text-[10px] text-white/60 font-bold uppercase tracking-wider mb-1">Route</div>
                  <div className="font-bold">{assignmentModal.load.origin} → {assignmentModal.load.destination}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-white/60 font-bold uppercase tracking-wider mb-1">Weight</div>
                  <div className="font-bold text-brand-orange">{assignmentModal.load.weight}</div>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8 overflow-y-auto bg-brand-bg/30">
              <h3 className="font-bold text-brand-text mb-4">Top 5 Available Drivers (AI Matched)</h3>
              <div className="space-y-3">
                {mockDriverRecs.map((driver, idx) => {
                  const isSelected = selectedDriver === driver.id;
                  return (
                    <div 
                      key={driver.id} 
                      onClick={() => setSelectedDriver(driver.id)}
                      className={`cursor-pointer border-2 rounded-2xl p-4 flex items-center gap-4 transition-all ${isSelected ? 'border-brand-orange bg-brand-orange/5' : 'border-transparent bg-white hover:border-black/10 shadow-sm'}`}
                    >
                      <div className="w-12 h-12 rounded-full bg-brand-bg flex items-center justify-center text-brand-muted shrink-0">
                        <UserCircle2 className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-brand-text">{driver.name}</h4>
                          <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">{driver.rating} ★</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs font-medium text-brand-muted">
                          <span className="flex items-center gap-1"><Truck className="w-3 h-3" /> {driver.truck} ({driver.type})</span>
                          <span>•</span>
                          <span className="text-brand-orange">{driver.distance}</span>
                        </div>
                      </div>
                      <div className="shrink-0">
                        {isSelected ? (
                          <CheckCircle2 className="w-6 h-6 text-brand-orange fill-brand-orange/20" />
                        ) : (
                          <div className="w-6 h-6 rounded-full border-2 border-black/10" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-6 border-t border-black/[0.03] bg-white flex justify-end gap-3">
              <button 
                onClick={() => setAssignmentModal({ isOpen: false, load: null })}
                className="px-6 py-3 rounded-xl font-bold text-brand-muted hover:bg-black/5 transition-colors"
              >
                Cancel
              </button>
              <button 
                disabled={!selectedDriver}
                onClick={handleDispatch}
                className="px-8 py-3 rounded-xl font-bold bg-[#C15B2B] text-white disabled:opacity-50 hover:bg-brand-orange transition-colors flex items-center gap-2 shadow-[0_8px_20px_rgba(193,91,43,0.25)]"
              >
                Dispatch Task <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
