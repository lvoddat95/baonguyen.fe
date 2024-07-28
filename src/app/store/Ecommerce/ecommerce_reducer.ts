import { Action, createReducer, on } from "@ngrx/store";
import {
  fetchProductListData,
  fetchProductListFailure,
  fetchProductListSuccess,
  deleteProductSuccess,
} from "./ecommerce_action";

export interface EcommerceState {
  Product: any[];
  loading: boolean;
  error: any;
}

export const initialState: EcommerceState = {
  Product: [],
  loading: false,
  error: null,
};

export const ecommercerReducer = createReducer(
  initialState,
  // Product
  on(fetchProductListData, (state) => {
    return { ...state, loading: true, error: null };
  }),
  on(fetchProductListSuccess, (state, { Product }) => {
    return { ...state, Product, loading: false };
  }),
  on(fetchProductListFailure, (state, { error }) => {
    return { ...state, error, loading: false };
  }),
  on(deleteProductSuccess, (state, { id }) => {
    const updatedProduct = state.Product.filter(
      (product) => !id.includes(product._id)
    );
    return { ...state, Product: updatedProduct, error: null };
  }),

);

// Selector
export function reducer(state: EcommerceState | undefined, action: Action) {
  return ecommercerReducer(state, action);
}
