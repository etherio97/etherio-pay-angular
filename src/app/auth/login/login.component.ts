import { AfterViewInit, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/shared/auth.service";
import {
  Auth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
  PhoneAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
})
export class LoginComponent implements OnInit, AfterViewInit {
  isSentingOTP = false;
  isLoading = false;
  formGroup!: FormGroup;
  error = false;
  errorMessage = "";

  private auth!: Auth;
  private recaptcha!: RecaptchaVerifier;
  private confirmationResult!: ConfirmationResult;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      phoneNumber: [
        "",
        [Validators.required, Validators.pattern(/^[2-9][0-9]{6,8}/)],
      ],
      otpCode: ["", [Validators.pattern(/^[0-9]{6}$/)]],
    });

    this.auth = this.authService.getAuth();
  }

  ngAfterViewInit(): void  {
    this.recaptcha = new RecaptchaVerifier(
      "recaptcha",
      { size: "invisible" },
      this.auth
    );
    this.recaptcha.render();
  }

  async sendOTP() {
    this.isSentingOTP = true;
    this.confirmationResult = await signInWithPhoneNumber(
      this.auth,
      this.localPhone,
      this.recaptcha
    );
    requestAnimationFrame(() => {
      document.querySelector<HTMLInputElement>("input#otpCode")?.focus();
    });
  }

  async submitLogin() {
    this.error = false;
    this.isLoading = true;
    try {
      let credential = PhoneAuthProvider.credential(
        this.confirmationResult.verificationId,
        this.otpCode?.value
      );
      await signInWithCredential(this.auth, credential);
      this.router.navigate([""]);
    } catch (e) {
      console.error(e);
      this.isLoading = false;
      this.otpCode?.setValue("");
      this.handleError(e);
    }
  }

  changePhone(): void  {
    this.isSentingOTP = false;
    this.otpCode?.setValue("");
    requestAnimationFrame(() => {
      document.querySelector<HTMLInputElement>("input#phoneNumber")?.focus();
      document.querySelector<HTMLInputElement>("input#phoneNumber")?.select();
    });
  }

  private handleError(err: any) {
    this.error = true;
    switch (err.message) {
      case "auth/invalid-verification-code":
        this.errorMessage = "Invalid verification code";
        break;
      default:
        this.errorMessage = "Something went wrong";
    }
  }

  get phoneNumber() {
    return this.formGroup.get("phoneNumber");
  }

  get otpCode() {
    return this.formGroup.get("otpCode");
  }

  get localPhone() {
    let phoneNumber = this.phoneNumber?.value;
    return `+959${phoneNumber}`;
  }
}
