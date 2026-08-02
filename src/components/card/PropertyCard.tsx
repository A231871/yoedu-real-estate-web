import { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '@/lib/utils/format';

export interface PropertyCardData {
  id?: string;
  title?: string;
  location?: string;
  area?: number;
  price?: string | number;
  image?: string;
  slug?: string;
  beds?: number;
  baths?: number;
  tag?: string;
  listingType?: string;
  category?: 'sale' | 'rent';
  type?: 'sale' | 'rent';
}

interface PropertyCardProps {
  property: PropertyCardData;
  layout?: 'grid' | 'list';
}

// Fallback high-quality architectural image
const DEFAULT_FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80';

export default function PropertyCard({ property, layout = 'grid' }: PropertyCardProps) {
  const [favorited, setFavorited] = useState(false);

  const isRent = property.listingType === 'FOR_RENT' || property.category === 'rent' || property.type === 'rent';
  const tagText = property.tag || (isRent ? 'Cho thuê' : 'Đang bán');
  const imageUrl = DEFAULT_FALLBACK_IMAGE; // TODO: Change to proper image

  // Dynamically build metrics list to avoid empty slots or trailing pipes
  const metrics: string[] = [];
  if (property.beds && property.beds > 0) metrics.push(`${property.beds} PN`);
  if (property.baths && property.baths > 0) metrics.push(`${property.baths} PT`);
  if (property.area && property.area > 0) metrics.push(`${property.area} m²`);

  const renderMetrics = () => {
    if (metrics.length === 0) return null;
    return (
      <div className="flex items-center gap-3 py-2 border-y border-outline-variant text-[12px] leading-[1] font-semibold tracking-[0.05em] text-primary uppercase">
        {metrics.map((metric, index) => (
          <span key={metric} className="flex items-center gap-3">
            <span>{metric}</span>
            {index < metrics.length - 1 && <span className="text-outline-variant font-normal">|</span>}
          </span>
        ))}
      </div>
    );
  };

  if (layout === 'list') {
    return (
      <div className="group flex flex-col sm:flex-row gap-0 bg-white border border-outline-variant hover:border-outline hover:shadow-[0px_4px_20px_rgba(0,0,0,0.05)] transition-all duration-300 rounded-lg overflow-hidden cursor-pointer">
        <div className="relative w-full sm:w-64 md:w-72 h-48 sm:h-auto flex-shrink-0 overflow-hidden">
          <img
            src={imageUrl}
            alt={property.title || 'Property'}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Tag badge - styled according to DESIGN.md chips */}
          <div className="absolute top-3 left-3 bg-surface-container/90 backdrop-blur-xs text-secondary px-3 py-1.5 text-[12px] leading-[1] font-semibold tracking-[0.05em] uppercase rounded-sm">
            {tagText}
          </div>
        </div>
        <div className="flex-1 p-6 flex flex-col justify-between gap-4">
          <div>
            <h3 className="text-[20px] md:text-[24px] leading-[1.4] font-medium text-primary mb-2 group-hover:underline decoration-1 transition-all">
              {property.title}
            </h3>
            <p className="text-[14px] md:text-[16px] leading-[1.6] text-secondary flex items-center gap-1.5 mb-4">
              <span className="material-symbols-outlined text-[18px]">location_on</span>
              <span>{property.location}</span>
            </p>
            {renderMetrics()}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <p className="text-[20px] md:text-[24px] leading-[1.4] font-bold text-primary">
              {formatPrice(property.price, property.listingType, property.category || property.type)}
            </p>
            <Link
              to={`/chi-tiet/${property.id}`}
              className="px-6 py-2 border border-primary text-[12px] leading-[1] font-semibold tracking-[0.05em] uppercase bg-transparent hover:bg-primary hover:text-on-primary transition-all rounded-sm"
            >
              Xem chi tiết
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link to={`/chi-tiet/${property.id}`} className="group cursor-pointer block">
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3] rounded-lg mb-4">
        <img
          src={imageUrl}
          alt={property.title || 'Property'}
          className="property-image w-full h-full object-cover"
        />
        {/* Tag badge - styled according to DESIGN.md chips */}
        <div className="absolute top-3 left-3 bg-surface-container/90 backdrop-blur-xs text-secondary px-3 py-1.5 text-[12px] leading-[1] font-semibold tracking-[0.05em] uppercase rounded-sm">
          {tagText}
        </div>
        {/* Favorite button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setFavorited((f) => !f);
          }}
          className="absolute top-3 right-3 bg-white/80 hover:bg-white text-primary p-2 rounded-full transition-colors backdrop-blur-sm shadow-sm"
          aria-label="Yêu thích"
        >
          <span
            className="material-symbols-outlined text-[18px]"
            style={{ fontVariationSettings: favorited ? "'FILL' 1" : "'FILL' 0" }}
          >
            favorite
          </span>
        </button>
      </div>

      {/* Info */}
      <div className="space-y-2">
        <h3 className="text-[20px] md:text-[24px] leading-[1.4] font-medium text-primary group-hover:underline decoration-1 transition-all line-clamp-2 h-[56px] md:h-[68px]">
          {property.title}
        </h3>
        <p className="text-[14px] md:text-[16px] leading-[1.6] text-secondary flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[18px]">location_on</span>
          <span className="line-clamp-1">{property.location}</span>
        </p>
        {renderMetrics()}
        <p className="text-[20px] md:text-[24px] leading-[1.4] font-bold text-primary pt-1">
          {formatPrice(property.price, property.listingType, property.category || property.type)}
        </p>
      </div>
    </Link>
  );
}
