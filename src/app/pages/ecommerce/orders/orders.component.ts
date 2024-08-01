import { Component } from '@angular/core';
import { NgbModal, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
// Date Format
import { DatePipe } from '@angular/common';

// Sweet Alert
import Swal from 'sweetalert2';

// Rest Api Service
import { RestApiService } from "../../../core/services/rest-api.service";
import { fetchOrderListData, updateOrderStatus } from 'src/app/store/Ecommerce/ecommerce_action';
import { RootReducerState } from 'src/app/store';
import { Store } from '@ngrx/store';
import { selectDataLoading, selectOrderData } from 'src/app/store/Ecommerce/ecommerce_selector';
import { cloneDeep } from 'lodash';
import { PaginationService } from 'src/app/core/services/pagination.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { orderStatus } from 'src/app/core/data';
import { Ultils } from "src/app/shared/utils";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
})

/**
 * Orders Component
 */
export class OrdersComponent {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  ordersForm!: UntypedFormGroup;
  submitted = false;
  masterSelected!: boolean;
  checkedList: any;
  customerName?: any;

  payment: any = '';
  date: any;
  status: any = '';

  // Api Data
  content?: any;
  econtent?: any;
  orderes?: any;
  page: any = 1;
  pageSize: any = 8;

  allOrderes: any;
  searchResults: any;
  searchTerm: any;
  userData: any;

  orderStatus!: any;
  filteredData: any[] = [];

  ultils = new Ultils();

  constructor(
    private modalService: NgbModal,
    private formBuilder: UntypedFormBuilder,
    private tokenStorageService: TokenStorageService,
    public paginationService: PaginationService,
    private store: Store<{ data: RootReducerState }>) {
  }

  ngOnInit(): void {
    this.orderStatus = orderStatus;

    this.userData = this.tokenStorageService.getUser();

    /**
    * BreadCrumb
    */
    this.breadCrumbItems = [
      { label: 'Đơn hàng' },
      { label: 'Danh sách', active: true }
    ];

    /**
     * Form Validation
     */
    this.ordersForm = this.formBuilder.group({
      id: [''],
      trang_thai: ['', [Validators.required]]
    });

    // Fetch Data
    this.store.dispatch(fetchOrderListData({ userid: this.userData.id, role: "ADMIN" }));
    this.store.select(selectDataLoading).subscribe((data) => {
      if (data == false) {
        document.getElementById('elmLoader')?.classList.add('d-none');
      }
    });

    this.store.select(selectOrderData).subscribe((data) => {
      this.orderes = data;
      this.allOrderes = cloneDeep(data);
      this.orderes = this.paginationService.changePage(this.allOrderes)
      this.paginationService.collectionSize = this.allOrderes.length;
    });
  }

  changePage() {
    this.orderes = this.paginationService.changePage(this.allOrderes)
  }

  onSort(column: any) {
    this.orderes = this.paginationService.onSort(column, this.orderes)
  }

  // Search Data
  performSearch(): void {
    this.searchResults = this.allOrderes.filter((item: any) => {
      return (
        item.id.toString().toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.sdt.toString().toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.dchi.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.ten_sp.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.ngay_nhan.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.ngay_nhap.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.tong_tien.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    });
    // this.orderes = this.searchResults.slice(0, 10);
    this.orderes = this.paginationService.changePage(this.searchResults)
    // if (this.searchResults.length == 0) {
    //   (document.querySelector('.noresult') as HTMLElement).style.display = 'block'
    // } else {
    //   (document.querySelector('.noresult') as HTMLElement).style.display = 'none'
    // }
  }

  onNavChange(changeEvent: NgbNavChangeEvent) {
    console.log(changeEvent)
    if (changeEvent.nextId === 1) {
      this.orderes = this.paginationService.changePage(this.allOrderes)
    }
    if (changeEvent.nextId === 2) {
      this.orderes = this.paginationService.changePage(this.allOrderes.filter((order: any) => order.trang_thai === 'DD'))
    }
    if (changeEvent.nextId === 3) {
      this.orderes = this.paginationService.changePage(this.allOrderes.filter((order: any) => order.trang_thai === 'XN'))
    }
    if (changeEvent.nextId === 4) {
      this.orderes = this.paginationService.changePage(this.allOrderes.filter((order: any) => order.trang_thai === 'HT'))
    }
    if (changeEvent.nextId === 5) {
      this.orderes = this.paginationService.changePage(this.allOrderes.filter((order: any) => order.trang_thai === 'DS'))
    }
    if (changeEvent.nextId === 6) {
      this.orderes = this.paginationService.changePage(this.allOrderes.filter((order: any) => order.trang_thai === 'HUY'))
    }
  }

  /**
   * Open modal
   * @param content modal content
  */
  openModal(content: any) {
    this.submitted = false;
    this.modalService.open(content, { size: 'md', centered: true });
  }

  /**
  * Form data get
  */
  get form() {
    return this.ordersForm.controls;
  }

  /**
  * Save user
  */
  saveUser() {
    if (this.ordersForm.valid) {
      if (this.ordersForm.get('id')?.value) {
        const updatedData = this.ordersForm.value;
        console.log(updatedData);
        this.store.dispatch(updateOrderStatus({ id_don: updatedData.id, status: updatedData.trang_thai, user_id: this.userData.id }));
        this.modalService.dismissAll(); let timerInterval: any;
        // Thông báo thành công
        Swal.fire({
          title: 'Cập nhập thành công!',
          icon: 'success',
          timer: 2000,
          timerProgressBar: true,
          willClose: () => {
            // Tìm vị trí của đơn hàng vừa được cập nhật trong danh sách orders
            const updatedIndex = this.orderes.findIndex((order: { id: any; }) => order.id === updatedData.id);

            // Xóa đơn hàng đó khỏi danh sách
            if (updatedIndex !== -1) {
              this.orderes.splice(updatedIndex, 1);
            }

            // Gọi lại hàm để lấy danh sách orders mới từ API
            this.store.dispatch(fetchOrderListData({ userid: this.userData.id, role: "USER" }));

            // Cập nhật lại danh sách orders với danh sách mới
            this.store.select(selectOrderData).subscribe((data) => {
              this.orderes = data;
              this.allOrderes = cloneDeep(data);
              this.orderes = this.paginationService.changePage(this.allOrderes);
            });
          },
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
          }
        });
      }

    }
    this.ordersForm.reset();
    this.submitted = true
  }

