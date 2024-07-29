import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { catchError, map, mergeMap, switchMap, tap } from "rxjs/operators";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { restApiService } from "src/app/core/services/rest-api.service";
import {
    deleteProduct,
    deleteProductFailure,
    deleteProductSuccess,
    fetchProductListData,
    fetchProductListSuccess,
    fetchProductListFailure,

    fetchOrderListData,
    fetchOrderListSuccess,
    fetchOrderListFailure,
    updateOrderStatus,
    updateOrderStatusSuccess,
    updateOrderStatusFailure,
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


    // Order

    fetchOrderData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchOrderListData),
            mergeMap((action) =>
                this.restApiService.getOrderData(action.userid, action.role).pipe(
                    map((orders) => {
                        const Order = orders.data;
                        return fetchOrderListSuccess({ Order });
                    }),
                    catchError((error) =>
                        of(fetchOrderListFailure({ error }))
                    )
                )
            ),
        ),
    );

    updateOrderStatus$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateOrderStatus),
            switchMap(({ id_don, status, user_id }) =>
                this.restApiService.updateOrderStatus(id_don, status, user_id).pipe(
                    map(() => updateOrderStatusSuccess({ id_don, status, user_id })),
                    catchError((error) => of(updateOrderStatusFailure({ error: error.message })))
                )
            )
        )
    );


}
