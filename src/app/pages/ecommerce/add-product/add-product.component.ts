import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

// Ck Editer
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
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

  constructor(
    private formBuilder: UntypedFormBuilder,

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
      mo_ta: [''],
      don_gia: [0],
      anh: [''],
      bonus: [false],
      available: [true],
      ma_cap_1: [''],
      ma_cap_2: [''],
    });

    // Danh sách danh mục
    this.productCategoryMenu = await this.ultils.getCategoryLv2Data();
    console.log(this.productCategoryMenu)
  }

  /**
  * Form data get
  */
  get form() {
    return this.sForm.controls;
  }


  changeCategory(event: any) {
    const optionElement = event.target;

    let selectedIndex: number = optionElement["selectedIndex"];
    let dataParent = optionElement.options[selectedIndex].getAttribute("data-parent");
    // if (dataParent && dataParent.length > 0) {
    //   this.isProductCategoryLv2 = true;
    // } else {
    //   this.isProductCategoryLv2 = false;
    // }
    console.log(dataParent)
  }

  /**
  * Multiple Default Select2
  */
  selectValue = ['Choice 1', 'Choice 2', 'Choice 3'];

  // File Upload
  imageURL: string | undefined;
  fileChange(event: any) {
    let fileList: any = (event.target as HTMLInputElement);
    let file: File = fileList.files[0];
    document.getElementById('')

    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
      (document.getElementById('product-img') as HTMLImageElement).src = this.imageURL;
    }
    reader.readAsDataURL(file)
  }
}
