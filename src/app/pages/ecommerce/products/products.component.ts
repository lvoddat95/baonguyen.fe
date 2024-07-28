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
import { restApiService } from "../../../core/services/rest-api.service";
import { GlobalComponent } from "../../../global-component";
import { RootReducerState } from "src/app/store";
import { Store } from "@ngrx/store";
import { PaginationService } from "src/app/core/services/pagination.service";
import { cloneDeep } from "lodash";
import { Products } from "src/app/core/data";
import { ToastService } from "./toast-service";

import { fetchProductListData } from "src/app/store/Ecommerce/ecommerce_action";
import { selectDataLoading, selectProductData } from "src/app/store/Ecommerce/ecommerce_selector";

import { fetchCategoryListData } from "src/app/store/Ecommerce/product-category/product-category.action";
import { selectAllCategories } from "src/app/store/Ecommerce/product-category/product-category.selector";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"],
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

  constructor(
    public toastService: ToastService,
    private modalService: NgbModal,
    public service: PaginationService,
    private store: Store<{ data: RootReducerState }>
  ) {
    this.subItem = [];
  }

  ngOnInit(): void {
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
    this.store.dispatch(fetchProductListData());
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

  num: number = 0;
  option = {
    startVal: this.num,
    useEasing: true,
    duration: 2,
    decimalPlaces: 2,
  };

  getNameFromCode(code: string): string {
    if (!this.categories || !Array.isArray(this.categories)) {
      return "Không tìm thấy";
    }

    const item = this.categories.find(
      (menuItem: { ma: string }) => menuItem.ma === code
    );
    return item ? item.ten : "Không tìm thấy";
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
    var payment = document.getElementById("idPayment") as HTMLInputElement;
    if (status.value != "") {
      this.products = this.allproducts.filter((product: any) => {
        return product.available.toString() == status.value;
      });

      console.log(status.value);
    } else {
      this.products = this.service.changePage(this.allproducts);
    }
  }

  performSearch() {
    this.searchResults = this.allproducts.filter((item: any) => {
      return (
        item.ten.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.mo_ta.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.phan_loai.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.don_gia
          .toString()
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase())
      );
    });
    this.products = this.service.changePage(this.searchResults);
  }

  statusFilter() {
    if (this.status != "") {
      this.products = this.allproducts.filter((product: any) => {
        return product.available.toString() == this.status;
      });
    } else {
      this.products = this.service.changePage(this.allproducts);
    }
  }
}
