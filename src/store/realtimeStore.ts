'use client';

import { create } from 'zustand';

interface RealtimeState {
  isConnected: boolean;
  activeShipments: any[];
  telemetryStream: Record<string, any>; // dict of truck_id -> coords
  notifications: any[];
  
  setConnected: (status: boolean) => void;
  updateShipment: (data: any) => void;
  updateTelemetry: (data: any) => void;
  addNotification: (data: any) => void;
}

export const useRealtimeStore = create<RealtimeState>((set) => ({
  isConnected: false,
  activeShipments: [],
  telemetryStream: {},
  notifications: [],

  setConnected: (status) => set({ isConnected: status }),

  updateShipment: (data) => set((state) => {
    // Upsert shipment
    const idx = state.activeShipments.findIndex(s => s.id === data.id);
    if (idx >= 0) {
      const newShipments = [...state.activeShipments];
      newShipments[idx] = { ...newShipments[idx], ...data };
      return { activeShipments: newShipments };
    }
    return { activeShipments: [data, ...state.activeShipments] };
  }),

  updateTelemetry: (data) => set((state) => ({
    telemetryStream: {
      ...state.telemetryStream,
      [data.truck_id]: data
    }
  })),

  addNotification: (data) => set((state) => ({
    notifications: [data, ...state.notifications]
  })),
}));
