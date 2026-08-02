import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { SlidersHorizontal } from 'lucide-react';
import { getProvinces, getWardsByProvinceCode } from '@/lib/data/location';
import { getAmenities } from '@/lib/data/amenity';
import type { ListingFilters } from '@/lib/data/listing';
import { ICONS } from '@/lib/utils/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetTrigger,
} from '@/components/ui/sheet';

const ANY = 'any';
const COUNT_OPTIONS = [
  { value: ANY, label: 'Bất kỳ' },
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4+' },
];

interface QuickCountToggleProps {
  label: string;
  value?: number;
  onChange: (value: number | undefined) => void;
}

function QuickCountToggle({ label, value, onChange }: QuickCountToggleProps) {
  return (
    <div>
      <Label className="mb-2">{label}</Label>
      <ToggleGroup
        type="single"
        variant="outline"
        value={value ? String(value) : ANY}
        onValueChange={(v) => v && onChange(v === ANY ? undefined : Number(v))}
        className="w-full border border-outline-variant"
      >
        {COUNT_OPTIONS.map((o) => (
          <ToggleGroupItem key={o.value} value={o.value} className="flex-1 p-3">
            {o.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}

interface PropertyFilterPanelProps {
  filters: ListingFilters;
  onApply: (filters: ListingFilters) => void;
  activeCount: number;
}

export default function PropertyFilterPanel({ filters, onApply, activeCount }: PropertyFilterPanelProps) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<ListingFilters>(filters);

  const { data: provinces = [] } = useQuery({ queryKey: ['provinces'], queryFn: getProvinces });
  const { data: wards = [] } = useQuery({
    queryKey: ['wards', draft.provinceCode],
    queryFn: () => getWardsByProvinceCode(draft.provinceCode!),
    enabled: !!draft.provinceCode,
  });
  const { data: amenities = [] } = useQuery({ queryKey: ['amenities'], queryFn: getAmenities });

  const handleOpenChange = (next: boolean) => {
    if (next) setDraft(filters);
    setOpen(next);
  };

  const handleReset = () => setDraft({});

  const handleApply = () => {
    onApply(draft);
    setOpen(false);
  };

  const toggleAmenity = (id: number, checked: boolean) => {
    setDraft((prev) => {
      const current = prev.amenityIds ?? [];
      const next = checked ? [...current, id] : current.filter((a) => a !== id);
      return { ...prev, amenityIds: next.length ? next : undefined };
    });
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative">
          <SlidersHorizontal className="size-4" />
          Bộ lọc
          {activeCount > 0 && (
            <Badge className="absolute -top-2 -right-2 size-5 justify-center rounded-full p-0 bg-primary text-primary-foreground">
              {activeCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="bg-surface-container-lowest overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Bộ lọc tìm kiếm</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-6 px-4">
          {/* Price */}
          <div>
            <Label className="mb-2">Khoảng giá</Label>
            <div className="flex items-center gap-3">
              <Input
                type="number"
                inputMode="numeric"
                placeholder="Từ"
                value={draft.minPrice ?? ''}
                onChange={(e) =>
                  setDraft((p) => ({ ...p, minPrice: e.target.value ? Number(e.target.value) : undefined }))
                }
              />
              <span className="text-secondary">–</span>
              <Input
                type="number"
                inputMode="numeric"
                placeholder="Đến"
                value={draft.maxPrice ?? ''}
                onChange={(e) =>
                  setDraft((p) => ({ ...p, maxPrice: e.target.value ? Number(e.target.value) : undefined }))
                }
              />
            </div>
          </div>

          <Separator />

          {/* Area */}
          <div>
            <Label className="mb-2">Diện tích (m²)</Label>
            <div className="flex items-center gap-3">
              <Input
                type="number"
                inputMode="numeric"
                placeholder="Từ"
                value={draft.minArea ?? ''}
                onChange={(e) =>
                  setDraft((p) => ({ ...p, minArea: e.target.value ? Number(e.target.value) : undefined }))
                }
              />
              <span className="text-secondary">–</span>
              <Input
                type="number"
                inputMode="numeric"
                placeholder="Đến"
                value={draft.maxArea ?? ''}
                onChange={(e) =>
                  setDraft((p) => ({ ...p, maxArea: e.target.value ? Number(e.target.value) : undefined }))
                }
              />
            </div>
          </div>

          <Separator />

          {/* Bedrooms / bathrooms */}
          <QuickCountToggle
            label="Phòng ngủ"
            value={draft.minBedrooms}
            onChange={(v) => setDraft((p) => ({ ...p, minBedrooms: v }))}
          />
          <QuickCountToggle
            label="Phòng tắm"
            value={draft.minBathrooms}
            onChange={(v) => setDraft((p) => ({ ...p, minBathrooms: v }))}
          />

          <Separator />

          {/* Location */}
          <div>
            <Label className="mb-2">Tỉnh/Thành phố</Label>
            <Select
              value={draft.provinceCode ?? ANY}
              onValueChange={(v) =>
                setDraft((p) => ({ ...p, provinceCode: v === ANY ? undefined : v, wardCode: undefined }))
              }
            >
              <SelectTrigger className="w-full bg-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ANY}>Tất cả tỉnh/thành</SelectItem>
                {provinces.map((p) => (
                  <SelectItem key={p.code} value={p.code!}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="mb-2">Phường/Xã</Label>
            <Select
              value={draft.wardCode ?? ANY}
              onValueChange={(v) => setDraft((p) => ({ ...p, wardCode: v === ANY ? undefined : v }))}
              disabled={!draft.provinceCode}
            >
              <SelectTrigger className="w-full bg-white">
                <SelectValue placeholder={!draft.provinceCode ? 'Chọn tỉnh/thành trước' : undefined} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ANY}>Tất cả phường/xã</SelectItem>
                {wards.map((w) => (
                  <SelectItem key={w.code} value={w.code!}>
                    {w.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* Amenities */}
          <div>
            <Label className="mb-3">Tiện ích</Label>
            <div className="flex flex-col gap-3">
              {amenities.map((a) => {
                const id = Number(a.id);
                const checked = draft.amenityIds?.includes(id) ?? false;
                const Icon = (a.icon && ICONS[a.icon]) || ICONS.check_circle;
                return (
                  <label key={a.id} className="flex items-center gap-3 cursor-pointer">
                    <Checkbox
                      checked={checked}
                      onCheckedChange={(c) => toggleAmenity(id, c === true)}
                    />
                    <Icon className="size-4 text-secondary" />
                    <span className="text-[14px] text-on-surface">{a.name}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        <SheetFooter className="flex-row gap-3">
          <Button variant="outline" className="flex-1" onClick={handleReset}>
            Đặt lại
          </Button>
          <Button className="flex-1" onClick={handleApply}>
            Áp dụng bộ lọc
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
