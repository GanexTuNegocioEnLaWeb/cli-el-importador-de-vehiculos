import type { QuoteData, VehicleData } from "./vehicle.types";
import type { ClientData } from "./client.types";

export type VehicleItem = {
  id: string;
  lotId: string;
  title: string;
  status: string;
};

export type ClientItem = ClientData;

export interface QuoteCreationState {
  vehicleId?: string;
  importData: VehicleData | null;
  quoteData: QuoteData | null;
  client: ClientData | null;
}

export const CreationQuoteStep = {
  VEHICLE_SELECT: 0,
  VEHICLE_DETAILS: 1,
  QUOTE: 2,
  CLIENT_SELECT: 3,
  SUMMARY: 4,
} as const;
export type CreationQuoteStep =
  (typeof CreationQuoteStep)[keyof typeof CreationQuoteStep];

export interface StepConfig {
  id: CreationQuoteStep;
  label: string;
  isComplete: (state: QuoteCreationState) => boolean;
}
