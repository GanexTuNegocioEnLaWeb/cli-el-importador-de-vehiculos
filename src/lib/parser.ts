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

export interface ScrapedData {
  metadata: {
    title: string;
    sourceURL: string;
    timezone: string;
    language: string;
  };
  json: {
    company_name: string;
    company_description: string;
  };
}

export function parseVehicleData(raw: ScrapedData): VehicleData {
  const metadata = raw.metadata;
  const json = raw.json;

  const titleParts = metadata.title.split("|").map((p: string) => p.trim());
  const vehicleInfo = titleParts[0].split(" ");

  const year = parseInt(vehicleInfo[0]);
  const make = vehicleInfo[1];
  const model = vehicleInfo[2];
  const trim = vehicleInfo.slice(3).join(" ");

  const lotId = metadata.sourceURL.split("/lot/")[1]?.split("/")[0] ?? "";

  return {
    companyName: json.company_name,
    companyDescription: json.company_description,
    lotId,
    year,
    make,
    model,
    trim,
    condition: titleParts[1] ?? "",
    auctionDate: new Date(titleParts[2]).toISOString().split("T")[0],
    location: titleParts[3] ?? "",
    titleType: metadata.sourceURL.includes("clean-title") ? "Clean Title" : "",
    timezone: metadata.timezone,
    language: metadata.language,
    sourceUrl: metadata.sourceURL,
  };
}
