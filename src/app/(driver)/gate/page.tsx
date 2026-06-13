import Header from "@/components/dashboard/Header";
import GeofenceStatus from "@/components/gate/GeofenceStatus";
import QRCard from "@/components/qr/QRCard";
import PayloadPanel from "@/components/qr/PayloadPanel";
import DockAllocation from "@/components/gate/DockAllocation";
import LiveQueue from "@/components/gate/LiveQueue";
import BottomNav from "@/components/navigation/BottomNav";

export default function GatePage() {
  const qrPayload = JSON.stringify({
    manifestId: "MX-88241",
    vehicleMatch: "MH12AB4582",
    destination: "WH-BAY-14"
  });

  return (
    <main className="min-h-screen w-full max-w-md mx-auto bg-brand-bg relative overflow-hidden flex flex-col pt-2">
      <Header statusText="Gate Sync Active" statusColorClass="bg-brand-cyan" />
      
      <div className="flex-1 overflow-y-auto pb-32 no-scrollbar pt-2">
        <GeofenceStatus state="allocated" />
        
        <QRCard payload={qrPayload} />
        
        <PayloadPanel 
          data={{
            manifestId: "MX-88241",
            vehicleMatch: "MH12AB4582",
            destination: "WH-BAY-14"
          }} 
        />
        
        <DockAllocation />
        
        <LiveQueue 
          trucksAhead={6}
          estWaitMin={12}
          progressPercent={65}
        />
      </div>

      <BottomNav />
    </main>
  );
}
