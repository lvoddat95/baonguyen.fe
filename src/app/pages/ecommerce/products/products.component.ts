import { Component, QueryList, ViewChildren } from "@angular/core";
import { DecimalPipe } from "@angular/common";
import { Observable } from "rxjs";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  UntypedFormArray,
  UntypedFormControl,
  Validators,
} from "@angular/forms";

// Sweet Alert
import Swal from "sweetalert2";

// Date Format
import { DatePipe } from "@angular/common";

// Rest Api Service
import { RestApiService } from "../../../core/services/rest-api.service";
import { GlobalComponent } from "../../../global-component";
import { RootReducerState } from "src/app/store";
import { Store } from "@ngrx/store";
import { PaginationService } from "src/app/core/services/pagination.service";
import { cloneDeep } from "lodash";

import { fetchProductListData } from "src/app/store/Ecommerce/ecommerce_action";
import { selectDataLoading, selectProductData } from "src/app/store/Ecommerce/ecommerce_selector";

import { fetchCategoryListData } from "src/app/store/Ecommerce/product-category/product-category.action";
import { selectAllCategories } from "src/app/store/Ecommerce/product-category/product-category.selector";
import { ToastService } from "src/app/core/services/toast.service";
import { productAvailable, productCategory } from 'src/app/core/data';
import { Ultils } from "src/app/shared/utils";
import { ProductModel } from "src/app/store/Ecommerce/ecommerce_model";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
})

/**
 * Products Components
 */
export class ProductsComponent {
  breadCrumbItems!: Array<{}>;
  checkedList: any;
  masterSelected!: boolean;
  searchTerm: any;
  status: any = "";
  category: any = "";
  date: any;

  searchResults: any;
  subItem: any;

  products!: any;
  allproducts: any;
  allproduct: any;

  categories!: any;
  productAvailable!: any;
  productCategory!: any;

  num: number = 0;
  option = {
    startVal: this.num,
    useEasing: true,
    duration: 2,
    decimalPlaces: 2,
  };

  ultils = new Ultils();

  constructor(
    public toastService: ToastService,
    private modalService: NgbModal,
    public service: PaginationService,
    private store: Store<{ data: RootReducerState }>
  ) {
    this.subItem = [];
  }

  ngOnInit(): void {
    this.productAvailable = productAvailable;
    this.productCategory = productCategory;

    if (sessionStorage.getItem('toast')) {
      this.toastService.show('Đăng nhập thành công.', { classname: 'bg-success text-center text-white', delay: 5000 });
      sessionStorage.removeItem('toast');
    };

    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: "Sản phẩm" },
      { label: "Danh sách", active: true },
    ];

    /**
     * fetches data
     */
    this.store.dispatch(fetchProductListData({ 'phan_loai': '', 'id_product': 0, 'gia': 'DESC', 'ma_cap_2': '' }));
    this.store.dispatch(fetchCategoryListData());

    this.store.select(selectDataLoading).subscribe((data) => {
      if (data == false) {
        document.getElementById("elmLoader")?.classList.add("d-none");
      }
    });

    this.store.select(selectProductData).subscribe((data) => {
      this.products = data;
      this.allproducts = cloneDeep(data);
      this.products = this.service.changePage(this.allproducts);
    });
    this.store.select(selectAllCategories).subscribe((data) => {
      if (data && data.cake_menu) {
        const combinedMenu = [
          ...Object.values(data.cake_menu),
          ...data.accessory_menu,
          ...data.snack_menu
        ].filter(item => item.id !== 0);
        this.categories = combinedMenu;
      }

    });

  }

  changePage() {
    this.products = this.service.changePage(this.allproducts);
  }

  onSort(column: any) {
    this.products = this.service.onSort(column, this.products);
  }

  onCheckboxChange(e: any) {
    // for (var i = 0; i < this.AssignedData.length; i++) {
    //   if (this.AssignedData[i].img == e.target.value) {
    //     if (this.subItem && this.subItem.includes(this.AssignedData[i])) {
    //       this.subItem = this.subItem.filter((item: any) => item !== this.AssignedData[i]);
    //     } else {
    //       this.subItem.push(this.AssignedData[i])
    //     }
    //   }
    // }
  }

  /**
   * Delete Swal data
   */
  deleteId: any;
  confirm(content: any, id: any) {
    this.deleteId = id;
    this.modalService.open(content, { centered: true });
  }

  // Delete Data
  deleteData(id: any) {
    // if (id) {
    //   this.store.dispatch(deleteTask({ id: this.deleteId.toString() }));
    // } else {
    //   this.store.dispatch(deleteTask({ id: this.checkedValGet.toString() }));
    // }
    // this.deleteId = ''
    // this.masterSelected = false
  }

  /**
   * Multiple Delete
   */
  checkedValGet: any[] = [];
  deleteMultiple(content: any) {
    var checkboxes: any = document.getElementsByName("checkAll");
    var result;
    var checkedVal: any[] = [];
    for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        result = checkboxes[i].value;
        checkedVal.push(result);
      }
    }
    if (checkedVal.length > 0) {
      this.modalService.open(content, { centered: true });
    } else {
      Swal.fire({
        text: "Please select at least one checkbox",
        confirmButtonColor: "#299cdb",
      });
    }
    this.checkedValGet = checkedVal;
  }

  // The master checkbox will check/ uncheck all items
  checkUncheckAll(ev: any) {
    this.products.forEach((x: { state: any }) => (x.state = ev.target.checked));
    var checkedVal: any[] = [];
    var result;
    for (var i = 0; i < this.products.length; i++) {
      if (this.products[i].state == true) {
        result = this.products[i];
        checkedVal.push(result);
      }
    }
    this.checkedValGet = checkedVal;
    checkedVal.length > 0
      ? ((
        document.getElementById("remove-actions") as HTMLElement
      ).style.display = "block")
      : ((
        document.getElementById("remove-actions") as HTMLElement
      ).style.display = "none");
  }

  // Filtering
  isstatus?: any;
  SearchData() {
    var status = document.getElementById("idStatus") as HTMLInputElement;
    var category = document.getElementById("idCategory") as HTMLInputElement;
    if (status.value != "") {
      this.products = this.allproducts.filter((product: any) => {
        return product.available.toString() == status.value;
      });
    } else if (category.value != '') {
      this.products = this.allproducts.filter((product: any) => {
        return product.phan_loai.toString() == category.value;
      });
    } else {
      this.products = this.service.changePage(this.allproducts);
    }
  }

  performSearch() {
    this.searchResults = this.allproducts.filter((item: any) => {
      return (
        item.ten.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.mo_ta.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.don_gia.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    });
    this.products = this.service.changePage(this.searchResults);
  }

  statusFilter() {
    if (this.status != "") {
      this.products = this.allproducts.filter((product: ProductModel) => {
        return product.available.toString() == this.status;
      });
    } else {
      this.products = this.service.changePage(this.allproducts);
    }
  }

  categoryFilter() {
    console.log(this.category)
    if (this.category != "") {
      this.products = this.allproducts.filter((product: any) => {
        return product.phan_loai.toString() == this.category;
      });
    } else {
      this.products = this.service.changePage(this.allproducts);
    }
  }
}