  /**
   * Open Edit modal
   * @param content modal content
   */
  editDataGet(data: any, content: any) {
    this.submitted = false;
    this.modalService.open(content, { size: 'md', centered: true });
    var modelTitle = document.querySelector('.modal-title') as HTMLAreaElement;
    modelTitle.innerHTML = 'Cập nhật';
    this.ordersForm.controls['id'].setValue(data.id);
    this.ordersForm.controls['trang_thai'].setValue(data.trang_thai);
  }

  /**
  * Delete Model Open
  */
  deleteId: any;
  confirm(content: any, id: any) {
    this.deleteId = id;
    this.modalService.open(content, { centered: true });
  }

  // Delete Data
  deleteData(id: any) {

  }

  /**
  * Multiple Delete
  */
  checkedValGet: any[] = [];
  deleteMultiple(content: any) {
    var checkboxes: any = document.getElementsByName('checkAll');
    var result
    var checkedVal: any[] = [];
    for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        result = checkboxes[i].value;
        checkedVal.push(result);
      }
    }
    if (checkedVal.length > 0) {
      this.modalService.open(content, { centered: true });
    }
    else {
      Swal.fire({ text: 'Chưa chọn item nào!', confirmButtonColor: '#299cdb', });
    }
    this.checkedValGet = checkedVal;
  }

  // The master checkbox will check/ uncheck all items
  checkUncheckAll(ev: any) {
    this.orderes.forEach((x: { state: any }) => (x.state = ev.target.checked));
    var checkedVal: any[] = [];
    var result;
    for (var i = 0; i < this.orderes.length; i++) {
      if (this.orderes[i].state == true) {
        result = this.orderes[i];
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


  // Select Checkbox value Get
  onCheckboxChange(e: any) {
    var checkedVal: any[] = [];
    var result
    for (var i = 0; i < this.orderes.length; i++) {
      if (this.orderes[i].state == true) {
        result = this.orderes[i];
        checkedVal.push(result);
      }
    }
    this.checkedValGet = checkedVal
    checkedVal.length > 0
      ? (document.getElementById("remove-actions") as HTMLElement).style.display = "block"
      : (document.getElementById("remove-actions") as HTMLElement).style.display = "none";
  }


  /**
  * Sort table data
  * @param param0 sort the column
  *
  */
  filterStatus() {
    let filteredData = this.allOrderes;
    if (this.status != '') {
      filteredData = this.allOrderes.filter((order: any) => order.trang_thai == this.status);
      this.orderes = this.paginationService.changePage(filteredData);
    } else {
      this.orderes = this.paginationService.changePage(this.allOrderes)
    }
    this.paginationService.collectionSize = filteredData.length;
  }

  filterDate() {
    console.log(this.date)
  }

  SearchData() {
    // var status = document.getElementById("idStatus") as HTMLInputElement;
    // var category = document.getElementById("idCategory") as HTMLInputElement;
    // if (status.value != "") {
    //   this.products = this.allproducts.filter((product: any) => {
    //     return product.available.toString() == status.value;
    //   });
    // } else if (category.value != '') {
    //   this.products = this.allproducts.filter((product: any) => {
    //     return product.phan_loai.toString() == category.value;
    //   });
    // } else {
    //   this.products = this.paginationService.changePage(this.allproducts);
    // }
  }
}
