import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { catchError, map, mergeMap, switchMap, tap } from "rxjs/operators";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { RestApiService } from "src/app/core/services/rest-api.service";
import {
    deleteProduct,
    deleteProductFailure,
    deleteProductSuccess,

    fetchProductListData,
    fetchProductListSuccess,
    fetchProductListFailure,

    fetchProductDetailData,
    fetchProductDetailSuccess,
    fetchProductDetailFailure,

    fetchOrderListData,
    fetchOrderListSuccess,
    fetchOrderListFailure,

    fetchOrderDetailData,
    fetchOrderDetailSuccess,
    fetchOrderDetailFailure,

    updateOrderStatusFailure,
    updateOrderStatus,
    updateOrderStatusSuccess,
} from "./ecommerce_action";

@Injectable()
export class EcommerceEffects {
    constructor(
        private actions$: Actions,
        private restApiService: RestApiService
    ) { }

    // Product
    fetchProductData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchProductListData),
            mergeMap((action) =>
                this.restApiService.getProductData(action.phan_loai, action.id_product, action.gia, action.ma_cap_2).pipe(
                    map((product) => {
                        const Product = product.data;
                        return fetchProductListSuccess({ Product });
                    }),
                    catchError((error) => of(fetchProductListFailure({ error })))
                )
            )
        )
    );
    // Product Delete
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
    // Product Detail
    fetchProductDetail$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchProductDetailData),
            mergeMap(({ id_product }) =>
                this.restApiService.getProductById(id_product).pipe(
                    map((ProductDetail) => fetchProductDetailSuccess({ ProductDetail })),
                    catchError((error) => of(fetchProductDetailFailure({ error })))
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
    // Order Detail
    fetchOrderDetail$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchOrderDetailData),
            mergeMap(({ id_don }) =>
                this.restApiService.getOrderById(id_don).pipe(
                    map((OrderDetail) => fetchOrderDetailSuccess({ OrderDetail })),
                    catchError((error) => of(fetchOrderDetailFailure({ error })))
                )
            )
        )
    );

    // Order Update Status
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
