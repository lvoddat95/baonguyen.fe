const productAvailable = [
    {
        ma: true,
        ten: 'Hiện',
    },
    {
        ma: false,
        ten: 'Ẩn',
    },
];

const productCategory = [
    {
        ma: 'BANH',
        ten: 'Bánh',
    },
    {
        ma: 'AN_VAT',
        ten: 'Ăn vặt',
    }, {
        ma: 'PHU_KIEN',
        ten: 'Phụ kiện',
    },
];

const orderStatus = [
    {
        ma: 'DD',
        ten: 'Đã đặt hàng',
        icon: 'ri-shopping-bag-3-line'
    },
    {
        ma: 'XN',
        ten: 'Đã xác nhận',
        icon: 'ri-checkbox-circle-line'
    },
    {
        ma: 'HT',
        ten: 'Hoàn thành',
        icon: 'ri-flag-line'
    },
    {
        ma: 'DS',
        ten: 'Đã ship',
        icon: 'ri-truck-line'
    },
    {
        ma: 'HUY',
        ten: 'Hủy đơn hàng',
        icon: 'ri-close-circle-line'
    },
];

export { orderStatus, productAvailable, productCategory }