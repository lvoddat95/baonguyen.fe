import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

// Ck Editer
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { RestApiService } from 'src/app/core/services/rest-api.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { Ultils } from 'src/app/core/services/ultils.service';

const editorContent = ``;
const editorConfig = { toolbar: { items: ['bold', 'italic', 'underline'] } };
const editorConfig2 = {
  toolbar: {
    items: [
      'undo',
      'redo',
      '|',
      'heading',
      '|',
      'bold',
      'italic',
      'link',
      '|',
      'strikethrough',
      'code',
      '|',
      'bulletedList',
      'numberedList',
    ],
  },
};


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
})

/**
 * AddProduct Component
 */
export class AddProductComponent implements OnInit {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  ckeditor = ClassicEditor;
  editorConfig = editorConfig2;
  editorContent = editorContent;
  productCategoryMenu!: any;
  ultils = new Ultils();
  sForm!: UntypedFormGroup;
  submitted = false;

  formSize = [];
  sizeFormControls: any[] = [];
  constructor(
    private formBuilder: UntypedFormBuilder,
    private restApiService: RestApiService,
    private toastService: ToastService

  ) { }

  async ngOnInit(): Promise<void> {
    /**
    * BreadCrumb
    */
    this.breadCrumbItems = [
      { label: 'Sản phẩm' },
      { label: 'Thêm mới', active: true }
    ];

    /**
 * Form Validation
 */
    this.sForm = this.formBuilder.group({
      ten: ['', [Validators.required]],
      mo_ta: ['', [Validators.required]],
      don_gia: [0],
      anh: [''],
      bonus: [false],
      available: [true],
      ma_cap_1: [''],
      ma_cap_2: [''],
      category: ['', [Validators.required]],
      listSize: this.formBuilder.array([
      ]),
      listNhan: this.formBuilder.array([
      ]),
      listTang: this.formBuilder.array([
      ])
    });

    // Danh sách danh mục
    this.productCategoryMenu = await this.ultils.getCategoryLv2Data();
  }

  onSubmit() {
    this.submitted = true;
    if (this.sForm.valid) {

      const listSize = this.sForm.value.listSize.map((item: { don_gia: string; }) => {
        return {
          ...item,
          don_gia: parseInt(item.don_gia.replace(/,/g, ''))
        };
      });
      const listNhan = this.sForm.value.listNhan.map((item: { don_gia: string; }) => {
        return {
          ...item,
          don_gia: parseInt(item.don_gia.replace(/,/g, ''))
        };
      });
      const listTang = this.sForm.value.listTang.map((item: { don_gia: string; }) => {
        return {
          ...item,
          don_gia: parseInt(item.don_gia.replace(/,/g, ''))
        };
      });


      if (this.selectedFile != undefined) {
        const formData = new FormData();
        formData.append('file', this.selectedFile);
        this.restApiService.upload(formData).subscribe((file: any) => {
          if (file.code == "000") {
            this.sForm.get('anh')?.setValue(file.data);
            const dataInfo = this.sForm.value;

            this.restApiService.insertProduct(dataInfo, listSize, listNhan, listTang).subscribe((res: any) => {
              if (res.code == "000") {
                this.toastService.success("Thêm mới thành công.", 'Thành công');
                this.sForm.reset();
                this.submitted = false;
                this.fileRemove();
              } else {
                this.toastService.error(res.message, 'Lỗi!');
              }
            });

          } else {
            this.toastService.error(file.message, 'Lỗi upload ảnh!');
          }
        });
      } else {
        this.toastService.warning('Chưa chọn ảnh cho sản phẩm.', 'Chú ý!');
      }
    } else {
      this.toastService.warning('Vui lòng nhập thông tin bẳt buộc nhập.', 'Chú ý!');
    }
  }


  changeCategory(event: any) {
    const optionElement = event.target;
    let selectedIndex: number = optionElement["selectedIndex"];
    let dataParent = optionElement.options[selectedIndex].getAttribute("data-parent");
    console.log(optionElement.value)
    console.log(dataParent)

    if (dataParent) {
      this.sForm.get('ma_cap_1')?.setValue(dataParent);
      this.sForm.get('ma_cap_2')?.setValue(optionElement.value);
    } else {
      this.sForm.get('ma_cap_1')?.setValue(optionElement.value);
      this.sForm.get('ma_cap_2')?.setValue('');
    }
  }


  /**
  * Form data get
  */
  get form() {
    return this.sForm.controls;
  }

  private getFormRepeat() {
    return this.formBuilder.group({
      ma: [''],
      ten: [''],
      size: [''],
      don_gia: [0],
    });

  }
  getSizeControls() {
    return (this.sForm.get('listSize') as FormArray).controls;
  }

  getNhanControls() {
    return (this.sForm.get('listNhan') as FormArray).controls;
  }

  getTangControls() {
    return (this.sForm.get('listTang') as FormArray).controls;
  }

  addSizeItem(): void {
    const control = <FormArray>this.sForm['controls']['listSize'];
    control.push(this.getFormRepeat());
  }
  addNhanItem(): void {
    const control = <FormArray>this.sForm['controls']['listNhan'];
    control.push(this.getFormRepeat());
  }
  addTangItem(): void {
    const control = <FormArray>this.sForm['controls']['listTang'];
    control.push(this.getFormRepeat());
  }

  removeSizeItem(index: any) {
    (this.sForm.get('listSize') as UntypedFormArray).removeAt(index);
  }
  removeNhanItem(index: any) {
    (this.sForm.get('listNhan') as UntypedFormArray).removeAt(index);
  }
  removeTangItem(index: any) {
    (this.sForm.get('listTang') as UntypedFormArray).removeAt(index);
  }




  // File Upload
  selectedFile: File | undefined;
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


}
