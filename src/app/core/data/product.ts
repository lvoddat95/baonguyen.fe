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

export { orderStatus, productAvailable }