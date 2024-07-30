export const GlobalComponent = {
    headerToken : {'Authorization': `Bearer ${sessionStorage.getItem('token')}`},

    // Api Calling
    API_URL : 'https://baonguyenbakery.io.vn/',
    // API_URL : 'https://localhost:7090',

    // Auth Api
    AUTH_API:"https://baonguyenbakery.io.vn/api/UserId/",
    
    // Products Api
    product:'GetProductByCondition',
    productInsert:'InsertProduct',
    productDelete:'RemoveProduct',

    // Category Api
    category:'GetProductMenu',
    categoryId:'apps/order/',

    // Customers Api
    customer:'customer',
    customerUpdateBonus:'BonusForUser',

    // Orders Api
    order:'GetOrderByUser',
    orderStatus:'UpdateStatusOrder',
}