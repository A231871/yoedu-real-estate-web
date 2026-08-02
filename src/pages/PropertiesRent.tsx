import PropertyListingPage from '@/components/property/PropertyListingPage';
import { ListingSummaryResponseListingTypeEnum } from '@/api/openapi-generated';

export default function PropertiesRent() {
  return (
    <PropertyListingPage
      listingType={ListingSummaryResponseListingTypeEnum.ForRent}
      eyebrow="Thuê bất động sản"
      title="Nhà đất cho thuê"
    />
  );
}
