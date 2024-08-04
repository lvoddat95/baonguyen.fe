import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// Products Services
import { RestApiService } from "../../../core/services/rest-api.service";
import { RootReducerState } from 'src/app/store';
import { Store } from '@ngrx/store';
import { ToastService } from 'src/app/core/services/toast.service';
import { OrderDetailModel } from 'src/app/store/Ecommerce/ecommerce_model';

import { fetchOrderDetailData } from 'src/app/store/Ecommerce/ecommerce_action';
import { selectOrderDetailData, selectDataLoading } from 'src/app/store/Ecommerce/ecommerce_selector';

import { selectAllCategories } from 'src/app/store/Ecommerce/product-category/product-category.selector';
import { fetchCategoryListData } from 'src/app/store/Ecommerce/product-category/product-category.action';
import { orderStatus } from 'src/app/core/data';
import { Ultils } from 'src/app/core/services/ultils.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
})

/**
 * OrderDetail Component
 */
export class OrderDetailComponent implements OnInit {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  OrderDetail!: OrderDetailModel[];
  dataInfo: any;
  listProduct: any;
  categories: any;
  orderStatus!: any;
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
      { label: 'Đơn hàng' },
      { label: 'Chi tiết', active: true }
    ];
    this.orderStatus = orderStatus;
    const idParam = this.route.snapshot.paramMap.get('id_don');

    if (idParam !== null) {
      const id = parseInt(idParam);
      if (!isNaN(id)) {
        this.store.dispatch(fetchOrderDetailData({ 'id_don': id }));
        this.store.select(selectOrderDetailData).subscribe((res: any) => {
          if (res.code === '000') {
            if (res.data) {
              this.dataInfo = res.data.info[0];
              this.listProduct = res.data.list_product;
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
