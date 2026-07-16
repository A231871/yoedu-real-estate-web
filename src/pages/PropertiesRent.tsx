import { useState, useMemo } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PropertyCard from '../components/card/PropertyCard';
import { mockProperties } from '../data/mockData';

const rentProperties = mockProperties.filter((p) => p.category === 'rent');

export default function PropertiesRent() {
  const [search, setSearch] = useState('');
  const [selectedBeds, setSelectedBeds] = useState('');
  const [layoutView, setLayoutView] = useState<'grid' | 'list'>('grid');

  const filtered = useMemo(() => {
    let data = [...rentProperties];
    if (search) {
      data = data.filter(
        (p) =>
          p.title.toLowerCase().includes(search.toLowerCase()) ||
          p.location.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (selectedBeds) {
      data = data.filter((p) => p.beds >= Number(selectedBeds));
    }
    return data;
  }, [search, selectedBeds]);

  return (
    <>
      <Header />
      <main className="pt-24">
        {/* Page Header */}
        <div className="bg-surface-container-low border-b border-outline-variant py-16 px-5 md:px-16">
          <div className="max-w-[1280px] mx-auto">
            <span className="text-[12px] leading-[1] font-semibold tracking-[0.2em] text-secondary uppercase mb-4 block">
              Thuê bất động sản
            </span>
            <h1 className="text-[40px] md:text-[56px] font-medium leading-[1.1] tracking-[-0.02em] text-primary">
              Nhà đất cho thuê
            </h1>
          </div>
        </div>

        <div className="max-w-[1280px] mx-auto px-5 md:px-16 py-12">
          {/* Filters */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex items-center border border-outline-variant px-4 gap-3 bg-white">
                <span className="material-symbols-outlined text-secondary text-[18px]">search</span>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Tìm kiếm..."
                  className="py-3 outline-none text-[16px] text-on-surface bg-transparent w-52"
                />
              </div>
              <select
                value={selectedBeds}
                onChange={(e) => setSelectedBeds(e.target.value)}
                className="border border-outline-variant px-4 py-3 outline-none text-[16px] text-on-surface bg-white appearance-none"
              >
                <option value="">Số phòng ngủ</option>
                <option value="1">1+ PN</option>
                <option value="2">2+ PN</option>
                <option value="3">3+ PN</option>
              </select>
            </div>
            <div className="hidden md:flex border border-outline-variant">
              <button
                onClick={() => setLayoutView('grid')}
                className={`p-3 transition-colors ${layoutView === 'grid' ? 'bg-primary text-on-primary' : 'hover:bg-surface-container-low'}`}
                aria-label="Grid view"
              >
                <span className="material-symbols-outlined text-[18px]">grid_view</span>
              </button>
              <button
                onClick={() => setLayoutView('list')}
                className={`p-3 transition-colors ${layoutView === 'list' ? 'bg-primary text-on-primary' : 'hover:bg-surface-container-low'}`}
                aria-label="List view"
              >
                <span className="material-symbols-outlined text-[18px]">view_list</span>
              </button>
            </div>
          </div>

          <p className="text-[16px] text-secondary mb-8">
            Hiển thị <span className="font-semibold text-primary">{filtered.length}</span> bất động sản
          </p>

          {filtered.length > 0 ? (
            layoutView === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((p) => (
                  <PropertyCard key={p.id} property={p} layout="grid" />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {filtered.map((p) => (
                  <PropertyCard key={p.id} property={p} layout="list" />
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
