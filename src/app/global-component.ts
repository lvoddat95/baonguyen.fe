export const GlobalComponent = {
    // Api Calling
    API_URL : 'https://baonguyenbakery.io.vn/',
    headerToken : {'Authorization': `Bearer ${sessionStorage.getItem('token')}`},

    // Auth Api
    AUTH_API:"https://baonguyenbakery.io.vn/api/UserId/",
    // AUTH_API:"https://localhost:7090/api/UserId/",
    
    // Products Api
    product:'GetProductByCondition',
    productDelete:'apps/product/',

    // Category Api
    category:'GetProductMenu',
    categoryId:'apps/order/',

    // Customers Api
    customer:'apps/customer',
}