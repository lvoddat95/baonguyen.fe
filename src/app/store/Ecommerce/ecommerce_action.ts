import { createAction, props } from '@ngrx/store';
import { ProductModel, ProductDetailModel, OrderModel, OrderDetailModel } from './ecommerce_model';

// Product
export const fetchProductListData = createAction('[Data] Fetch ProductList', props<{ phan_loai: string, id_product: number, gia: string, ma_cap_2: string }>());
export const fetchProductListSuccess = createAction('[Data] Fetch ProductList Success', props<{ Product: ProductModel[] }>());
export const fetchProductListFailure = createAction('[Data] Fetch ProductList Failure', props<{ error: string }>());
// Product Detail
export const fetchProductDetailData = createAction('[Data] Fetch ProductDetail', props<{ id_product: number }>());
export const fetchProductDetailSuccess = createAction('[Data] Fetch ProductDetail Success', props<{ ProductDetail: ProductDetailModel[] }>());
export const fetchProductDetailFailure = createAction('[Data] Fetch ProductDetail Failure', props<{ error: string }>());

// Order
export const fetchOrderListData = createAction('[Data] Fetch OrderList', props<{ userid: number, role: string }>());
export const fetchOrderListSuccess = createAction('[Data] Fetch OrderList Success', props<{ Order: OrderModel[] }>());
export const fetchOrderListFailure = createAction('[Data] Fetch OrderList Failure', props<{ error: string }>());
// Order Detail
export const fetchOrderDetailData = createAction('[Data] Fetch OrderDetail', props<{ id_don: number }>());
export const fetchOrderDetailSuccess = createAction('[Data] Fetch OrderDetail Success', props<{ OrderDetail: OrderDetailModel[] }>());
export const fetchOrderDetailFailure = createAction('[Data] Fetch OrderDetail Failure', props<{ error: string }>());


// Delete Product Data
export const deleteProduct = createAction(
    '[Data] Delete Product',
    props<{ id: string }>()
);
export const deleteProductSuccess = createAction(
    '[Data] Delete Product Success',
    props<{ id: string }>()
);
export const deleteProductFailure = createAction(
    '[Data] Delete Product Failure',
    props<{ error: string }>()
);


// Update Order Status
export const updateOrderStatus = createAction(
    '[Data] Update Order Status',
    props<{ id_don: number, status: string, user_id: number }>()
);
export const updateOrderStatusSuccess = createAction(
    '[Data] Update Order Status Success',
    props<{ id_don: number, status: string, user_id: number }>()
);

export const updateOrderStatusFailure = createAction(
    '[Data] Update Order Status Failure',
    props<{ error: string }>()
);