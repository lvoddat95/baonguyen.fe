import { createAction, props } from '@ngrx/store';
import { CartModel, categoryModel, customerModel, productModel, sellerModel } from './ecommerce_model';

// Product
export const fetchProductListData = createAction('[Data] Fetch ProductList');
export const fetchProductListSuccess = createAction('[Data] Fetch ProductList Success',props<{ Product: productModel[] }>());
export const fetchProductListFailure = createAction('[Data] Fetch ProductList Failure', props<{ error: string }>());

// Category
export const fetchCategoryListData = createAction('[Data] Fetch CategoryList');
export const fetchCategoryListSuccess = createAction('[Data] Fetch CategoryList Success',props<{ Category: categoryModel[] }>());
export const fetchCategoryListFailure = createAction('[Data] Fetch CategoryList Failure', props<{ error: string }>());


// Add Data
export const addCategory = createAction(
    '[Data] Add Category',
    props<{ newData: categoryModel }>()
);
export const addCategorySuccess = createAction(
    '[Data] Add Category Success',
    props<{ newData: categoryModel }>()
);
export const addCategoryFailure = createAction(
    '[Data] Add Category Failure',
    props<{ error: string }>()
);

// Update Data
export const updateCategory = createAction(
    '[Data] Update Category',
    props<{ updatedData: categoryModel }>()
);
export const updateCategorySuccess = createAction(
    '[Data] Update Category Success',
    props<{ updatedData: categoryModel }>()
);
export const updateCategoryFailure = createAction(
    '[Data] Update Category Failure',
    props<{ error: string }>()
);


// Delete Category Data
export const deleteCategory = createAction(
    '[Data] Delete Category',
    props<{ id: string }>()
);
export const deleteCategorySuccess = createAction(
    '[Data] Delete Category Success',
    props<{ id: string }>()
);
export const deleteCategoryFailure = createAction(
    '[Data] Delete Category Failure',
    props<{ error: string }>()
);

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
