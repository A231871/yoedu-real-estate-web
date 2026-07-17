import { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PropertyCard from '../components/card/PropertyCard';
import { getListingDetail, getListingSummaries } from '../data/listings';
import { formatPrice } from '../utils/format';
import { ListingDetailResponseListingTypeEnum } from '../api/openapi-generated';

const DEFAULT_FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80';

export default function PropertyDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [favorited, setFavorited] = useState(false);
  const [activeImg, setActiveImg] = useState(0);

  // Fetch listing detail
  const {
    data: property,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['listing', id],
    queryFn: () => getListingDetail(id!),
    enabled: !!id,
  });

  // Fetch related listings based on type
  const { data: relatedListings = [] } = useQuery({
    queryKey: ['listings', property?.listingType],
    queryFn: () => getListingSummaries(property!.listingType!),
    enabled: !!property?.listingType,
  });

  const related = useMemo(() => {
    if (!property) return [];
    return relatedListings
      .filter((p) => p.id !== property.id)
      .slice(0, 3);
  }, [relatedListings, property]);

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="pt-40 text-center py-40 text-secondary text-[20px]">
          Đang tải thông tin chi tiết bất động sản...
        </div>
        <Footer />
      </>
    );
  }

  if (isError || !property) {
    return (
      <>
        <Header />
        <div className="pt-40 text-center py-32">
          <h1 className="text-[40px] font-medium text-primary mb-6">Không tìm thấy bất động sản</h1>
          <button onClick={() => navigate(-1)} className="bg-primary text-on-primary px-8 py-3 text-sm font-semibold uppercase rounded-sm">
            Quay lại
          </button>
        </div>
        <Footer />
      </>
    );
  }

  const category = property.listingType === ListingDetailResponseListingTypeEnum.ForSale ? 'sale' : 'rent';
  const images = property.listingMediaDtos?.map((m) => m.url).filter(Boolean) as string[] ?? [];
  images.push(DEFAULT_FALLBACK_IMAGE) // TODO Change to proper images

  const locationStr = property.address
    ? `${property.address}, ${property.ward ? `${property.ward}, ` : ''}${property.province ?? ''}`
    : property.province ?? '';

  // Parse amenities and dynamic specifications
  const AMENITIES = [
    ...(property.bedrooms ? [{ icon: 'bed', label: `${property.bedrooms} Phòng ngủ` }] : []),
    ...(property.bathrooms ? [{ icon: 'shower', label: `${property.bathrooms} Phòng tắm` }] : []),
    ...(property.area ? [{ icon: 'square_foot', label: `${property.area} m²` }] : []),
    ...(property.floors ? [{ icon: 'layers', label: `${property.floors} Tầng` }] : []),
    ...(property.amenities?.map((name) => {
      let icon = 'check_circle';
      const lowercaseName = name.toLowerCase();
      if (lowercaseName.includes('bể bơi') || lowercaseName.includes('hồ bơi')) icon = 'pool';
      else if (lowercaseName.includes('xe')) icon = 'garage';
      else if (lowercaseName.includes('an ninh') || lowercaseName.includes('bảo vệ')) icon = 'security';
      else if (lowercaseName.includes('sân vườn') || lowercaseName.includes('vườn')) icon = 'yard';
      else if (lowercaseName.includes('điều hòa') || lowercaseName.includes('máy lạnh')) icon = 'ac_unit';
      else if (lowercaseName.includes('ban công')) icon = 'balcony';
      else if (lowercaseName.includes('thang máy')) icon = 'elevator';
      return { icon, label: name };
    }) ?? [])
  ];

  const formattedPrice = formatPrice(property.currentPrice, property.listingType);
  const pricePerSqm = property.currentPrice && property.area && property.area > 0
    ? Math.round(property.currentPrice / property.area).toLocaleString('vi-VN')
    : null;

  return (
    <>
      <Header />
      <main className="pt-24">
        {/* Breadcrumb */}
        <div className="max-w-[1280px] mx-auto px-5 md:px-16 py-6 flex items-center gap-3 text-[12px] tracking-[0.05em] uppercase text-secondary">
          <Link to="/" className="hover:text-primary transition-colors">Trang chủ</Link>
          <span>/</span>
          <Link to={category === 'sale' ? '/ban' : '/cho-thue'} className="hover:text-primary transition-colors">
            {category === 'sale' ? 'Nhà đất bán' : 'Nhà đất cho thuê'}
          </Link>
          <span>/</span>
          <span className="text-primary">{property.title?.slice(0, 30)}…</span>
        </div>

        {/* Main Image + Gallery */}
        <div className="max-w-[1280px] mx-auto px-5 md:px-16 mb-16">
          <div className="relative aspect-[16/9] overflow-hidden mb-4 rounded-lg">
            <img
              src={images[activeImg]}
              alt={property.title || 'Property Detail'}
              className="w-full h-full object-cover transition-all duration-500"
            />
            <span className="absolute bottom-4 right-4 bg-black/60 text-white text-[12px] font-semibold px-4 py-2 tracking-widest uppercase rounded-sm">
              {activeImg + 1} / {images.length}
            </span>
          </div>
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`flex-shrink-0 w-24 h-16 overflow-hidden border-2 transition-all rounded-md ${
                    activeImg === i ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content + Sidebar */}
        <div className="max-w-[1280px] mx-auto px-5 md:px-16 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16 mb-24">
          {/* Left */}
          <div>
            <div className="flex items-start justify-between gap-4 mb-4">
              <h1 className="text-[32px] md:text-[48px] font-medium leading-[1.2] tracking-[-0.01em] text-primary">
                {property.title}
              </h1>
              <button
                onClick={() => setFavorited((f) => !f)}
                className="flex-shrink-0 p-3 border border-outline-variant hover:bg-surface-container-low transition-colors rounded-sm"
                aria-label="Yêu thích"
              >
                <span
                  className="material-symbols-outlined text-[24px] text-primary"
                  style={{ fontVariationSettings: favorited ? "'FILL' 1" : "'FILL' 0" }}
                >
                  favorite
                </span>
              </button>
            </div>

            <p className="flex items-center gap-2 text-[16px] text-secondary mb-6">
              <span className="material-symbols-outlined text-[18px]">location_on</span>
              <span>{locationStr}</span>
            </p>

            <div className="grid grid-cols-3 gap-4 py-6 border-y border-outline-variant mb-8">
              {AMENITIES.slice(0, 3).map((a) => (
                <div key={a.icon} className="flex flex-col items-center gap-2 text-center">
                  <span className="material-symbols-outlined text-[28px] text-primary">{a.icon}</span>
                  <span className="text-[14px] font-semibold text-secondary">{a.label}</span>
                </div>
              ))}
            </div>

            <section className="mb-12">
              <h2 className="text-[24px] font-semibold text-primary mb-4">Mô tả</h2>
              <p className="text-[16px] leading-[1.8] text-secondary whitespace-pre-line">
                {property.description || `Đây là bất động sản cao cấp tại ${locationStr}, được thiết kế với tiêu chuẩn quốc tế.`}
              </p>
            </section>

            {AMENITIES.length > 3 && (
              <section>
                <h2 className="text-[24px] font-semibold text-primary mb-6">Tiện ích</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {AMENITIES.map((a) => (
                    <div key={a.label} className="flex items-center gap-3 py-3 px-4 border border-outline-variant rounded-sm">
                      <span className="material-symbols-outlined text-primary text-[22px]">{a.icon}</span>
                      <span className="text-[16px] text-secondary">{a.label}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="h-fit sticky top-28">
            <div className="border border-outline-variant p-8 rounded-lg bg-white">
              <p className="text-[32px] md:text-[40px] font-bold text-primary mb-2">{formattedPrice}</p>
              {pricePerSqm && (
                <p className="text-[16px] text-secondary mb-8">
                  ~ {pricePerSqm} đ/m²
                </p>
              )}
              <button className="w-full bg-primary text-on-primary py-4 text-[12px] font-semibold leading-[1] tracking-[0.05em] uppercase mb-4 hover:opacity-90 transition-all rounded-sm">
                Liên hệ tư vấn
              </button>
              <button className="w-full border border-primary text-primary py-4 text-[12px] font-semibold leading-[1] tracking-[0.05em] uppercase hover:bg-primary hover:text-on-primary transition-all mb-8 rounded-sm">
                Đặt lịch xem nhà
              </button>
              <div className="border-t border-outline-variant pt-6 space-y-4">
                <p className="text-[12px] font-semibold tracking-[0.05em] uppercase text-secondary">Nhà môi giới</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-surface-container-low flex items-center justify-center rounded-sm">
                    <span className="material-symbols-outlined text-[28px] text-secondary">person</span>
                  </div>
                  <div>
                    <p className="text-[16px] font-semibold text-primary">Yoedu Property</p>
                    <p className="text-[14px] text-secondary">Hotline: 1900 1234</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="bg-surface-container-low py-24">
            <div className="max-w-[1280px] mx-auto px-5 md:px-16">
              <h2 className="text-[32px] font-medium text-primary mb-12">Bất động sản tương tự</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map((p) => (
                  <PropertyCard
                    key={p.id}
                    property={{
                      id: p.id,
                      title: p.title ?? '',
                      location: p.provinceName ?? '',
                      area: p.area ?? 0,
                      price: p.currentPrice ?? 0,
                      image: p.thumbnails?.[0]?.url,
                      slug: p.slug,
                      listingType: p.listingType,
                    }}
                  />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
