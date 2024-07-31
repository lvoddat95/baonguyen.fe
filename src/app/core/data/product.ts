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
    },
    {
        ma: 'XN',
        ten: 'Đã xác nhận',
    },
    {
        ma: 'HT',
        ten: 'Hoàn thành',
    },
    {
        ma: 'DS',
        ten: 'Đã ship',
    },
    {
        ma: 'HUY',
        ten: 'Hủy đơn hàng',
    },
];

export { orderStatus, productAvailable, productCategory }