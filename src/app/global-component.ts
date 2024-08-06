// Api Calling
// const API_URL = 'https://baonguyenbakery.io.vn/';
// const API_USERID_URL = 'https://baonguyenbakery.io.vn/api/UserId/';
const API_URL = 'https://localhost:7090/';
const API_USERID_URL = 'https://localhost:7090/api/UserId/';

export const GlobalComponent = {
    headerToken: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` },

    // Auth Api
    AUTH_API: API_URL + "api/UserId/",

    // Upload file
    upload: API_URL + "Upload",

    startUp: API_URL + 'StartUp',

    // Products Api
    product: API_URL + 'GetProductByCondition',
    productInsert: API_URL + 'InsertProduct',
    productDelete: API_URL + 'RemoveProduct',
    productDetail: API_URL + 'GetProductById',

    // Category Api
    category: API_URL + 'GetProductMenu',
    categoryLv2: API_URL + 'GetProductMenuLV2',
    categoryInsert: API_URL + 'InsertProductMenu',
    categoryLV2Insert: API_URL + 'InsertProductMenuLV2',
    categoryDelete: API_URL + 'DeleteProductMenu',

    // Customers Api
    customer: API_URL + 'customer',
    customerUpdateBonus: API_USERID_URL + 'BonusForUser',
    birthday: API_USERID_URL + 'GetBirthday',

    // Orders Api
    order: API_URL + 'GetOrderByUser',
    orderDetail: API_URL + 'GetOrderDetail',
    orderStatus: API_URL + 'UpdateStatusOrder',


    // Settings Api
    
    video: API_URL + 'GetVideoList',
    videoInsert: API_URL + 'InsertVideo',
    videoDelete: API_URL + 'DeleteVideo',

    recommend: API_URL + 'StartUp',
    recommendInsert: API_URL + 'InsertRecommend',
    recommendDelete: API_URL + 'DeleteRecommend',

    banner: API_URL + 'StartUp',
    bannerInsert: API_URL + 'InsertBanner',
    bannerDelete: API_URL + 'DeleteBanner',
}