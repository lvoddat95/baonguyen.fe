import { createReducer, on } from '@ngrx/store';
import { fetchCategoryListData, fetchCategoryListSuccess, fetchCategoryListFailure } from './product-category.action';
import { CategoryModel } from './product-category.model';

export interface CategoryState {
  Category: any;
  loading: boolean;
  error: any;
}

export const initialState: CategoryState = {
  Category: [],
  loading: false,
  error: null,
};

export const categoryReducer = createReducer(
  initialState,
  on(fetchCategoryListData, state => ({ ...state, loading: true, error: null })),
  on(fetchCategoryListSuccess, (state, { Category }) => ({ ...state, Category, loading: false })),
  on(fetchCategoryListFailure, (state, { error }) => ({ ...state, error, loading: false })),
);


