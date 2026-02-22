// Types for vehicle creation workflow
export interface VehicleData {
  companyName: string;
  companyDescription: string;
  lotId: string;
  year: number;
  make: string;
  model: string;
  trim: string;
  condition: string;
  auctionDate: string;
  location: string;
  titleType: string;
  timezone: string;
  language: string;
  sourceUrl: string;
}

export interface QuoteData {
  purchasePrice: number;
  shippingCost: number;
  importTaxes: number;
  additionalFees: number;
  sellingPrice: number;
  profitMargin: number;
}

export interface VehicleCreationState {
  importData: VehicleData | null;
  quoteData: QuoteData | null;
}

export const CreationStep = {
  IMPORT: 0,
  VEHICLE_DETAILS: 1,
  QUOTE: 2,
  SUMMARY: 3,
} as const;
export type CreationStep = (typeof CreationStep)[keyof typeof CreationStep];

export interface StepConfig {
  id: CreationStep;
  label: string;
  isComplete: (state: VehicleCreationState) => boolean;
}
