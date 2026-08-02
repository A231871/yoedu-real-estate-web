import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PropertyCard from '@/components/card/PropertyCard';
import { getListingSummaries } from '@/lib/data/listing';
import { ListingSummaryResponseListingTypeEnum } from '@/api/openapi-generated';

const SORT_OPTIONS = [
  { value: 'default', label: 'Mặc định' },
  { value: 'price-asc', label: 'Giá tăng dần' },
  { value: 'price-desc', label: 'Giá giảm dần' },
  { value: 'area-asc', label: 'Diện tích tăng dần' },
];

export default function PropertiesSale() {
  const [sort, setSort] = useState('default');
  const [layoutView, setLayoutView] = useState<'grid' | 'list'>('grid');
  const [search, setSearch] = useState('');

  const {
    data: listings = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['listings', ListingSummaryResponseListingTypeEnum.ForSale],
    queryFn: () =>
      getListingSummaries(ListingSummaryResponseListingTypeEnum.ForSale),
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
              Mua bất động sản
            </span>
            <h1 className="text-[40px] md:text-[56px] font-medium leading-[1.1] tracking-[-0.02em] text-primary">
              Nhà đất bán
            </h1>
          </div>
        </div>

        <div className="max-w-[1280px] mx-auto px-5 md:px-16 py-12">
          {/* Filters Row */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="flex items-center border border-outline-variant px-4 gap-3 bg-white">
                <span className="material-symbols-outlined text-secondary text-[18px]">
                  search
                </span>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Tìm kiếm..."
                  className="py-3 outline-none text-[16px] text-on-surface bg-transparent w-52"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="border border-outline-variant px-4 py-3 outline-none text-[14px] text-on-surface bg-white appearance-none"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <div className="hidden md:flex border border-outline-variant">
                <button
                  onClick={() => setLayoutView('grid')}
                  className={`p-3 transition-colors ${
                    layoutView === 'grid'
                      ? 'bg-primary text-on-primary'
                      : 'hover:bg-surface-container-low'
                  }`}
                  aria-label="Grid view"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    grid_view
                  </span>
                </button>
                <button
                  onClick={() => setLayoutView('list')}
                  className={`p-3 transition-colors ${
                    layoutView === 'list'
                      ? 'bg-primary text-on-primary'
                      : 'hover:bg-surface-container-low'
                  }`}
                  aria-label="List view"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    view_list
                  </span>
                </button>
              </div>
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
