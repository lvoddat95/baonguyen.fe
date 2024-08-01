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
import { SettingService } from 'src/app/core/services/setting.service';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
})
export class VideoComponent {
  breadCrumbItems!: Array<{}>;
  sForm!: UntypedFormGroup;
  submitted = false;
  masterSelected!: boolean;

  dataList?: any;
  allData: any;

  constructor(
    private modalService: NgbModal,
    private formBuilder: UntypedFormBuilder,
    private settingService: SettingService,
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

    this.getAllData();


  }

  getAllData() {
    this.settingService
      .getVideoData()
      .subscribe((res: any) => {
        if (res.code == "000") {
          this.dataList = res.data.video_list;
          this.allData = cloneDeep(res.data.video_list);
          this.dataList = this.paginationService.changePage(this.allData)
          this.paginationService.collectionSize = this.allData.length;
        } else {
          this.toastService.show(res.message, { classname: "bg-danger text-white", delay: 5000, });
        }
      });
  }

  deleteDataItem(id: number) {
    this.settingService
      .deleteVideo(id)
      .subscribe((res: any) => {
        if (res.code == "000") {
          this.toastService.show("Xoá thành công.", { classname: "bg-success text-white", delay: 5000, });
          this.getAllData();
        } else {
          this.toastService.show("Lỗi!" + res.message, { classname: "bg-danger text-white", delay: 5000, });
        }
      });
  }


  /**
  * Form data get
  */
  get form() {
    return this.sForm.controls;
  }

  /**
  * Save user
  */
  saveForm() {
    this.submitted = true;
    if (this.sForm.valid) {
      this.settingService
      .insertVideo(this.form["title"].value, this.form["link"].value, null)
      .subscribe((res: any) => {
        if (res.code == "000") {
          this.toastService.show("Thêm mới thành công.", { classname: "bg-success text-white", delay: 5000, });
          this.sForm.reset();
          this.submitted = false;
          this.getAllData();
        } else {
          this.toastService.show("Lỗi!" + res.message, { classname: "bg-danger text-white", delay: 5000, });
        }
      });
    }
  }

  changePage() {
    this.dataList = this.paginationService.changePage(this.allData)
  }

  onSort(column: any) {
    this.dataList = this.paginationService.onSort(column, this.allData)
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
  deleteData(id: number) {
    this.checkedValGet.forEach((id: number) => {
      if (typeof id == "string") {
        this.deleteDataItem(parseInt(id));
      }
    })
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
    this.dataList.forEach((x: { state: any }) => (x.state = ev.target.checked));
    var checkedVal: any[] = [];
    var result;
    for (var i = 0; i < this.dataList.length; i++) {
      if (this.dataList[i].state == true) {
        result = this.dataList[i];
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
    for (var i = 0; i < this.dataList.length; i++) {
      if (this.dataList[i].state == true) {
        result = this.dataList[i];
        checkedVal.push(result);
      }
    }
    this.checkedValGet = checkedVal
    checkedVal.length > 0
      ? (document.getElementById("remove-actions") as HTMLElement).style.display = "block"
      : (document.getElementById("remove-actions") as HTMLElement).style.display = "none";
  }

}
