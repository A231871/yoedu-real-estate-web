import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Search, LayoutGrid, List } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PropertyCard from '@/components/card/PropertyCard';
import PropertyFilterPanel from '@/components/property/PropertyFilterPanel';
import { getListingSummariesPage, type ListingFilters } from '@/lib/data/listing';
import { getProvinces, getWardsByProvinceCode } from '@/lib/data/location';
import { getAmenities } from '@/lib/data/amenity';
import { getPropertyTypes } from '@/lib/data/property-type';
import { formatPrice } from '@/lib/utils/format';
import { ListingSummaryResponseListingTypeEnum } from '@/api/openapi-generated';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

const DEFAULT_SORT = 'date-desc';

const SORT_OPTIONS = [
  { value: 'date-desc', label: 'Mới nhất' },
  { value: 'date-asc', label: 'Cũ nhất' },
  { value: 'price-asc', label: 'Giá tăng dần' },
  { value: 'price-desc', label: 'Giá giảm dần' },
  { value: 'area-asc', label: 'Diện tích tăng dần' },
  { value: 'area-desc', label: 'Diện tích giảm dần' },
];

const SORT_MAP: Record<string, string> = {
  'date-desc': 'createdAt,desc',
  'date-asc': 'createdAt,asc',
  'price-asc': 'amountVND,asc',
  'price-desc': 'amountVND,desc',
  'area-asc': 'area,asc',
  'area-desc': 'area,desc',
};

const FILTER_KEYS = [
  'minPrice',
  'maxPrice',
  'minBedrooms',
  'minBathrooms',
  'minArea',
  'maxArea',
  'provinceCode',
  'wardCode',
  'propertyTypeId',
] as const;

function parseFiltersFromSearchParams(searchParams: URLSearchParams): ListingFilters {
  const num = (key: string) => {
    const v = searchParams.get(key);
    return v ? Number(v) : undefined;
  };
  const amenityIdsRaw = searchParams.get('amenityIds');
  return {
    minPrice: num('minPrice'),
    maxPrice: num('maxPrice'),
    minBedrooms: num('minBedrooms'),
    minBathrooms: num('minBathrooms'),
    minArea: num('minArea'),
    maxArea: num('maxArea'),
    provinceCode: searchParams.get('provinceCode') ?? undefined,
    wardCode: searchParams.get('wardCode') ?? undefined,
    propertyTypeId: num('propertyTypeId'),
    amenityIds: amenityIdsRaw ? amenityIdsRaw.split(',').map(Number) : undefined,
  };
}

function getPageWindow(current: number, total: number): (number | 'ellipsis')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = new Set<number>([1, total, current - 1, current, current + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  const result: (number | 'ellipsis')[] = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) result.push('ellipsis');
    result.push(p);
  });
  return result;
}

interface PropertyListingPageProps {
  listingType: ListingSummaryResponseListingTypeEnum;
  eyebrow: string;
  title: string;
}

