import type {
  CopartVehicleDetails,
  VehicleData,
} from "../types/vehicle.types";

export interface FirecrawlResponse {
  success: boolean;
  data: {
    metadata: {
      sourceURL?: string;
      url?: string;
      language?: string;
      timezone?: string;
      title?: string;
    };
    json: {
      copart_vehicle_details?: CopartVehicleDetails;
    };
  };
}

export function parseVehicleData(raw: FirecrawlResponse): VehicleData {
  const metadata = raw.data?.metadata ?? {};
  const details = raw.data?.json?.copart_vehicle_details ?? {};

  const sourceUrl = metadata.sourceURL ?? metadata.url ?? "";
  const lotId =
    details.lot_number ??
    sourceUrl.split("/lot/")[1]?.split("/")[0] ??
    "";

  const ymm = (details.year_make_model ?? "").trim();
  const ymmParts = ymm.split(/\s+/);
  const year = parseInt(ymmParts[0] ?? "0") || 0;
  const make = ymmParts[1] ?? "";
  const model = (ymmParts[2] ?? "") + (ymmParts.length > 3 ? " " + ymmParts.slice(3).join(" ") : "");
  const trim = "";

  const auctionDate = details.sale_date ?? "";
  const condition = details.highlights ?? details.run_and_drive ?? "";
  const location = details.location ?? details.sale_name ?? "";
  const titleType = details.title_code ?? "";

  return {
    companyName: "",
    companyDescription: "",
    lotId,
    year,
    make,
    model,
    trim,
    condition,
    auctionDate,
    location,
    titleType,
    timezone: metadata.timezone ?? "",
    language: metadata.language ?? "",
    sourceUrl,
    copartDetails: details,
  };
}

export function makeEmptyVehicle(sourceUrl: string = ""): VehicleData {
  return {
    companyName: "",
    companyDescription: "",
    lotId: "",
    year: 0,
    make: "",
    model: "",
    trim: "",
    condition: "",
    auctionDate: "",
    location: "",
    titleType: "",
    timezone: "",
    language: "",
    sourceUrl,
    copartDetails: {},
  };
}
