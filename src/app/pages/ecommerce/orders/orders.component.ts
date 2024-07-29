import { Component } from '@angular/core';
import { NgbModal, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
// Date Format
import { DatePipe } from '@angular/common';

// Csv File Export
import { ngxCsv } from 'ngx-csv/ngx-csv';

// Sweet Alert
import Swal from 'sweetalert2';

// Rest Api Service
import { restApiService } from "../../../core/services/rest-api.service";
import { fetchOrderListData, updateOrderStatus } from 'src/app/store/Ecommerce/ecommerce_action';
import { RootReducerState } from 'src/app/store';
import { Store } from '@ngrx/store';
import { selectDataLoading, selectOrderData } from 'src/app/store/Ecommerce/ecommerce_selector';
import { cloneDeep } from 'lodash';
import { PaginationService } from 'src/app/core/services/pagination.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
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

  Pending = 'Pending';
  Inprogress = 'Inprogress';
  Cancelled = 'Cancelled';
  Pickups = 'Pickups';
  Returns = 'Returns';
  Delivered = 'Delivered';
  payment: any = '';
  date: any;
  status: any = '';

  // Api Data
  content?: any;
  econtent?: any;
  orderes?: any;
  page: any = 1;
  pageSize: any = 8;

  allorderes: any;
  searchResults: any;
  searchTerm: any;
  userData: any;

  constructor(
    private modalService: NgbModal,
    private formBuilder: UntypedFormBuilder,
    private tokenStorageService: TokenStorageService,
    public service: PaginationService,
    private store: Store<{ data: RootReducerState }>) {
  }

  ngOnInit(): void {

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
    this.store.dispatch(fetchOrderListData({ userid: 5, role: "USER" }));
    this.store.select(selectDataLoading).subscribe((data) => {
      if (data == false) {
        document.getElementById('elmLoader')?.classList.add('d-none');
      }
    });

    this.store.select(selectOrderData).subscribe((data) => {
      this.orderes = data;
      this.allorderes = cloneDeep(data);
      this.orderes = this.service.changePage(this.allorderes)
    });
  }

  changePage() {
    this.orderes = this.service.changePage(this.allorderes)
  }

  onSort(column: any) {
    this.orderes = this.service.onSort(column, this.orderes)
  }

  // Search Data
  performSearch(): void {
    this.searchResults = this.allorderes.filter((item: any) => {
      return (
        item.id.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.sdt.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.dchi.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.ten_sp.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.ngay_nhan.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.ngay_nhap.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.tong_tien.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    });
    // this.orderes = this.searchResults.slice(0, 10);
    this.orderes = this.service.changePage(this.searchResults)
    // if (this.searchResults.length == 0) {
    //   (document.querySelector('.noresult') as HTMLElement).style.display = 'block'
    // } else {
    //   (document.querySelector('.noresult') as HTMLElement).style.display = 'none'
    // }
  }

  onNavChange(changeEvent: NgbNavChangeEvent) {
    if (changeEvent.nextId === 1) {
      this.orderes = this.service.changePage(this.allorderes)
    }
    if (changeEvent.nextId === 2) {
      this.orderes = this.service.changePage(this.allorderes.filter((order: any) => order.trang_thai === 'DD'))
    }
    if (changeEvent.nextId === 3) {
      this.orderes = this.service.changePage(this.allorderes.filter((order: any) => order.trang_thai === 'DS'))
    }
    if (changeEvent.nextId === 4) {
      this.orderes = this.service.changePage(this.allorderes.filter((order: any) => order.trang_thai === 'HUY'))
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
              this.allorderes = cloneDeep(data);
              this.orderes = this.service.changePage(this.allorderes);
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
  editDataGet(id: any, content: any) {
    this.submitted = false;
    this.modalService.open(content, { size: 'md', centered: true });
    var modelTitle = document.querySelector('.modal-title') as HTMLAreaElement;
    modelTitle.innerHTML = 'Cập nhật';
    this.econtent = this.allorderes[id];
    this.ordersForm.controls['id'].setValue(this.econtent.id);
    this.ordersForm.controls['trang_thai'].setValue(this.econtent.trang_thai);
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
      Swal.fire({ text: 'Please select at least one checkbox', confirmButtonColor: '#299cdb', });
    }
    this.checkedValGet = checkedVal;
  }

  // The master checkbox will check/ uncheck all items
  checkUncheckAll(ev: any) {
    this.orderes.forEach((x: { state: any; }) => x.state = ev.target.checked)
    var checkedVal: any[] = [];
    var result
    for (var i = 0; i < this.orderes.length; i++) {
      if (this.orderes[i].state == true) {
        result = this.orderes[i];
        checkedVal.push(result);
      }
    }
    this.checkedValGet = checkedVal
    checkedVal.length > 0 ? (document.getElementById("remove-actions") as HTMLElement).style.display = "block" : (document.getElementById("remove-actions") as HTMLElement).style.display = "none";
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
    checkedVal.length > 0 ? (document.getElementById("remove-actions") as HTMLElement).style.display = "block" : (document.getElementById("remove-actions") as HTMLElement).style.display = "none";
  }

  // Csv File Export
  csvFileExport() {
    var orders = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Order Data',
      useBom: true,
      noDownload: false,
      headers: ["id", "order Id", "customer", "product", "orderDate", "amount", "payment", "status"]
    };
    new ngxCsv(this.orderes, "orders", orders);
  }
  /**
  * Sort table data
  * @param param0 sort the column
  *
  */


  filterStatus() {
    if (this.status != '') {
      this.orderes = this.allorderes.filter((order: any) => order.trang_thai == this.status);
    } else {
      this.orderes = this.service.changePage(this.allorderes)
    }
  }

}
