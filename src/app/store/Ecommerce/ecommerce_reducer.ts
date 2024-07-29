import { Action, createReducer, on } from "@ngrx/store";
import {
  fetchProductListData,
  fetchProductListSuccess,
  fetchProductListFailure,
  deleteProductSuccess,

  fetchOrderListData,
  fetchOrderListSuccess,
  fetchOrderListFailure,
  updateOrderStatus,
  updateOrderStatusSuccess,
  updateOrderStatusFailure,
} from "./ecommerce_action";

export interface EcommerceState {
  Product: any[];
  Order: any[];
  loading: boolean;
  error: any;
}

export const initialState: EcommerceState = {
  Product: [],
  Order: [],
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


  // Order
  on(fetchOrderListData, (state) => {
    return { ...state, loading: true, error: null };
  }),
  on(fetchOrderListSuccess, (state, { Order }) => {
    return { ...state, Order, loading: false };
  }),
  on(fetchOrderListFailure, (state, { error }) => {
    return { ...state, error, loading: false };
  }),


 on(updateOrderStatus, (state) => ({
    ...state,
    updatingOrderStatus: true,
    updateOrderStatusError: null,
  })),
  on(updateOrderStatusSuccess, (state) => ({
    ...state,
    updatingOrderStatus: false,
    updateOrderStatusError: null,
  })),
  on(updateOrderStatusFailure, (state, { error }) => ({
    ...state,
    updatingOrderStatus: false,
    updateOrderStatusError: error,
  })),


);

// Selector
export function reducer(state: EcommerceState | undefined, action: Action) {
  return ecommercerReducer(state, action);
}
