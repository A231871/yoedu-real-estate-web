import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { MapPin, House, Banknote } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PropertyCard from '@/components/card/PropertyCard';
import { getListingSummaries } from '@/lib/data/listing';
import { getProvinces } from '@/lib/data/location';
import { getPropertyTypes } from '@/lib/data/property-type';
import { ListingSummaryResponseListingTypeEnum } from '@/api/openapi-generated';
import { ICONS } from '@/lib/utils/icons';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Combobox } from '@/components/ui/combobox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const HERO_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbC-yD8HsiROnP4hX1qac4cfAtbsxH-DsSA_9KmfwT5d8crmRc3j5iIIL8dMMevjsjVgqHECfPfCqnE4X9mN59UocsB4T4JpC4daaCLkzXOn933nik8Av-ByXf1CmZEdes3PECiI3koaBbkxaIcyzpPEg2Qk0Ol64UoM1LqkpXU4-0GkGbcIfdJGeZurfnCnK7KsH3J1mlv5aseqXuOOpqLyIagTaC_SqMkZ6j6XvzZUMf12vPrqLf8-ZUmR23vJA0gzvl4XXPQEg';

const WHY_US = [
  {
    icon: 'verified',
    title: 'Tài sản chọn lọc',
    desc: 'Chúng tôi chỉ cung cấp những bất động sản đã qua kiểm định khắt khe về pháp lý và kiến trúc, đảm bảo giá trị bền vững.',
  },
  {
    icon: 'support_agent',
    title: 'Chuyên gia tận tâm',
    desc: 'Đội ngũ cố vấn của chúng tôi có am hiểu sâu sắc về thị trường cao cấp, sẵn sàng đồng hành cùng bạn trong mọi quyết định.',
  },
  {
    icon: 'visibility',
    title: 'Minh bạch tuyệt đối',
    desc: 'Quy trình giao dịch minh bạch, thông tin chính xác 100% giúp khách hàng hoàn toàn an tâm khi đầu tư.',
  },
];

