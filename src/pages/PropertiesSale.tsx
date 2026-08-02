import PropertyListingPage from '@/components/property/PropertyListingPage';
import { ListingSummaryResponseListingTypeEnum } from '@/api/openapi-generated';

export default function PropertiesSale() {
  return (
    <PropertyListingPage
      listingType={ListingSummaryResponseListingTypeEnum.ForSale}
      eyebrow="Mua bất động sản"
      title="Nhà đất bán"
    />
  );
}
