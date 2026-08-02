import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, LayoutGrid, List } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PropertyCard from '@/components/card/PropertyCard';
import { getListingSummaries } from '@/lib/data/listing';
import { ListingSummaryResponseListingTypeEnum } from '@/api/openapi-generated';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

const SORT_OPTIONS = [
  { value: 'default', label: 'Mặc định' },
  { value: 'price-asc', label: 'Giá tăng dần' },
  { value: 'price-desc', label: 'Giá giảm dần' },
  { value: 'area-asc', label: 'Diện tích tăng dần' },
];

interface PropertyListingPageProps {
  listingType: ListingSummaryResponseListingTypeEnum;
  eyebrow: string;
  title: string;
}

export default function PropertyListingPage({ listingType, eyebrow, title }: PropertyListingPageProps) {
  const [sort, setSort] = useState('default');
  const [layoutView, setLayoutView] = useState<'grid' | 'list'>('grid');
  const [search, setSearch] = useState('');

  const {
    data: listings = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['listings', listingType],
    queryFn: () => getListingSummaries(listingType),
  });

  const filtered = useMemo(() => {
    let data = [...listings];

    if (search) {
      const q = search.toLowerCase();
      data = data.filter(
        (p) =>
          p.title?.toLowerCase().includes(q) ||
          p.provinceName?.toLowerCase().includes(q)
      );
    }

    if (sort === 'price-asc') {
      data.sort((a, b) => (a.currentPrice ?? 0) - (b.currentPrice ?? 0));
    } else if (sort === 'price-desc') {
      data.sort((a, b) => (b.currentPrice ?? 0) - (a.currentPrice ?? 0));
    } else if (sort === 'area-asc') {
      data.sort((a, b) => (a.area ?? 0) - (b.area ?? 0));
    }

    return data;
  }, [listings, sort, search]);

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
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="flex items-center border border-outline-variant px-4 gap-3 bg-white">
                <Search className="size-[18px] text-secondary shrink-0" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Tìm kiếm..."
                  className="border-none p-0 h-auto shadow-none py-3 text-[16px] text-on-surface bg-transparent w-52"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Select value={sort} onValueChange={setSort}>
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

          {/* Result Count */}
          {!isLoading && !isError && (
            <p className="text-[16px] text-secondary mb-8">
              Hiển thị{' '}
              <span className="font-semibold text-primary">
                {filtered.length}
              </span>{' '}
              bất động sản
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
          ) : filtered.length > 0 ? (
            layoutView === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((p) => (
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
                    layout="grid"
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {filtered.map((p) => (
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
      </main>
      <Footer />
    </>
  );
}