export default function Home() {
  const navigate = useNavigate();
  const [provinceCode, setProvinceCode] = useState('');
  const [propertyTypeId, setPropertyTypeId] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const {
    data: listings = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['listings', ListingSummaryResponseListingTypeEnum.ForSale],
    queryFn: () =>
      getListingSummaries(ListingSummaryResponseListingTypeEnum.ForSale),
  });

  const { data: provinces = [] } = useQuery({ queryKey: ['provinces'], queryFn: getProvinces });
  const { data: propertyTypes = [] } = useQuery({
    queryKey: ['propertyTypes'],
    queryFn: getPropertyTypes,
  });

  const featured = listings.slice(0, 3);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (provinceCode) params.set('provinceCode', provinceCode);
    if (propertyTypeId) params.set('propertyTypeId', propertyTypeId);
    if (minPrice) params.set('minPrice', minPrice);
    if (maxPrice) params.set('maxPrice', maxPrice);
    const qs = params.toString();
    navigate(qs ? `/ban?${qs}` : '/ban');
  };

  return (
    <>
      <Header />
      <main className="pt-24">
        {/* ── Hero ── */}
        <section className="relative h-[85vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url('${HERO_IMG}')` }}
            />
            <div className="absolute inset-0 bg-black/35" />
          </div>

          <div className="relative z-10 max-w-[1280px] mx-auto px-5 md:px-16 w-full">
            <div className="max-w-3xl">
              <h1 className="text-[40px] md:text-[64px] font-semibold leading-[1.1] md:leading-[1.1] tracking-[-0.02em] text-white mb-8">
                Tìm ngôi nhà mơ ước của bạn tại Yoedu Property
              </h1>

              {/* Search Box */}
              <form
                onSubmit={handleSearch}
                className="bg-white p-2 flex flex-col md:flex-row gap-0 shadow-2xl"
              >
                <div className="flex-1 flex items-center px-4 border-b md:border-b-0 md:border-r border-outline-variant py-1 gap-3">
                  <MapPin className="size-[18px] text-secondary shrink-0" />
                  <Combobox
                    value={provinceCode}
                    onValueChange={setProvinceCode}
                    options={provinces.map((p) => ({ value: p.code!, label: p.name! }))}
                    placeholder="Chọn địa điểm"
                    searchPlaceholder="Nhập địa điểm"
                    emptyText="Không tìm thấy địa điểm"
                    className="text-[16px] text-on-surface"
                  />
                </div>
                <div className="flex-1 flex items-center px-4 border-b md:border-b-0 md:border-r border-outline-variant py-1 gap-3">
                  <House className="size-[18px] text-secondary shrink-0" />
                  <Select value={propertyTypeId} onValueChange={setPropertyTypeId}>
                    <SelectTrigger className="w-full border-none p-0 h-auto shadow-none text-[16px] text-on-surface">
                      <SelectValue placeholder="Loại nhà" />
                    </SelectTrigger>
                    <SelectContent>
                      {propertyTypes.map((pt) => (
                        <SelectItem key={pt.id} value={pt.id!}>
                          {pt.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1 flex items-center px-4 py-1 gap-3">
                  <Banknote className="size-[18px] text-secondary shrink-0" />
                  <div className="flex items-center gap-2 w-full">
                    <Input
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      className="w-full border-none p-0 h-auto shadow-none focus-visible:border-none text-[16px] text-on-surface bg-transparent"
                      placeholder="Giá từ"
                      type="number"
                      inputMode="numeric"
                    />
                    <span className="text-secondary shrink-0">–</span>
                    <Input
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className="w-full border-none p-0 h-auto shadow-none focus-visible:border-none text-[16px] text-on-surface bg-transparent"
                      placeholder="Giá đến"
                      type="number"
                      inputMode="numeric"
                    />
                  </div>
                </div>
                <Button type="submit" size="lg" className="whitespace-nowrap">
                  Tìm kiếm
                </Button>
              </form>
            </div>
          </div>
        </section>

        {/* ── Featured Properties ── */}
        <section className="py-24 max-w-[1280px] mx-auto px-5 md:px-16">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="text-[12px] leading-[1] font-semibold tracking-[0.2em] text-secondary uppercase mb-4 block">
                Bộ sưu tập cao cấp
              </span>
              <h2 className="text-[32px] md:text-[48px] font-medium leading-[1.3] tracking-[-0.01em] text-primary">
                Nhà đất nổi bật
              </h2>
            </div>
          </div>
          {isLoading ? (
            <div className="py-20 text-center text-secondary text-[20px]">
              Đang tải...
            </div>
          ) : isError ? (
            <div className="py-20 text-center text-error text-[20px]">
              Không thể tải danh sách bất động sản
            </div>
          ) : featured.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featured.map((p) => (
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
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center text-secondary text-[20px]">
              Chưa có bất động sản nào
            </div>
          )}
        </section>

        {/* ── Why Us ── */}
        <section className="py-24 bg-surface-container-low">
          <div className="max-w-[1280px] mx-auto px-5 md:px-16">
            <div className="text-center max-w-2xl mx-auto mb-20">
              <span className="text-[12px] leading-[1] font-semibold tracking-[0.2em] text-secondary uppercase mb-4 block">
                Giá trị cốt lõi
              </span>
              <h2 className="text-[40px] md:text-[48px] font-medium leading-[1.3] tracking-[-0.01em] text-primary">
                Tại sao chọn chúng tôi
              </h2>
              <div className="w-20 h-1 bg-primary mx-auto mt-8" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              {WHY_US.map((item) => {
                const Icon = ICONS[item.icon];
                return (
                  <div key={item.icon} className="text-center group">
                    <div className="w-16 h-16 bg-white border border-outline-variant flex items-center justify-center mx-auto mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                      <Icon className="size-[30px]" />
                    </div>
                    <h4 className="text-[24px] leading-[1.4] font-medium text-primary mb-4">
                      {item.title}
                    </h4>
                    <p className="text-[16px] leading-[1.6] text-secondary">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
