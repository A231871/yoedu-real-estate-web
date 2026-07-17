import { amenityControllerApi } from "../api/client";
import type { AmenityResponse } from "@/api/openapi-generated";

export async function getAmenities(): Promise<AmenityResponse[]> {
  const { data } = await amenityControllerApi.getAmenities();
  return data.data!;
}
