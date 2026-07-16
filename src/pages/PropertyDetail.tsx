import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PropertyCard from '../components/card/PropertyCard';
import { mockProperties } from '../data/mockData';

export default function PropertyDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [favorited, setFavorited] = useState(false);
  const [activeImg, setActiveImg] = useState(0);

  const property = mockProperties.find((p) => p.id === id);

  if (!property) {
    return (
      <>
        <Header />
        <div className="pt-40 text-center py-32">
          <h1 className="text-[40px] font-medium text-primary mb-6">Không tìm thấy bất động sản</h1>
          <button onClick={() => navigate(-1)} className="bg-primary text-on-primary px-8 py-3 text-sm font-semibold uppercase">
            Quay lại
          </button>
        </div>
        <Footer />
      </>
    );
  }

  const images = property.images ?? [property.image];
  const related = mockProperties.filter((p) => p.id !== property.id && p.category === property.category).slice(0, 3);

  const AMENITIES = [
    { icon: 'bed', label: `${property.beds} Phòng ngủ` },
    { icon: 'shower', label: `${property.baths} Phòng tắm` },
    { icon: 'square_foot', label: `${property.area} m²` },
    { icon: 'garage', label: 'Chỗ đậu xe' },
    { icon: 'pool', label: 'Hồ bơi' },
    { icon: 'security', label: 'An ninh 24/7' },
  ];

  return (
    <>
      <Header />
      <main className="pt-24">
        {/* Breadcrumb */}
        <div className="max-w-[1280px] mx-auto px-5 md:px-16 py-6 flex items-center gap-3 text-[12px] tracking-[0.05em] uppercase text-secondary">
          <Link to="/" className="hover:text-primary transition-colors">Trang chủ</Link>
          <span>/</span>
          <Link to={property.category === 'sale' ? '/ban' : '/cho-thue'} className="hover:text-primary transition-colors">
            {property.category === 'sale' ? 'Nhà đất bán' : 'Nhà đất cho thuê'}
          </Link>
          <span>/</span>
          <span className="text-primary">{property.title.slice(0, 30)}…</span>
        </div>

        {/* Main Image + Gallery */}
        <div className="max-w-[1280px] mx-auto px-5 md:px-16 mb-16">
          <div className="relative aspect-[16/9] overflow-hidden mb-4 cursor-zoom-in">
            <img
              src={images[activeImg]}
              alt={property.title}
              className="w-full h-full object-cover transition-all duration-500"
            />
            <span className="absolute bottom-4 right-4 bg-black/60 text-white text-[12px] font-semibold px-4 py-2 tracking-widest uppercase">
              {activeImg + 1} / {images.length}
            </span>
          </div>
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`flex-shrink-0 w-24 h-16 overflow-hidden border-2 transition-all ${
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
                className="flex-shrink-0 p-3 border border-outline-variant hover:bg-surface-container-low transition-colors"
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
              {property.location}
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
              <p className="text-[16px] leading-[1.8] text-secondary">
                Đây là bất động sản cao cấp tại {property.location}, được thiết kế với tiêu chuẩn quốc tế.
                Không gian sống đẳng cấp với {property.beds} phòng ngủ, {property.baths} phòng tắm và diện tích {property.area} m².
                Vị trí đắc địa, tiện ích đầy đủ, pháp lý hoàn chỉnh — lý tưởng để sinh sống và đầu tư.
              </p>
            </section>

            <section>
              <h2 className="text-[24px] font-semibold text-primary mb-6">Tiện ích</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {AMENITIES.map((a) => (
                  <div key={a.label} className="flex items-center gap-3 py-3 px-4 border border-outline-variant">
                    <span className="material-symbols-outlined text-primary text-[22px]">{a.icon}</span>
                    <span className="text-[16px] text-secondary">{a.label}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="h-fit sticky top-28">
            <div className="border border-outline-variant p-8">
              <p className="text-[40px] font-bold text-primary mb-2">{property.price}</p>
              <p className="text-[16px] text-secondary mb-8">
                ~ {property.area > 0 ? Math.round(parseInt(property.price.replace(/\D/g, '')) / property.area).toLocaleString() : 'N/A'} đ/m²
              </p>
              <button className="w-full bg-primary text-on-primary py-4 text-[12px] font-semibold leading-[1] tracking-[0.05em] uppercase mb-4 hover:opacity-90 transition-all">
                Liên hệ tư vấn
              </button>
              <button className="w-full border border-primary text-primary py-4 text-[12px] font-semibold leading-[1] tracking-[0.05em] uppercase hover:bg-primary hover:text-on-primary transition-all mb-8">
                Đặt lịch xem nhà
              </button>
              <div className="border-t border-outline-variant pt-6 space-y-4">
                <p className="text-[12px] font-semibold tracking-[0.05em] uppercase text-secondary">Nhà môi giới</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-surface-container-low flex items-center justify-center">
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
                  <PropertyCard key={p.id} property={p} />
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
