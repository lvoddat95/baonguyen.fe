import { createAction, props } from '@ngrx/store';
import { ProductModel } from './ecommerce_model';

// Product
export const fetchProductListData = createAction('[Data] Fetch ProductList');
export const fetchProductListSuccess = createAction('[Data] Fetch ProductList Success', props<{ Product: ProductModel[] }>());
export const fetchProductListFailure = createAction('[Data] Fetch ProductList Failure', props<{ error: string }>());

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
