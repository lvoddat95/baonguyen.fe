import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EcommerceState } from './ecommerce_reducer';

export const selectDataState = createFeatureSelector<EcommerceState>('Ecommerce');

export const selectProductData = createSelector(
    selectDataState,
    (state: EcommerceState) => state.Product
);

export const selectProductDetailData = createSelector(
    selectDataState,
    (state: EcommerceState) => state.ProductDetail
);

export const selectOrderData = createSelector(
    selectDataState,
    (state: EcommerceState) => state.Order
);

export const selectOrderDetailData = createSelector(
    selectDataState,
    (state: EcommerceState) => state.OrderDetail
);


export const selectDataLoading = createSelector(
    selectDataState,
    (state: EcommerceState) => state.loading
);

export const selectDataError = createSelector(
    selectDataState,
    (state: EcommerceState) => state.error
);

