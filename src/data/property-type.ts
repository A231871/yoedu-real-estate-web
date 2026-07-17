import { propertyTypeControllerApi } from "@/api/client";
import type { PropertyTypeResponse } from "@/api/openapi-generated";

export async function getPropertyTypes(): Promise<PropertyTypeResponse[]> {
  const { data } = await propertyTypeControllerApi.getPropertyTypes();
  return data.data!;
}
