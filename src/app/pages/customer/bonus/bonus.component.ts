import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/core/services/customer.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-bonus',
  templateUrl: './bonus.component.html',
})
export class BonusComponent {
  breadCrumbItems!: Array<{}>;
  sForm!: UntypedFormGroup;
  submitted = false;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private customerService: CustomerService,
    private toastService: ToastService,
  ) {

  }


  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: "Khách hàng" },
      { label: "Cộng điểm", active: true },
    ];

    /**
 * Form Validation
 */
    this.sForm = this.formBuilder.group({
      sdt: ['', [Validators.required]],
      thanh_tien: ['', [Validators.required]]
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
      this.customerService
        .updateBonusForUser(this.form["sdt"].value.toString(), parseFloat(this.form["thanh_tien"].value))
        .subscribe((data: any) => {
          if (data.code == "000") {
            this.toastService.show(data.message, { classname: "bg-success text-white", delay: 10000, });
            this.sForm.reset();
            this.submitted = false;
          } else {
            this.toastService.show(data.message, { classname: "bg-danger text-white", delay: 10000, });
          }
        });
    }
  }



}
