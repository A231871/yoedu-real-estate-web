import {
  Bed,
  ShowerHead,
  Ruler,
  Layers,
  CircleCheck,
  Waves,
  CarFront,
  ShieldCheck,
  Trees,
  Snowflake,
  Building2,
  ArrowUpDown,
  BadgeCheck,
  Headset,
  Eye,
  type LucideIcon,
} from 'lucide-react';

/**
 * Maps the icon-name strings still carried as data (property amenities from
 * the API, the hardcoded WHY_US list) to their lucide-react component.
 * These names originated as Material Symbols ligature names and are kept
 * as-is at the data layer to avoid touching API/data shapes.
 */
export const ICONS: Record<string, LucideIcon> = {
  bed: Bed,
  shower: ShowerHead,
  square_foot: Ruler,
  layers: Layers,
  check_circle: CircleCheck,
  pool: Waves,
  garage: CarFront,
  security: ShieldCheck,
  yard: Trees,
  ac_unit: Snowflake,
  balcony: Building2,
  elevator: ArrowUpDown,
  verified: BadgeCheck,
  support_agent: Headset,
  visibility: Eye,
};
