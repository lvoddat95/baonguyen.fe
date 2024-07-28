import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { catchError, map, mergeMap, tap } from "rxjs/operators";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { restApiService } from "src/app/core/services/rest-api.service";
import {
    deleteProduct,
    deleteProductFailure,
    deleteProductSuccess,
    fetchProductListData,
    fetchProductListFailure,
    fetchProductListSuccess,
} from "./ecommerce_action";

@Injectable()
export class EcommerceEffects {
    constructor(
        private actions$: Actions,
        private restApiService: restApiService
    ) { }

    // Product
    fetchProductData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchProductListData),
            mergeMap(() =>
                this.restApiService.getProductData().pipe(
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
                this.restApiService.deleteProductData(id).pipe(
                    map(() => deleteProductSuccess({ id })),
                    catchError((error) => of(deleteProductFailure({ error })))
                )
            )
        )
    );

}
