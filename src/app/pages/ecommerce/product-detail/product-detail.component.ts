import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// Products Services
import { RestApiService } from "../../../core/services/rest-api.service";
import { RootReducerState } from 'src/app/store';
import { Store } from '@ngrx/store';
import { ToastService } from 'src/app/core/services/toast.service';
import { ProductDetailModel } from 'src/app/store/Ecommerce/ecommerce_model';

import { fetchProductDetailData } from 'src/app/store/Ecommerce/ecommerce_action';
import { selectProductDetailData, selectDataLoading } from 'src/app/store/Ecommerce/ecommerce_selector';

import { selectAllCategories } from 'src/app/store/Ecommerce/product-category/product-category.selector';
import { fetchCategoryListData } from 'src/app/store/Ecommerce/product-category/product-category.action';
import { Ultils } from 'src/app/core/services/ultils.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
})

/**
 * ProductDetail Component
 */
export class ProductDetailComponent implements OnInit {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  productDetail!: ProductDetailModel[];

  dataInfo: any;
  dataSize: any;
  dataTang: any;
  dataNhan: any;
  categories: any;

  ultils = new Ultils();

  constructor(
    public toastService: ToastService,
    private store: Store<{ data: RootReducerState }>,
    private route: ActivatedRoute
  ) {

  }



  ngOnInit(): void {
    /**
   * BreadCrumb
   */
    this.breadCrumbItems = [
      { label: 'Sản phẩm' },
      { label: 'Chi tiết', active: true }
    ];

    const idParam = this.route.snapshot.paramMap.get('id_product');

    if (idParam !== null) {
      const id = parseInt(idParam);
      if (!isNaN(id)) {
        this.store.dispatch(fetchProductDetailData({ 'id_product': id }));
        this.store.select(selectProductDetailData).subscribe((res: any) => {
          if (res.code === '000') {
            if (res.data) {
              this.dataInfo = res.data.prod_info[0];
              this.dataSize = res.data.size;
              this.dataTang = res.data.tang;
              this.dataNhan = res.data.nhan;

              console.log(res.data)
              console.log(this.dataSize)
            }
          }
        });

      }
    }

    this.store.dispatch(fetchCategoryListData({ 'danh_muc': '' }));
    this.store.select(selectAllCategories).subscribe((data) => {
      if (data && data.menu) {
        this.categories = data.menu;
      }
    });


  }


}
