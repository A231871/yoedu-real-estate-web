import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Property } from '../data/mockData';

interface PropertyCardProps {
  property: Property;
  layout?: 'grid' | 'list';
}

export default function PropertyCard({ property, layout = 'grid' }: PropertyCardProps) {
  const [favorited, setFavorited] = useState(false);

  if (layout === 'list') {
    return (
      <div className="group flex gap-0 border border-outline-variant hover:shadow-[0px_4px_20px_rgba(0,0,0,0.05)] transition-shadow cursor-pointer">
        <div className="relative w-64 flex-shrink-0 overflow-hidden">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3 bg-primary text-on-primary px-3 py-1 text-[12px] leading-[1] font-semibold tracking-[0.05em] uppercase">
            {property.tag}
          </div>
        </div>
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-[24px] leading-[1.4] font-medium text-primary mb-2 group-hover:underline decoration-1 transition-all">
              {property.title}
            </h3>
            <p className="text-[16px] leading-[1.6] text-secondary flex items-center gap-1 mb-4">
              <span className="material-symbols-outlined text-[18px]">location_on</span>
              {property.location}
            </p>
            <div className="flex items-center gap-4 py-3 border-y border-outline-variant text-[12px] leading-[1] font-semibold tracking-[0.05em] text-primary uppercase mb-4">
              <span>{property.beds} PN</span>
              <span className="text-outline-variant">|</span>
              <span>{property.baths} PT</span>
              <span className="text-outline-variant">|</span>
              <span>{property.area} m²</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-[24px] leading-[1.4] font-bold text-primary">{property.price}</p>
            <Link
              to={`/chi-tiet/${property.id}`}
              className="px-6 py-2 border border-primary text-[12px] leading-[1] font-semibold tracking-[0.05em] uppercase hover:bg-primary hover:text-on-primary transition-all"
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
      <div className="relative overflow-hidden aspect-[4/3] mb-5">
        <img
          src={property.image}
          alt={property.title}
          className="property-image w-full h-full object-cover"
        />
        {/* Tag badge */}
        <div className="absolute top-4 left-4 bg-white px-3 py-1 text-[12px] leading-[1] font-semibold tracking-[0.05em] uppercase">
          {property.tag}
        </div>
        {/* Favorite button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setFavorited((f) => !f);
          }}
          className="absolute top-4 right-4 bg-white/80 hover:bg-white text-primary p-2 rounded-full transition-colors backdrop-blur-sm shadow-sm"
          aria-label="Yêu thích"
        >
          <span
            className="material-symbols-outlined text-[20px]"
            style={{ fontVariationSettings: favorited ? "'FILL' 1" : "'FILL' 0" }}
          >
            favorite
          </span>
        </button>
      </div>

      {/* Info */}
      <div className="space-y-3">
        <h3 className="text-[24px] leading-[1.4] font-medium text-primary group-hover:underline decoration-1 transition-all line-clamp-2">
          {property.title}
        </h3>
        <p className="text-[16px] leading-[1.6] text-secondary flex items-center gap-1">
          <span className="material-symbols-outlined text-[18px]">location_on</span>
          <span className="line-clamp-1">{property.location}</span>
        </p>
        <div className="flex items-center gap-4 py-2 border-y border-outline-variant text-[12px] leading-[1] font-semibold tracking-[0.05em] text-primary uppercase">
          <span>{property.beds} PN</span>
          <span className="text-outline-variant">|</span>
          <span>{property.baths} PT</span>
          <span className="text-outline-variant">|</span>
          <span>{property.area} m²</span>
        </div>
        <p className="text-[24px] leading-[1.4] font-bold text-primary">{property.price}</p>
      </div>
    </Link>
  );
}