export default function PropertyListingPage({ listingType, eyebrow, title }: PropertyListingPageProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [layoutView, setLayoutView] = useState<'grid' | 'list'>('grid');
  const resultsRef = useRef<HTMLDivElement>(null);

  const filters = useMemo(() => parseFiltersFromSearchParams(searchParams), [searchParams]);
  const sortParam = searchParams.get('sort');
  const sort = sortParam && sortParam in SORT_MAP ? sortParam : DEFAULT_SORT;
  const page = Math.max(1, Number(searchParams.get('page') ?? '1'));
  const search = searchParams.get('q') ?? '';
  const [searchInput, setSearchInput] = useState(search);

  // Keep local input in sync when 'q' changes from elsewhere (chip removal, back/forward).
  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  // Debounce writing the query into the URL so typing doesn't navigate on every keystroke
  // (that navigation was interrupting IME/diacritic composition, e.g. Vietnamese input).
  useEffect(() => {
    if (searchInput === search) return;
    const timeout = setTimeout(() => handleSearchChange(searchInput), 300);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  const commitFilters = (newFilters: ListingFilters) => {
    const next = new URLSearchParams(searchParams);
    FILTER_KEYS.forEach((key) => {
      const value = newFilters[key];
      if (value === undefined) next.delete(key);
      else next.set(key, String(value));
    });
    if (newFilters.amenityIds?.length) next.set('amenityIds', newFilters.amenityIds.join(','));
    else next.delete('amenityIds');
    next.delete('page');
    setSearchParams(next, { replace: true });
  };

  const handleSortChange = (value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value === DEFAULT_SORT) next.delete('sort');
    else next.set('sort', value);
    next.delete('page');
    setSearchParams(next, { replace: true });
  };

  const handleSearchChange = (value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set('q', value);
    else next.delete('q');
    setSearchParams(next, { replace: true });
  };

  const goToPage = (p: number) => {
    const next = new URLSearchParams(searchParams);
    if (p <= 1) next.delete('page');
    else next.set('page', String(p));
    setSearchParams(next, { replace: true });
    resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['listings', listingType, filters, sort, page],
    queryFn: () =>
      getListingSummariesPage(listingType, {
        ...filters,
        page: page - 1,
        sort: [SORT_MAP[sort]],
      }),
  });

  const listings = useMemo(() => data?.listings ?? [], [data]);
  const totalElements = data?.totalElements ?? 0;
  const totalPages = data?.totalPages ?? 0;

  const displayedListings = useMemo(() => {
    if (!searchInput) return listings;
    const q = searchInput.toLowerCase();
    return listings.filter((p) => p.title?.toLowerCase().includes(q));
  }, [listings, searchInput]);

  const { data: provinces = [] } = useQuery({ queryKey: ['provinces'], queryFn: getProvinces });
  const { data: wards = [] } = useQuery({
    queryKey: ['wards', filters.provinceCode],
    queryFn: () => getWardsByProvinceCode(filters.provinceCode!),
    enabled: !!filters.provinceCode,
  });
  const { data: amenities = [] } = useQuery({ queryKey: ['amenities'], queryFn: getAmenities });
  const { data: propertyTypes = [] } = useQuery({ queryKey: ['propertyTypes'], queryFn: getPropertyTypes });

  const chips = useMemo(() => {
    const list: { key: string; label: string; onRemove: () => void }[] = [];

    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      const min = filters.minPrice !== undefined ? formatPrice(filters.minPrice, listingType) : '0';
      const max = filters.maxPrice !== undefined ? formatPrice(filters.maxPrice, listingType) : '∞';
      list.push({
        key: 'price',
        label: `Giá: ${min} – ${max}`,
        onRemove: () => commitFilters({ ...filters, minPrice: undefined, maxPrice: undefined }),
      });
    }
    if (filters.minArea !== undefined || filters.maxArea !== undefined) {
      list.push({
        key: 'area',
        label: `Diện tích: ${filters.minArea ?? 0} – ${filters.maxArea ?? '∞'} m²`,
        onRemove: () => commitFilters({ ...filters, minArea: undefined, maxArea: undefined }),
      });
    }
    if (filters.minBedrooms !== undefined) {
      list.push({
        key: 'beds',
        label: `${filters.minBedrooms}+ phòng ngủ`,
        onRemove: () => commitFilters({ ...filters, minBedrooms: undefined }),
      });
    }
    if (filters.minBathrooms !== undefined) {
      list.push({
        key: 'baths',
        label: `${filters.minBathrooms}+ phòng tắm`,
        onRemove: () => commitFilters({ ...filters, minBathrooms: undefined }),
      });
    }
    if (filters.provinceCode) {
      const name = provinces.find((p) => p.code === filters.provinceCode)?.name ?? filters.provinceCode;
      list.push({
        key: 'province',
        label: name,
        onRemove: () => commitFilters({ ...filters, provinceCode: undefined, wardCode: undefined }),
      });
    }
    if (filters.wardCode) {
      const name = wards.find((w) => w.code === filters.wardCode)?.name ?? filters.wardCode;
      list.push({
        key: 'ward',
        label: name,
        onRemove: () => commitFilters({ ...filters, wardCode: undefined }),
      });
    }
    if (filters.propertyTypeId !== undefined) {
      const name =
        propertyTypes.find((pt) => Number(pt.id) === filters.propertyTypeId)?.name ??
        `Loại nhà #${filters.propertyTypeId}`;
      list.push({
        key: 'propertyType',
        label: name,
        onRemove: () => commitFilters({ ...filters, propertyTypeId: undefined }),
      });
    }
    if (filters.amenityIds?.length) {
      const names = filters.amenityIds
        .map((id) => amenities.find((a) => Number(a.id) === id)?.name)
        .filter((n): n is string => Boolean(n));
      list.push({
        key: 'amenities',
        label: names.length ? names.join(', ') : `${filters.amenityIds.length} tiện ích`,
        onRemove: () => commitFilters({ ...filters, amenityIds: undefined }),
      });
    }

    return list;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, listingType, provinces, wards, amenities, propertyTypes]);

  return (
    <>
      <Header />
      <main className="pt-24">
        {/* Page Header */}
        <div className="bg-surface-container-low border-b border-outline-variant py-16 px-5 md:px-16">
          <div className="max-w-[1280px] mx-auto">
            <span className="text-[12px] leading-[1] font-semibold tracking-[0.2em] text-secondary uppercase mb-4 block">
              {eyebrow}
            </span>
            <h1 className="text-[40px] md:text-[56px] font-medium leading-[1.1] tracking-[-0.02em] text-primary">
              {title}
            </h1>
          </div>
        </div>

        <div className="max-w-[1280px] mx-auto px-5 md:px-16 py-12">
          {/* Filters Row */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="flex items-center border border-outline-variant px-4 gap-3 bg-white">
                <Search className="size-[18px] text-secondary shrink-0" />
                <Input
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Tìm kiếm..."
                  className="border-none p-0 h-auto shadow-none py-3 text-[16px] text-on-surface bg-transparent w-52"
                />
              </div>
              <PropertyFilterPanel filters={filters} onApply={commitFilters} activeCount={chips.length} />
            </div>
            <div className="flex items-center gap-4">
              <Select value={sort} onValueChange={handleSortChange}>
                <SelectTrigger className="bg-white text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SORT_OPTIONS.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <ToggleGroup
                type="single"
                variant="outline"
                value={layoutView}
                onValueChange={(value) => value && setLayoutView(value as 'grid' | 'list')}
                className="hidden md:flex border border-outline-variant"
              >
                <ToggleGroupItem value="grid" aria-label="Grid view" className="p-3">
                  <LayoutGrid className="size-[18px]" />
                </ToggleGroupItem>
                <ToggleGroupItem value="list" aria-label="List view" className="p-3">
                  <List className="size-[18px]" />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>

          {/* Active filter chips */}
          {chips.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-6">
              {chips.map((chip) => (
                <Badge key={chip.key} className="gap-2 pr-2">
                  {chip.label}
                  <button
                    type="button"
                    onClick={chip.onRemove}
                    aria-label={`Xóa bộ lọc ${chip.label}`}
                    className="hover:opacity-60"
                  >
                    ×
                  </button>
                </Badge>
              ))}
              <Button variant="link" className="h-auto p-0 text-xs" onClick={() => commitFilters({})}>
                Xóa tất cả
              </Button>
            </div>
          )}

          <div ref={resultsRef}>
            {/* Result Count */}
            {!isLoading && !isError && (
              <p className="text-[16px] text-secondary mb-8">
                {searchInput ? (
                  <>
                    Hiển thị <span className="font-semibold text-primary">{displayedListings.length}</span> bất động sản
                  </>
                ) : totalElements > listings.length ? (
                  <>
                    Hiển thị <span className="font-semibold text-primary">{listings.length}</span> trên tổng số{' '}
                    <span className="font-semibold text-primary">{totalElements}</span> bất động sản
                  </>
                ) : (
                  <>
                    Hiển thị <span className="font-semibold text-primary">{listings.length}</span> bất động sản
                  </>
                )}
              </p>
            )}

            {/* Loading / Error / Empty / Content states */}
            {isLoading ? (
              <div className="py-40 text-center text-secondary text-[20px]">
                Đang tải...
              </div>
            ) : isError ? (
              <div className="py-40 text-center text-error text-[20px]">
                Không thể tải danh sách bất động sản
              </div>
            ) : displayedListings.length > 0 ? (
              layoutView === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayedListings.map((p) => (
                    <PropertyCard
                      key={p.id}
                      property={{
                        id: p.id,
                        title: p.title ?? '',
                        location: p.provinceName ?? '',
                        area: p.area ?? 0,
                        price: p.amountVND ?? 0,
                        image: p.thumbnails?.[0]?.url,
                        slug: p.slug,
                        listingType: p.listingType,
                      }}
                      layout="grid"
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {displayedListings.map((p) => (
                    <PropertyCard
                      key={p.id}
                      property={{
                        id: p.id,
                        title: p.title ?? '',
                        location: p.provinceName ?? '',
                        area: p.area ?? 0,
                        price: p.amountVND ?? 0,
                        image: p.thumbnails?.[0]?.url,
                        slug: p.slug,
                        listingType: p.listingType,
                      }}
                      layout="list"
                    />
                  ))}
                </div>
              )
            ) : (
              <div className="py-40 text-center text-secondary text-[20px]">
                Không tìm thấy bất động sản phù hợp
              </div>
            )}
          </div>

          {/* Pagination */}
          {!isLoading && !isError && totalPages > 1 && (
            <Pagination className="mt-12">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (page > 1) goToPage(page - 1);
                    }}
                    className={page <= 1 ? 'pointer-events-none opacity-50' : undefined}
                  />
                </PaginationItem>
                {getPageWindow(page, totalPages).map((p, i) =>
                  p === 'ellipsis' ? (
                    <PaginationItem key={`ellipsis-${i}`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  ) : (
                    <PaginationItem key={p}>
                      <PaginationLink
                        href="#"
                        isActive={p === page}
                        onClick={(e) => {
                          e.preventDefault();
                          goToPage(p);
                        }}
                      >
                        {p}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (page < totalPages) goToPage(page + 1);
                    }}
                    className={page >= totalPages ? 'pointer-events-none opacity-50' : undefined}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
