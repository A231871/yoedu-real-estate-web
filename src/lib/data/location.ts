import { locationControllerApi } from "@/api/client";
import type { ProvinceResponse, WardResponse } from "@/api/openapi-generated";

export async function getProvinces(): Promise<ProvinceResponse[]> {
  const { data } = await locationControllerApi.getProvinces();
  return data.data!;
}

export async function getWardsByProvinceCode(provinceCode: string): Promise<WardResponse[]> {
  const { data } = await locationControllerApi.getWards({ provinceCode });
  return data.data!;
}
