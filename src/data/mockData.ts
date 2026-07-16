export interface Agent {
  name: string;
  phone: string;
  email: string;
  avatar: string;
}

export interface Property {
  id: string;
  title: string;
  type: 'sale' | 'rent';
  /** Alias for `type`, used by listing pages */
  category: 'sale' | 'rent';
  propertyType: 'apartment' | 'villa' | 'townhouse' | 'shophouse' | 'office' | 'room';
  location: string;
  city: 'HCM' | 'Hanoi' | 'Da Nang' | 'Lam Dong';
  district: string;
  price: string;
  priceVal: number; // in Billions (for sale) or Millions (for rent)
  beds: number;
  baths: number;
  area: number;
  tag: string;
  image: string;
  /** Optional gallery images; first element is the hero image */
  images?: string[];
  description: string;
  amenities: string[];
  agent: Agent;
}

export const mockProperties: Property[] = [
  {
    id: 'sale-1',
    title: 'Biệt thự Horizon Edge Thảo Điền',
    type: 'sale',
    category: 'sale',
    propertyType: 'villa',
    location: 'Khu biệt thự ven sông Thảo Điền, Quận 2, TP. Thủ Đức, TP.HCM',
    city: 'HCM',
    district: 'Quận 2',
    price: '45.000.000.000 VNĐ',
    priceVal: 45.0,
    beds: 4,
    baths: 5,
    area: 450,
    tag: 'Đang bán',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBS__XxHU16kawbgOpZ2yXkHbrZiqUD1p4L21Rz5lVtE1wbqEtBvca3WlCXHl95Iq-oua3GSxKA1ZOeb5Lhv-0zouc07_-Zkou-LgxMcoB6GJtXXAdJDHhB1B0koRtfWtAkNLjcn8GR4lrc1x9JYGk5Hpm5Yog7avzx648fCdvwGbqixhR4CWnYaqXkFLRRDe60F5D-8oRsaAtUfOzQxLFNQP6Ndo0fRl-Hx_5jLU3UGWtxlJxgraOLPpsRJbhe85gvG1jndRSmCdY',
    description: 'Tác phẩm kiến trúc tối giản đương đại tọa lạc tại vị trí đắc địa nhất Thảo Điền. Thiết kế chú trọng vào việc xóa nhòa ranh giới giữa không gian sống bên trong và thiên nhiên bên ngoài nhờ những vách kính lớn cao sát trần và hồ bơi vô cực rộng lớn phản chiếu nền trời xanh mát. Nội thất cao cấp nhập khẩu châu Âu tôn vinh phong cách sống tinh tế và sang trọng của gia chủ.',
    amenities: ['Hồ bơi', 'Sân vườn', 'Máy lạnh', 'Chỗ để xe', 'Ban công', 'Thang máy'],
    agent: {
      name: 'Nguyễn Văn An',
      phone: '0901 234 567',
      email: 'an.nguyen@yoedu.vn',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEk5ghH5yuPbMNJifO1OEz942t26Y2R2dCFEe3HHU4imetuzqOOJ4kv_vpgkqVDKM8jyeo1VyP5c6GB9f5TYQyzIKIV6jQeugqC5hlBWIcljhKc9EjslxPM65U0UdwTkFAxE4AHxQBUCd9otgVUUT0uP-snCNwLgF8hjxk9ahVANK4UitPFzS-ffeFeM2RZ1VDxGaQ9QbbHDHXE9Gy8Hb_NFZ7wN4V5VyjZSWwEwXFqFXTxLQcMRwyW5ZQhlkHcQjig_1sOWEJuI0'
    }
  },
  {
    id: 'sale-2',
    title: 'Căn hộ Penthouse Zenith Vinhomes',
    type: 'sale',
    category: 'sale',
    propertyType: 'apartment',
    location: 'Tòa Landmark 81, Vinhomes Central Park, Bình Thạnh, TP.HCM',
    city: 'HCM',
    district: 'Bình Thạnh',
    price: '28.500.000.000 VNĐ',
    priceVal: 28.5,
    beds: 3,
    baths: 3,
    area: 220,
    tag: 'Mới',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOlwsWyCQOGe7SWYWI381inGSSHYiIa3Z0j2oTu0YOIQqQePF1S-qtO_xP3OaQ3GDQzk_zN9Heg68fF_ZskIgWYQ_xY4OAuyT1XyVByb85xWfweguuZjdrHXcnGEgdH-qWLZIkMnIa6Jfv4sZQMNA-mup07_UFRH4NnBvpRsalFA9f4G1h2eqFXZc1UfYHuaRkDihnkrTJ9Wnp95FrvKQWJIUiE8x2HCPVOlvXx5tSnMiD7fen1JxDFnj36eiec_RaAGVyG7-DHKE',
    description: 'Penthouse tầng cao sở hữu tầm nhìn panorama triệu đô ôm trọn sông Sài Gòn và trung tâm thành phố. Thiết kế sang trọng với tông màu trung tính ấm áp và hệ trần cao thoáng đãng. Căn hộ mang đến trải nghiệm sống như một khu nghỉ dưỡng trên không giữa lòng đô thị năng động nhất Việt Nam.',
    amenities: ['Máy lạnh', 'Thang máy', 'Chỗ để xe', 'Ban công', 'Hồ bơi'],
    agent: {
      name: 'Nguyễn Văn An',
      phone: '0901 234 567',
      email: 'an.nguyen@yoedu.vn',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEk5ghH5yuPbMNJifO1OEz942t26Y2R2dCFEe3HHU4imetuzqOOJ4kv_vpgkqVDKM8jyeo1VyP5c6GB9f5TYQyzIKIV6jQeugqC5hlBWIcljhKc9EjslxPM65U0UdwTkFAxE4AHxQBUCd9otgVUUT0uP-snCNwLgF8hjxk9ahVANK4UitPFzS-ffeFeM2RZ1VDxGaQ9QbbHDHXE9Gy8Hb_NFZ7wN4V5VyjZSWwEwXFqFXTxLQcMRwyW5ZQhlkHcQjig_1sOWEJuI0'
    }
  },
  {
    id: 'sale-3',
    title: 'Nhà gỗ Modern Forest Bungalow Đà Lạt',
    type: 'sale',
    category: 'sale',
    propertyType: 'villa',
    location: 'Đường Khởi Nghĩa Bắc Sơn, Phường 10, Đà Lạt, Lâm Đồng',
    city: 'Lam Dong',
    district: 'Đà Lạt',
    price: '12.200.000.000 VNĐ',
    priceVal: 12.2,
    beds: 2,
    baths: 2,
    area: 180,
    tag: 'Nổi bật',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-VAFTlLgb_el4ocvGJDLPE3SjLXtPZxAA8_phinlJ5QzaD7pyjzBlcxvYdjf7YaKBb7ajl8v5C-mlwKjaEnTEYmHwjT7nvRalciq5Hl1y-uJjwDR_Pqr3KJZQ1qw1iVsWRschmco_J2aBrsCcWbQ1EfMdu_gs6dFpbOYiAngtztMzilVABWF5qhTZYw4tPwNRH8H5y0RvnlZE_CZhRgkOoVKaYLQK3B18DRo3ajJGg_HdDVxceQgXt5EQE080nDu1Hc_t9b_6USs',
    description: 'Ẩn mình giữa rừng thông thơ mộng của thành phố ngàn hoa, biệt thự nghỉ dưỡng mang hơi thở thô mộc brutalist pha lẫn sự ấm áp của các lam gỗ cedar tự nhiên. Ánh nắng ban mai len lỏi qua tán cây tạo nên những vệt bóng đổ nghệ thuật sinh động trên các bức tường bê tông trần, mang lại không gian sống bình yên, biệt lập.',
    amenities: ['Sân vườn', 'Chỗ để xe', 'Ban công', 'Máy lạnh'],
    agent: {
      name: 'Trần Thị Mai',
      phone: '0934 567 890',
      email: 'mai.tran@yoedu.vn',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDCPwoDVUhEMJpUAtfbEp_dBcK_1gMmj9vTylLzhHkHgD_cKhccHB9JEf23t2GFMU2olJr3Pwu62pDD8fAk38Ah8gqAhBXabOUjeD0WR5yUJGK1EI6vkFXxatYjmyUQEgIhqnf3wiJ47mssJWjbObo8i3w67zOmuoiG6k2F6Km1fZKeljqwKinTx7Zz68XaTkyI_aPQ1SQMX1KiXIv10L37KD8EYpxUhRHqw-y7RjBGh6bbh0zVLi2MH4rxamz7xZ9YQxaeNPxTalA'
    }
  },
  {
    id: 'sale-4',
    title: 'Shophouse mặt tiền Mỹ Khê Đà Nẵng',
    type: 'sale',
    category: 'sale',
    propertyType: 'shophouse',
    location: 'Đường Võ Nguyên Giáp, Phước Mỹ, Sơn Trà, Đà Nẵng',
    city: 'Da Nang',
    district: 'Ngũ Hành Sơn',
    price: '15.200.000.000 VNĐ',
    priceVal: 15.2,
    beds: 2,
    baths: 2,
    area: 90,
    tag: 'Shophouse',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKnaterexmp7v0a3FE4CPAJqlQK7NeHTZa1X0l5_rKRnQCIlY0BxbsKfs72yaeR0UfPvSJFfHD_el8wd8AGIfmq0O1-LaKp_GNZE3VvVM4F8-pWWx5bVuCEiyRKOoNYwNPJysjYV1PktgjTqlMKLZPI9O52ZdYIhjNS7NiQK6fqb1n_WDjFXUuSN2TeE4CiJlmqaRP6N5oURjdG1ZHtq2LyYpn4lgTh9CjINbOJkaidFP9M9mJi2gVDwmu6nHBTU5As11P7AEJUtI',
    description: 'Cơ hội kinh doanh tuyệt vời tại vị trí đắc địa nhất bên bãi biển Mỹ Khê danh tiếng. Kiến trúc mặt ngoài full kính kết hợp khung thép đen hiện đại mang lại hiệu quả trưng bày thương hiệu cao cấp tối ưu. Thích hợp mở boutique hotel, nhà hàng ẩm thực hoặc văn phòng đại diện sang trọng.',
    amenities: ['Máy lạnh', 'Thang máy', 'Chỗ để xe'],
    agent: {
      name: 'Trần Thị Mai',
      phone: '0934 567 890',
      email: 'mai.tran@yoedu.vn',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDCPwoDVUhEMJpUAtfbEp_dBcK_1gMmj9vTylLzhHkHgD_cKhccHB9JEf23t2GFMU2olJr3Pwu62pDD8fAk38Ah8gqAhBXabOUjeD0WR5yUJGK1EI6vkFXxatYjmyUQEgIhqnf3wiJ47mssJWjbObo8i3w67zOmuoiG6k2F6Km1fZKeljqwKinTx7Zz68XaTkyI_aPQ1SQMX1KiXIv10L37KD8EYpxUhRHqw-y7RjBGh6bbh0zVLi2MH4rxamz7xZ9YQxaeNPxTalA'
    }
  },
  {
    id: 'rent-1',
    title: 'Căn hộ Studio Vinhomes Central Park',
    type: 'rent',
    category: 'rent',
    propertyType: 'apartment',
    location: 'Tòa Park 3, Vinhomes Central Park, Bình Thạnh, TP.HCM',
    city: 'HCM',
    district: 'Bình Thạnh',
    price: '15 triệu/tháng',
    priceVal: 15.0,
    beds: 1,
    baths: 1,
    area: 45,
    tag: 'Cho thuê',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrQgoJm93UOFhMaYKyde6nzFL-dc0fmn9NoA-rUGl47Kf4FY8XUQ-ufz6sYqyjf0QxYOC8L3gDSkAHLl_vYWG35g_eGPsSpmRPL72UIp0up880ezvRwQIy6MmWZl2yilocCVNHOpeVZWR89OM-dULDVv1EXMELhrA85o3ugban5-kXvSYJdrwr2pLIMmWLfDg4_qZKPzMV-F5XdpRLvvSRKRn_daz9yQDvuHqUTnsenq0-2YhSFK3Q-SLU-J-qTZ3d54PSR0w8OKw',
    description: 'Căn hộ studio đẳng cấp sở hữu thiết kế nội thất hiện đại theo phong cách tối giản. Các vách kính lớn mang đến ánh sáng tự nhiên ngập tràn và tầm nhìn khoáng đạt. Căn hộ đã được trang bị đầy đủ nội thất cao cấp thông minh, tối ưu hóa không gian sử dụng cho cư dân năng động.',
    amenities: ['Máy lạnh', 'Thang máy', 'Chỗ để xe', 'Ban công', 'Hồ bơi'],
    agent: {
      name: 'Nguyễn Văn An',
      phone: '0901 234 567',
      email: 'an.nguyen@yoedu.vn',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEk5ghH5yuPbMNJifO1OEz942t26Y2R2dCFEe3HHU4imetuzqOOJ4kv_vpgkqVDKM8jyeo1VyP5c6GB9f5TYQyzIKIV6jQeugqC5hlBWIcljhKc9EjslxPM65U0UdwTkFAxE4AHxQBUCd9otgVUUT0uP-snCNwLgF8hjxk9ahVANK4UitPFzS-ffeFeM2RZ1VDxGaQ9QbbHDHXE9Gy8Hb_NFZ7wN4V5VyjZSWwEwXFqFXTxLQcMRwyW5ZQhlkHcQjig_1sOWEJuI0'
    }
  },
  {
    id: 'rent-2',
    title: 'Nhà nguyên căn mặt tiền Quận 1',
    type: 'rent',
    category: 'rent',
    propertyType: 'townhouse',
    location: 'Mặt tiền đường Nguyễn Trãi, Phường Bến Thành, Quận 1, TP.HCM',
    city: 'HCM',
    district: 'Quận 1',
    price: '45 triệu/tháng',
    priceVal: 45.0,
    beds: 3,
    baths: 4,
    area: 120,
    tag: 'Cho thuê',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDm0lfPptJ2ouz_RFsvdI0kbm5SAVbJvAOm_No428wH_X43NUSGFcp80uTldzvtr88GetqC40IfvVRAJOTPW6zSno7kEij3vx8f0BaFKaLLRN0OlqEGRknGaysC4aiyNs9KQkwqQflGfKwnKXV0ZYNYre3Ib9MHUghtOhj1ppw0OIitnptix7U4SjPJ2JR-MT5GvKkqTKfJHSiiZQe8x4PraNBaO_v4w7cEOsS_9Cdvp01m0CTCJSHKFuN7dLkyDzkBfcWsbab3448',
    description: 'Nhà phố nguyên căn sở hữu mặt tiền sáng thoáng tại trung tâm thương mại sầm uất nhất Quận 1. Kết cấu gồm trệt và 2 lầu đúc, mặt tiền full kính chịu lực, kiến trúc hiện đại vô cùng lý tưởng để mở showroom thời trang, mỹ phẩm, spa cao cấp hoặc chi nhánh ngân hàng.',
    amenities: ['Máy lạnh', 'Chỗ để xe', 'Ban công'],
    agent: {
      name: 'Nguyễn Văn An',
      phone: '0901 234 567',
      email: 'an.nguyen@yoedu.vn',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEk5ghH5yuPbMNJifO1OEz942t26Y2R2dCFEe3HHU4imetuzqOOJ4kv_vpgkqVDKM8jyeo1VyP5c6GB9f5TYQyzIKIV6jQeugqC5hlBWIcljhKc9EjslxPM65U0UdwTkFAxE4AHxQBUCd9otgVUUT0uP-snCNwLgF8hjxk9ahVANK4UitPFzS-ffeFeM2RZ1VDxGaQ9QbbHDHXE9Gy8Hb_NFZ7wN4V5VyjZSWwEwXFqFXTxLQcMRwyW5ZQhlkHcQjig_1sOWEJuI0'
    }
  },
  {
    id: 'rent-3',
    title: 'Căn hộ Horizon Tower view sông Quận 3',
    type: 'rent',
    category: 'rent',
    propertyType: 'apartment',
    location: 'Tòa tháp Horizon, Đường Trần Quang Khải, Quận 3, TP.HCM',
    city: 'HCM',
    district: 'Quận 3',
    price: '22 triệu/tháng',
    priceVal: 22.0,
    beds: 2,
    baths: 2,
    area: 85,
    tag: 'Cho thuê',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTf6B9eWAh4RLdNEDN_l7TX-3-gaDnU0Yf0DiJrJ4YCaWavBRwzZVScxTbE2XmfVJ9xqj_L_BdFT0jxXl8RQYImguLTRNxaRh1i4n78pmYvtGwj70bCgqL4CyrswTZkCGjAubdX2VUuzjC9XkdjF-vKFYGx-8yLowvCgdchJwXMYhg0gwNfBBihr4-fPgJJiGbTYBFyVzMTPn3B-x4AX5oigzWPlMYLbuXfigp5sP6eOgAjP5wc_0XJU0E_80k6RNSm77ABq_Zp-E',
    description: 'Căn hộ 2 phòng ngủ ấm cúng ngập tràn ánh sáng với ban công rộng mở ngắm toàn cảnh kênh Nhiêu Lộc xanh mát. Không gian bếp mở thanh lịch với đá cẩm thạch trắng sang trọng kết hợp các tủ bếp màu đen lì cao cấp. Thiết kế tối giản tinh tế đáp ứng trọn vẹn nhu cầu sinh hoạt hàng ngày.',
    amenities: ['Máy lạnh', 'Thang máy', 'Chỗ để xe', 'Ban công'],
    agent: {
      name: 'Trần Thị Mai',
      phone: '0934 567 890',
      email: 'mai.tran@yoedu.vn',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDCPwoDVUhEMJpUAtfbEp_dBcK_1gMmj9vTylLzhHkHgD_cKhccHB9JEf23t2GFMU2olJr3Pwu62pDD8fAk38Ah8gqAhBXabOUjeD0WR5yUJGK1EI6vkFXxatYjmyUQEgIhqnf3wiJ47mssJWjbObo8i3w67zOmuoiG6k2F6Km1fZKeljqwKinTx7Zz68XaTkyI_aPQ1SQMX1KiXIv10L37KD8EYpxUhRHqw-y7RjBGh6bbh0zVLi2MH4rxamz7xZ9YQxaeNPxTalA'
    }
  },
  {
    id: 'rent-4',
    title: 'Căn hộ Officetel Sunwah Pearl Bình Thạnh',
    type: 'rent',
    category: 'rent',
    propertyType: 'office',
    location: 'Tòa nhà Sunwah Pearl, Đường Nguyễn Hữu Cảnh, Bình Thạnh, TP.HCM',
    city: 'HCM',
    district: 'Bình Thạnh',
    price: '18 triệu/tháng',
    priceVal: 18.0,
    beds: 1,
    baths: 1,
    area: 55,
    tag: 'Cho thuê',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFmccOLKjM0gbqCYWMYkRSzJQF2TMG1Eu59Ll-jzyC6w4jMsQPzyUN2TKi_KAfBkIK2uEAynIPR7IqwpKvmmEF-S0_Oi3SZsfTmrjaMaviOFgbThUNb-qs7BOn451_HG-kiPitIian9r4aOyS6eGtOVLiqiopVf9Ibuf-eJP3qcAeJVPtKHElcgto_JoZlB00i0B-dTSotHnrz7NbcVbPIAoa3JI8tbN3pMsuTRqfwqK7p3bL_eyFpEGcnYo7l2ECJaFPjwoobftQ',
    description: 'Không gian đa năng Officetel đáp ứng tuyệt đối cả nhu cầu làm việc sáng tạo lẫn lưu trú sang trọng. Kết hợp hoàn hảo giữa văn phòng làm việc và nhà ở tiện nghi, Sunwah Pearl mang lại trải nghiệm sống năng động bậc nhất kế bên sông Sài Gòn thơ mộng.',
    amenities: ['Máy lạnh', 'Thang máy', 'Chỗ để xe', 'Ban công', 'Hồ bơi'],
    agent: {
      name: 'Nguyễn Văn An',
      phone: '0901 234 567',
      email: 'an.nguyen@yoedu.vn',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEk5ghH5yuPbMNJifO1OEz942t26Y2R2dCFEe3HHU4imetuzqOOJ4kv_vpgkqVDKM8jyeo1VyP5c6GB9f5TYQyzIKIV6jQeugqC5hlBWIcljhKc9EjslxPM65U0UdwTkFAxE4AHxQBUCd9otgVUUT0uP-snCNwLgF8hjxk9ahVANK4UitPFzS-ffeFeM2RZ1VDxGaQ9QbbHDHXE9Gy8Hb_NFZ7wN4V5VyjZSWwEwXFqFXTxLQcMRwyW5ZQhlkHcQjig_1sOWEJuI0'
    }
  },
  {
    id: 'rent-5',
    title: 'Căn hộ 3PN Midtown Phú Mỹ Hưng Quận 7',
    type: 'rent',
    category: 'rent',
    propertyType: 'apartment',
    location: 'Khu phức hợp Midtown, Phú Mỹ Hưng, Quận 7, TP.HCM',
    city: 'HCM',
    district: 'Quận 7',
    price: '35 triệu/tháng',
    priceVal: 35.0,
    beds: 3,
    baths: 3,
    area: 135,
    tag: 'Cho thuê',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmO7ZrHCNIId5fLIbUCr_wgyU8tsbG4qFZVpS5o2c3Xm_ukK6U96cyYDW9d1q2haGOWb12bnypKqRR_T52Leslvi5kZM5iR2UdbYndKjtpa_WIREPGBD0Ujhwf4T0I4BA1lz4YFREPnobD-lEukxlUIj0ViYJmjoprlRitQAH-7Dm6ezJD8mQafou1YMJS6zmIUv_CE3DgvaJVYHM2QqPBpOvamNzaWsGZUez4VTLJaNBwOfM0k25r4-1P_OyaUTMUIiUPx-DgYLI',
    description: 'Căn hộ cao cấp 3 phòng ngủ với ban công đón gió ngắm công viên hoa anh đào Sakura Park duy nhất tại Việt Nam. Không gian bếp hiện đại tinh tế, hệ thống giường nệm êm ái sang trọng, và nội thất đẳng cấp được chăm chút kỹ lưỡng mang lại sự tiện nghi cao nhất cho cả gia đình.',
    amenities: ['Máy lạnh', 'Thang máy', 'Chỗ để xe', 'Ban công', 'Hồ bơi', 'Sân vườn'],
    agent: {
      name: 'Nguyễn Văn An',
      phone: '0901 234 567',
      email: 'an.nguyen@yoedu.vn',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEk5ghH5yuPbMNJifO1OEz942t26Y2R2dCFEe3HHU4imetuzqOOJ4kv_vpgkqVDKM8jyeo1VyP5c6GB9f5TYQyzIKIV6jQeugqC5hlBWIcljhKc9EjslxPM65U0UdwTkFAxE4AHxQBUCd9otgVUUT0uP-snCNwLgF8hjxk9ahVANK4UitPFzS-ffeFeM2RZ1VDxGaQ9QbbHDHXE9Gy8Hb_NFZ7wN4V5VyjZSWwEwXFqFXTxLQcMRwyW5ZQhlkHcQjig_1sOWEJuI0'
    }
  },
  {
    id: 'rent-6',
    title: 'Phòng dịch vụ cao cấp Quận 10',
    type: 'rent',
    category: 'rent',
    propertyType: 'room',
    location: 'Đường Sư Vạn Hạnh, Phường 12, Quận 10, TP.HCM',
    city: 'HCM',
    district: 'Quận 10',
    price: '8.5 triệu/tháng',
    priceVal: 8.5,
    beds: 1,
    baths: 1,
    area: 30,
    tag: 'Cho thuê',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwYfRriEaO8pQIX3XUpBCnhgOwra7r4TM4gsF9gI5GxPa9sDB2vIqt1qWe6gVl4HNQzCBnDEQgxmUVe8kg_LHqE4eHhop9XJFd2eRWw5ID6rpZim1Kk1pWbfCqEbjK77EF4zkg2Zpmnvt8Mz2_yloOCOG35AX2OXDvrNMXgwCXK7WbZaVDfak-XpFalReabuia-dY4GeS2ekce4rO4yqO8uajQNFG07zNsV3XbgqHo8cHpJFNSezMi3W1g35lQ63NgVOssXgBzWtw',
    description: 'Căn hộ dịch vụ cao cấp full nội thất tọa lạc tại trung tâm Quận 10 sầm uất. Căn phòng yên tĩnh, được trang bị điều hòa, giường tủ cao cấp và khu giặt sấy khép kín, thích hợp cho nhân viên văn phòng hoặc sinh viên tìm kiếm sự tiện nghi và an ninh.',
    amenities: ['Máy lạnh', 'Chỗ để xe', 'Ban công', 'Thang máy'],
    agent: {
      name: 'Trần Thị Mai',
      phone: '0934 567 890',
      email: 'mai.tran@yoedu.vn',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDCPwoDVUhEMJpUAtfbEp_dBcK_1gMmj9vTylLzhHkHgD_cKhccHB9JEf23t2GFMU2olJr3Pwu62pDD8fAk38Ah8gqAhBXabOUjeD0WR5yUJGK1EI6vkFXxatYjmyUQEgIhqnf3wiJ47mssJWjbObo8i3w67zOmuoiG6k2F6Km1fZKeljqwKinTx7Zz68XaTkyI_aPQ1SQMX1KiXIv10L37KD8EYpxUhRHqw-y7RjBGh6bbh0zVLi2MH4rxamz7xZ9YQxaeNPxTalA'
    }
  }
];
