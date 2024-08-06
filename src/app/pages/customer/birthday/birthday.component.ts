import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/core/services/toast.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { PaginationService } from 'src/app/core/services/pagination.service';
import { Store } from '@ngrx/store';
import { RootReducerState } from 'src/app/store';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerService } from 'src/app/core/services/customer.service';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'birthday-video',
  templateUrl: './birthday.component.html',
})
export class BirthdayComponent {
  breadCrumbItems!: Array<{}>;
  sForm!: UntypedFormGroup;
  submitted = false;
  masterSelected!: boolean;

  dataList?: any;
  allData: any;
  month!: any;
  months: number[] = [1,2,3,4,5,6,7,8,9,10,11,12];

  constructor(
    private modalService: NgbModal,
    private formBuilder: UntypedFormBuilder,
    private customerService: CustomerService,
    private toastService: ToastService,
    private tokenStorageService: TokenStorageService,
    public paginationService: PaginationService,
    private store: Store<{ data: RootReducerState }>
  ) {

  }


  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: "Danh mục" },
      { label: "Video", active: true },
    ];

    /**
     * Form Validation
     */
    this.sForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      link: ['', [Validators.required]]
    });

    const currentDate = new Date();
    this.month = currentDate.getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0, vì vậy cần cộng thêm 1

    this.getAllData(this.month);
  }

  getAllData(thang: number) {
    this.customerService
      .getBirthdayData(thang)
      .subscribe((res: any) => {
        if (res.code == "000") {
          this.dataList = res.data.list_ng_than;
          this.allData = cloneDeep(res.data.list_ng_than);
          this.dataList = this.paginationService.changePage(this.allData)
          this.paginationService.collectionSize = this.allData.length;
        } else {
          this.toastService.show(res.message, { classname: "bg-danger text-white", delay: 5000, });
        }
      });
  }

  monthFilter() {
    console.log(this.month);
    this.getAllData(parseInt(this.month));
  }


  changePage() {
    this.dataList = this.paginationService.changePage(this.allData)
  }

  onSort(column: any) {
    this.dataList = this.paginationService.onSort(column, this.allData)
  }


}
