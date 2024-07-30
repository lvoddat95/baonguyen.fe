import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: 'Danh sách menu',
    isTitle: true
  },
  {
    id: 2,
    label: 'Sản phẩm',
    icon: ' ri-product-hunt-line',
    isCollapsed: true,
    link: '/',

    subItems: [
      {
        id: 3,
        label: 'Tất cả sản phẩm',
        link: '/ecommerce/products',
        parentId: 2
      },
      {
        id: 4,
        label: 'Đơn hàng',
        link: '/ecommerce/orders',
        parentId: 2
      },
      {
        id: 5,
        label: 'Danh mục',
        link: '/ecommerce/product-category',
        parentId: 2
      },
    ]
  },
  {
    id: 6,
    label: 'Khách hàng',
    icon: '  ri-gift-line',
    isCollapsed: true,
    link: '/',

    subItems: [
      {
        id: 7,
        label: 'Cộng điểm',
        link: '/customer/bonus',
        parentId: 6
      },
      {
        id: 8,
        label: 'Sinh nhật',
        link: '/customer/birthday',
        parentId: 6
      },
    ]
  },
  {
    id: 9,
    label: 'Cấu hình',
    icon: ' ri-settings-4-line',
    isCollapsed: true,
    link: '/',

    subItems: [
      {
        id: 10,
        label: 'Quản lý thông báo',
        link: '/setting/notification',
        parentId: 9
      },
      {
        id: 11,
        label: 'Gợi ý',
        link: '/setting/tips',
        parentId: 9
      },
      {
        id: 12,
        label: 'Videos',
        link: '/setting/videos',
        parentId: 9
      },
      {
        id: 13,
        label: 'Gifts',
        link: '/setting/gifts',
        parentId: 9
      },
    ]
  },
  
];
