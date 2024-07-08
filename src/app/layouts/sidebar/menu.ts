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
    link: '/analytics',

    subItems: [
      {
        id: 3,
        label: 'Danh sách sản phẩm',
        link: '/ecommerce/products',
        parentId: 2
      },
      {
        id: 4,
        label: 'Thêm mới sản phẩm',
        link: '/ecommerce/add-product',
        parentId: 2
      },
      {
        id: 5,
        label: 'Danh mục sản phẩm',
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
    link: '/analytics',

    subItems: [
      {
        id: 7,
        label: 'Lịch sử đổi điểm',
        link: '/ecommerce/products',
        parentId: 6
      },
      {
        id: 8,
        label: 'Sinh nhật',
        link: '/ecommerce/products',
        parentId: 6
      },
    ]
  },
  
];
