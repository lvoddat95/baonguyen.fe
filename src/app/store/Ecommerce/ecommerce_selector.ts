import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EcommerceState } from './ecommerce_reducer';

export const selectDataState = createFeatureSelector<EcommerceState>('Ecommerce');

export const selectProductData = createSelector(
    selectDataState,
    (state: EcommerceState) => state.Product
);

export const selectDataLoading = createSelector(
    selectDataState,
    (state: EcommerceState) => state.loading
);

export const selectDataError = createSelector(
    selectDataState,
    (state: EcommerceState) => state.error
);

