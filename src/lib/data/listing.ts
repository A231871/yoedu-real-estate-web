import { listingControllerApi } from "@/api/client";
import {
  ListingSummaryResponseListingTypeEnum,
  type ListingDetailResponse,
  type ListingSummaryResponse
} from "@/api/openapi-generated";
import type { GetListingsListingTypeEnum } from "@/api/openapi-generated/clients/listing-controller-api";

export interface ListingFilters {
  page?: number;
  size?: number;
  sort?: Array<string>;
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  maxBedrooms?: number;
  minBathrooms?: number;
  maxBathrooms?: number;
  minArea?: number;
  maxArea?: number;
  provinceCode?: string;
  wardCode?: string;
  amenityIds?: Array<number>;
}

export async function getListingSummaries(
  listingType: ListingSummaryResponseListingTypeEnum,
  filters: ListingFilters = {}
): Promise<ListingSummaryResponse[]> {
  const { data } = await listingControllerApi.getListings({
    listingType: listingType as unknown as GetListingsListingTypeEnum,
    ...filters,
  });
  return data.data?.content?.filter((listing) => listing.listingType === listingType) ?? [];
}

export interface ListingSummariesPage {
  listings: ListingSummaryResponse[];
  totalElements: number;
  totalPages: number;
}

export async function getListingSummariesPage(
  listingType: ListingSummaryResponseListingTypeEnum,
  filters: ListingFilters = {}
): Promise<ListingSummariesPage> {
  const { data } = await listingControllerApi.getListings({
    listingType: listingType as unknown as GetListingsListingTypeEnum,
    ...filters,
  });
  return {
    listings: data.data?.content?.filter((listing) => listing.listingType === listingType) ?? [],
    totalElements: data.data?.totalElements ?? 0,
    totalPages: data.data?.totalPages ?? 0,
  };
}

export async function getListingDetail(listingId: string): Promise<ListingDetailResponse> {
  const { data } = await listingControllerApi.getListingDetail({ id: listingId });

  if (!data.data) {
    throw new Error("Listing not found");
  }

  return data.data;
}
