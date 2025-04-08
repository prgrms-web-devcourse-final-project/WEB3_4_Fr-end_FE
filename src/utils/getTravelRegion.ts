import { travelRegions } from "@/constants/travelRegion";

export function getTravelRegionLabel(value: string): string {
  const match = travelRegions.find((region) => region.value === value);
  return match ? match.label : value;
}
