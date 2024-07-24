import { Action, createReducer, on } from "@ngrx/store";
import {
  addCategorySuccess,
  deleteCategorySuccess,
  deleteProductSuccess,
  fetchProductListData,
  fetchProductListFailure,
  fetchProductListSuccess,
  fetchCategoryListData,
  fetchCategoryListFailure,
  fetchCategoryListSuccess,
} from "./ecommerce_action";

export interface EcommerceState {
  Product: any[];
  Category: any[];
  loading: boolean;
  error: any;
}

export const initialState: EcommerceState = {
  Product: [],
  Category: [],
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

  // Category
  on(fetchCategoryListData, (state) => {
    return { ...state, loading: true, error: null };
  }),
  on(fetchCategoryListSuccess, (state, { Category }) => {
    return { ...state, Category, loading: false };
  }),
  on(fetchCategoryListFailure, (state, { error }) => {
    return { ...state, error, loading: false };
  }),

);

// Selector
export function reducer(state: EcommerceState | undefined, action: Action) {
  return ecommercerReducer(state, action);
}
