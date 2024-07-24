import { Injectable } from "@angular/core";

import { of } from "rxjs";
import { catchError, map, mergeMap, tap } from "rxjs/operators";

import { Actions, createEffect, ofType } from "@ngrx/effects";

import { restApiService } from "src/app/core/services/rest-api.service";
import {
    addCategory,
    addCategoryFailure,
    addCategorySuccess,
    deleteCategory,
    deleteCategoryFailure,
    deleteCategorySuccess,
    deleteProduct,
    deleteProductFailure,
    deleteProductSuccess,
    fetchProductListData,
    fetchProductListFailure,
    fetchProductListSuccess,
    fetchCategoryListData,
    fetchCategoryListFailure,
    fetchCategoryListSuccess,
    updateCategory,
    updateCategoryFailure,
    updateCategorySuccess,
} from "./ecommerce_action";

@Injectable()
export class EcommerceEffects {
    // Product
    fetchProductData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchProductListData),
            mergeMap(() =>
                this.restApiService.getData().pipe(
                    map((product) => {
                        const Product = product.data;
                        return fetchProductListSuccess({ Product });
                    }),
                    catchError((error) => of(fetchProductListFailure({ error })))
                )
            )
        )
    );

    deleteProductData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteProduct),
            mergeMap(({ id }) =>
                this.restApiService.deleteData(id).pipe(
                    map(() => deleteProductSuccess({ id })),
                    catchError((error) => of(deleteProductFailure({ error })))
                )
            )
        )
    );

    // Category
    fetchCategoryData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchCategoryListData),
            mergeMap(() =>
                this.restApiService.getCategoryData().pipe(
                    map((category) => {
                        const Category = JSON.parse(category).data;
                        return fetchCategoryListSuccess({ Category });
                    }),
                    catchError((error) => of(fetchCategoryListFailure({ error })))
                )
            )
        )
    );

    addCategoryData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addCategory),
            mergeMap(({ newData }) =>
                this.restApiService.postCategoryData(newData).pipe(
                    map((responseData) =>
                        addCategorySuccess({ newData: responseData.data })
                    ),
                    catchError((error) => of(addCategoryFailure({ error })))
                )
            )
        )
    );

    updateCategoryData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateCategory),
            mergeMap(({ updatedData }) =>
                this.restApiService.patchCategoryData(updatedData).pipe(
                    map((responseData) =>
                        updateCategorySuccess({ updatedData: responseData.data })
                    ),
                    catchError((error) => of(addCategoryFailure({ error })))
                )
            )
        )
    );

    deleteCategoryData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteCategory),
            mergeMap(({ id }) =>
                this.restApiService.deleteCategory(id).pipe(
                    map(() => deleteCategorySuccess({ id })),
                    catchError((error) => of(deleteCategoryFailure({ error })))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private restApiService: restApiService
    ) { }
}
