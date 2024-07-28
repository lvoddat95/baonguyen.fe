import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CategoryState } from './product-category.reducer';

export const selectCategoryState = createFeatureSelector<CategoryState>('Category');

export const selectAllCategories = createSelector(
  selectCategoryState,
  (state: CategoryState) => state.Category
);

export const selectDataLoading = createSelector(
  selectCategoryState,
  (state: CategoryState) => state.loading
);

export const selectCategoryError = createSelector(
  selectCategoryState,
  (state: CategoryState) => state.error
);
