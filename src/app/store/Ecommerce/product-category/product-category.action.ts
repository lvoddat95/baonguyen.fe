import { createAction, props } from '@ngrx/store';
import { CategoryModel } from './product-category.model';

// Category
export const fetchCategoryListData = createAction('[Data] Fetch CategoryList');
export const fetchCategoryListSuccess = createAction('[Data] Fetch CategoryList Success', props<{ Category: [] }>());
export const fetchCategoryListFailure = createAction('[Data] Fetch CategoryList Failure', props<{ error: string }>());
