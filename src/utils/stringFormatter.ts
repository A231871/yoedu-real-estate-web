// Format prices nicely (handling raw numbers and string prices)
export function formatPrice(price: string | number | undefined, listingType?: string, category?: string) {
  if (price === undefined || price === null || price === 0) {
    return 'Liên hệ';
  }
  if (typeof price === 'string') {
    return price;
  }

  const isRent = listingType === 'FOR_RENT' || category === 'rent';

  if (isRent) {
    if (price >= 1_000_000) {
      const millions = price / 1_000_000;
      return `${Number(millions.toFixed(2)).toLocaleString('vi-VN')} triệu/tháng`;
    }
    return `${price.toLocaleString('vi-VN')} VNĐ/tháng`;
  } else {
    if (price >= 1_000_000_000) {
      const billions = price / 1_000_000_000;
      return `${Number(billions.toFixed(2)).toLocaleString('vi-VN')} tỷ`;
    }
    return `${price.toLocaleString('vi-VN')} VNĐ`;
  }
}
