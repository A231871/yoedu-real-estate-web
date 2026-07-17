import { listingControllerApi } from "@/api/client";
import {
  ListingSummaryResponseListingTypeEnum,
  type ListingDetailResponse,
  type ListingSummaryResponse
} from "@/api/openapi-generated";

export async function getListingSummaries(
  listingType: ListingSummaryResponseListingTypeEnum,
  page?: number,
  size?: number,
  sort?: Array<string>
): Promise<ListingSummaryResponse[]> {
  const { data } = await listingControllerApi.getListings({ listingType, page, size, sort });
  return data.data?.content?.filter((listing) => listing.listingType === listingType) ?? [];
}

export async function getListingDetail(listingId: string): Promise<ListingDetailResponse> {
  const { data } = await listingControllerApi.getListingDetail({ id: listingId });

  if (!data.data) {
    throw new Error("Listing not found");
  }

  return data.data;
}
