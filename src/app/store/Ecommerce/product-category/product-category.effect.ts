import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { RestApiService } from "src/app/core/services/rest-api.service";
import { fetchCategoryListData, fetchCategoryListSuccess, fetchCategoryListFailure } from './product-category.action';

@Injectable()
export class CategoryEffects {
    constructor(
        private actions$: Actions,
        private restApiService: RestApiService
    ) { }
    
    // Category
    fetchCategoryData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchCategoryListData),
            mergeMap((action) =>
                this.restApiService.getCategoryData(action.danh_muc).pipe(
                    map((category) => {
                        const Category = category.data;
                        return fetchCategoryListSuccess({ Category });
                    }),
                    catchError((error) => of(fetchCategoryListFailure({ error })))
                )
            )
        )
    );

}
