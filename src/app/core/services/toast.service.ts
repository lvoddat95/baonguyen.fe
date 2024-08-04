import { Injectable, TemplateRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class ToastService {

  constructor(private toastr: ToastrService) { }

  toasts: any[] = [];

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }


  success(message: string, title?: string) {
    this.toastr.success(message, title);
  }

  warning(message: string, title?: string) {
    this.toastr.warning(message, title);
  }

  error(message: string, title?: string) {
    this.toastr.error(message, title);
  }
}
