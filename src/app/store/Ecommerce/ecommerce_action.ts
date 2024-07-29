import { createAction, props } from '@ngrx/store';
import { ProductModel, OrdersModel } from './ecommerce_model';

// Product
export const fetchProductListData = createAction('[Data] Fetch ProductList');
export const fetchProductListSuccess = createAction('[Data] Fetch ProductList Success', props<{ Product: ProductModel[] }>());
export const fetchProductListFailure = createAction('[Data] Fetch ProductList Failure', props<{ error: string }>());

// Order
export const fetchOrderListData = createAction('[Data] Fetch OrderList', props<{ userid: number, role: string }>());
export const fetchOrderListSuccess = createAction('[Data] Fetch OrderList Success', props<{ Order: OrdersModel[] }>());
export const fetchOrderListFailure = createAction('[Data] Fetch OrderList Failure', props<{ error: string }>());

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