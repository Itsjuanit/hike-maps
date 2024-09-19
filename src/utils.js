import { gpx } from "@tmcw/togeojson";

export function parseGpxToGeoJson(gpxData) {
  const parser = new DOMParser();
  const xml = parser.parseFromString(gpxData, "application/xml");
  return gpx(xml);
}
