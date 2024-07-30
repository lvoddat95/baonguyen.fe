import { Component, OnInit } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

// Login Auth
import { environment } from "../../../environments/environment";
import { AuthenticationService } from "../../core/services/auth.service";
import { AuthfakeauthenticationService } from "../../core/services/authfake.service";
import { first } from "rxjs/operators";
import { Store } from "@ngrx/store";
import { login } from "src/app/store/Authentication/authentication.actions";
import { md5Encrypt } from "src/app/shared/utils";
import { ToastService } from "src/app/core/services/toast.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})

/**
 * Login Component
 */
export class LoginComponent implements OnInit {
  // Login Form
  loginForm!: UntypedFormGroup;
  submitted = false;
  fieldTextType!: boolean;
  error = "";
  returnUrl!: string;

  toast!: false;

  // set the current year
  year: number = new Date().getFullYear();

  constructor(
    private formBuilder: UntypedFormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private authFackservice: AuthfakeauthenticationService,
    private route: ActivatedRoute,
    public toastService: ToastService,
    private store: Store
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(["/"]);
    }
  }

  ngOnInit(): void {
    if (sessionStorage.getItem("currentUser")) {
      this.router.navigate(["/"]);
    }
    /**
     * Form Validatyion
     */
    this.loginForm = this.formBuilder.group({
      username: ["0387942323", [Validators.required]],
      password: ["Vni@12345", [Validators.required]],
    });
    // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  /**
   * Form submit
   */
  onSubmit() {
    this.submitted = true;

    // Login Api
    // this.store.dispatch(
    //   login({
    //     username: this.f["username"].value,
    //     password: this.f["password"].value,
    //     id: 0,
    //     token_noti: ""
    //   })
    // );
    this.authenticationService
      .login(this.f["username"].value, md5Encrypt(this.f["password"].value), 0, "")
      .subscribe((data: any) => {
        if (data.code == "000") {
          sessionStorage.setItem("toast", "true");
          sessionStorage.setItem("currentUser", JSON.stringify(data.data[0]));
          // sessionStorage.setItem('token', data.token);
          // this.toastService.show(data.message, { classname: "bg-success text-white", delay: 15000, });
          this.router.navigate(["/"]);
        } else {
          this.toastService.show(data.message, { classname: "bg-danger text-white", delay: 7000, });
        }
      });

    // stop here if form is invalid
    // if (this.loginForm.invalid) {
    //   return;
    // } else {
    //   if (environment.defaultauth === 'firebase') {
    //     this.authenticationService.login(this.f['email'].value, this.f['password'].value).then((res: any) => {
    //       this.router.navigate(['/']);
    //     })
    //       .catch(error => {
    //         this.error = error ? error : '';
    //       });
    //   } else {
    //     this.authFackservice.login(this.f['email'].value, this.f['password'].value).pipe(first()).subscribe(data => {
    //           this.router.navigate(['/']);
    //         },
    //         error => {
    //           this.error = error ? error : '';
    //         });
    //   }
    // }
  }

  /**
   * Password Hide/Show
   */
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
