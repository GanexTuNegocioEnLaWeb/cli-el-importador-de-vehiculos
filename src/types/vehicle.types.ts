// Types for vehicle creation workflow
import type { ClientData } from "./client.types";
export interface CopartVehicleDetails {
  year_make_model?: string;
  run_and_drive?: string;
  vin?: string;
  lot_number?: string;
  lane_item?: string;
  sale_name?: string;
  location?: string;
  engine_starts?: string;
  transmission_engages?: string;
  title_code?: string;
  odometer?: string;
  odometer_status?: string;
  primary_damage?: string;
  cylinders?: string;
  color?: string;
  has_key?: string;
  engine_type?: string;
  transmission?: string;
  vehicle_type?: string;
  drivetrain?: string;
  fuel?: string;
  body_style?: string;
  sale_date?: string;
  highlights?: string;
  notes?: string;
  current_bid?: string;
  auction_countdown?: string;
  minimum_bid?: string;
  max_bid?: string;
  bidding_increment?: string;
  high_resolution_image_urls?: string[];
  video_urls?: string[];
}

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
  copartDetails?: CopartVehicleDetails;
}

export interface QuoteData {
  remate: number;
  grua: number;
  transporte: number;
  fob: number;
  fees: number;
  transferUSA: number;
  comision: number;
  documentacion: number;
  poliza: number;
  totalUSD: number;
  tasaParalelo: number;
  tasaOficial: number;
  totalParalelo: number;
  totalOficial: number;
}

export interface VehicleCreationState {
  importData: VehicleData | null;
  quoteData: QuoteData | null;
  client: ClientData | null;
}

export const CreationVehicleStep = {
  IMPORT: 0,
  VEHICLE_DETAILS: 1,
  QUOTE: 2,
  CLIENT_SELECT: 3,
  SUMMARY: 4,
} as const;
export type CreationVehicleStep =
  (typeof CreationVehicleStep)[keyof typeof CreationVehicleStep];

export interface StepConfig {
  id: CreationVehicleStep;
  label: string;
  isComplete: (state: VehicleCreationState) => boolean;
}
