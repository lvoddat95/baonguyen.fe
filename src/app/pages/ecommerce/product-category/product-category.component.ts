import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/core/services/toast.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { PaginationService } from 'src/app/core/services/pagination.service';
import { Store } from '@ngrx/store';
import { RootReducerState } from 'src/app/store';
import Swal from 'sweetalert2';
import { NgbModal, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { cloneDeep } from 'lodash';

import { productAvailable, productCategory } from 'src/app/core/data';
import { RestApiService } from 'src/app/core/services/rest-api.service';
import { Ultils } from 'src/app/core/services/ultils.service';

@Component({
  selector: "app-product-category",
  templateUrl: "./product-category.component.html",
})

/**
 * ProductCategory Component
 */
export class ProductCategoryComponent {
  breadCrumbItems!: Array<{}>;
  sForm!: UntypedFormGroup;
  submitted = false;
  masterSelected!: boolean;
  isProductCategoryLv2 = false;
  activeTab = 1;
  dataList?: any;
  allData: any;
  selectedFile: File | undefined;
  productCategory!: any;
  productCategoryMenu!: any;
  selectedCategory: any | null = null;
  ultils = new Ultils();

  constructor(
    private modalService: NgbModal,
    private formBuilder: UntypedFormBuilder,
    private restApiService: RestApiService,
    private toastService: ToastService,
    private tokenStorageService: TokenStorageService,
    public paginationService: PaginationService,
    private store: Store<{ data: RootReducerState }>
  ) {

  }


  async ngOnInit(): Promise<void> {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: "Danh mục" },
      { label: "Danh sách", active: true },
    ];

    this.productCategory = productCategory;

    /**
     * Form Validation
     */
    this.sForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      category: ['', [Validators.required]],
    });

    // Danh sách danh mục
    this.productCategoryMenu = await this.ultils.getCategoryData();

    this.getAllData();

  }

  /**
  * Form data get
  */
  get form() {
    return this.sForm.controls;
  }

  saveForm() {
    this.submitted = true;
    if (this.sForm.valid) {
      if (this.selectedFile != undefined) {
        const formData = new FormData();
        formData.append('file', this.selectedFile);
        this.restApiService.upload(formData).subscribe((res: any) => {
          if (res.code == "000") {
            const imageUrl = res.data;
            if (this.isProductCategoryLv2) {
              this.onCategoryLv2Insert(this.form["title"].value, this.form["category"].value, imageUrl);
            } else {
              this.onCategoryInsert(this.form["title"].value, this.form["category"].value, imageUrl);
            }
          } else {
            this.toastService.error(res.message, 'Lỗi upload ảnh!');
          }
        });
      } else {
        if (this.isProductCategoryLv2) {
          this.onCategoryLv2Insert(this.form["title"].value, this.form["category"].value, "");
        } else {
          this.onCategoryInsert(this.form["title"].value, this.form["category"].value, "");
        }
      }
    }
  }

  onCategoryInsert(title: string, category: string, imageUrl: string | undefined) {
    this.restApiService.insertCategory(title, category, imageUrl).subscribe((res: any) => {
      if (res.code == "000") {
        this.toastService.success("Thêm mới thành công.", 'Thành công');
        this.sForm.reset();
        this.submitted = false;
        this.fileRemove();
        this.getAllData();
        this.activeTab = 1;
      } else {
        this.toastService.error(res.message, 'Lỗi!');
      }
    });

  }

  onCategoryLv2Insert(title: string, ma_cap_1: string, imageUrl: string | undefined) {
    this.restApiService.insertCategoryLv2(title, ma_cap_1, imageUrl).subscribe((res: any) => {
      if (res.code == "000") {
        this.toastService.success("Thêm mới thành công.", 'Thành công');
        this.sForm.reset();
        this.submitted = false;
        this.fileRemove();
        this.getAllData();
        this.activeTab = 2;
      } else {
        this.toastService.error(res.message, 'Lỗi!');
      }
    });
  }


  // File Upload
  imageURL: string | undefined;
  fileChange(event: any) {
    if (event.target.files.length > 0) {
      let fileList: any = (event.target as HTMLInputElement);
      let file: File = fileList.files[0];
      this.selectedFile = file;
      document.getElementById('')

      const reader = new FileReader();
      reader.onload = () => {
        this.imageURL = reader.result as string;
        (document.getElementById('file-img') as HTMLImageElement).src = this.imageURL;
        (document.getElementById('remove-file') as HTMLElement).style.display = "block";
      }
      reader.readAsDataURL(file)
    }
  }

  fileRemove() {
    this.imageURL = 'assets/images/baonguyen/placeholder.png';
    const imgElement = document.getElementById('file-img') as HTMLImageElement;
    if (imgElement) {
      imgElement.src = this.imageURL || '';
      (document.getElementById('file') as HTMLInputElement).value = '';
    }
    this.selectedFile = undefined;
    (document.getElementById('remove-file') as HTMLElement).style.display = "none";
  }

  getAllData() {
    this.restApiService
      .getCategoryData('')
      .subscribe((res: any) => {
        if (res.code == "000") {
          this.dataList = res.data.menu;
          this.allData = cloneDeep(res.data.menu);
          this.dataList = this.paginationService.changePage(this.allData)
          this.paginationService.collectionSize = this.allData.length;
        } else {
          this.toastService.error(res.message, 'Lỗi!');
        }
      });
  }

  getAllDataLv2() {
    this.restApiService
      .getCategoryLv2Data('')
      .subscribe((res: any) => {
        if (res.code == "000") {
          this.dataList = res.data;
          this.allData = cloneDeep(res.data);
          this.dataList = this.paginationService.changePage(this.allData)
          this.paginationService.collectionSize = this.allData.length;
        } else {
          this.toastService.error(res.message, 'Lỗi!');
        }
      });
  }

  changeCategory(event: any) {
    const optionElement = event.target;

    let selectedIndex: number = optionElement["selectedIndex"];
    let dataParent = optionElement.options[selectedIndex].getAttribute("data-parent");
    if (dataParent && dataParent.length > 0) {
      this.isProductCategoryLv2 = true;
    } else {
      this.isProductCategoryLv2 = false;
    }
    console.log(dataParent)
  }


  changePage() {
    this.dataList = this.paginationService.changePage(this.allData)
  }

  onSort(column: any) {
    this.dataList = this.paginationService.onSort(column, this.allData)
  }


  onNavChange(changeEvent: NgbNavChangeEvent) {
    this.checkedValGet = [];
    (document.getElementById("checkAll") as HTMLInputElement).checked = false;
    if (changeEvent.nextId === 1) {
      this.isProductCategoryLv2 = false;
      this.getAllData();
    }
    if (changeEvent.nextId === 2) {
      this.isProductCategoryLv2 = true;
      this.getAllDataLv2();
    }
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
    console.log(this.checkedValGet);
    if (!this.isProductCategoryLv2) {
      this.checkedValGet.forEach((data: any) => {
        this.restApiService
          .deleteCategogy(data.id)
          .subscribe((res: any) => {
            if (res.code == "000") {
              this.getAllData();
              this.checkedValGet = [];
              const removeActionsElement = document.getElementById("remove-actions");
              if (removeActionsElement) {
                removeActionsElement.style.display = "none";
              }
              this.toastService.success("Xoá thành công.", 'Thành công');
            } else {
              this.toastService.error(res.message, 'Lỗi!');
            }
          });
      })
    } else {
      this.toastService.error("Lỗi API xoá menu Lv2.", 'Lỗi!');
    }
  }

  /**
  * Multiple Delete
  */
  checkedValGet: any[] = [];
  deleteMultiple(content: any) {
    if (this.checkedValGet.length > 0) {
      this.modalService.open(content, { centered: true });
    }
    else {
      Swal.fire({ text: 'Chưa chọn item nào!', confirmButtonColor: '#299cdb', });
    }
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
    const removeActionsElement = document.getElementById("remove-actions");
    if (removeActionsElement) {
      removeActionsElement.style.display = checkedVal.length > 0 ? "block" : "none";
    }
  }


  // Select Checkbox value Get
  onCheckboxChange(e: any) {
    var checkedVal: any[] = [];
    var result;
    for (var i = 0; i < this.dataList.length; i++) {
      if (this.dataList[i].state == true) {
        result = this.dataList[i];
        checkedVal.push(result);
      }
    }
    console.log(checkedVal)
    this.checkedValGet = checkedVal;
    const removeActionsElement = document.getElementById("remove-actions");
    if (removeActionsElement) {
      removeActionsElement.style.display = checkedVal.length > 0 ? "block" : "none";
    }
  }


}
