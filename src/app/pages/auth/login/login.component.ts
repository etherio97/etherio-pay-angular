import {
  AfterViewInit,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';
import {
  Auth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
  PhoneAuthProvider,
  signInWithCredential,
} from 'firebase/auth';
import { Router } from '@angular/router';
import { VALIDATOR_PATTERNS } from 'src/app/app.config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit, AfterViewInit {
  loaded = false;
  isLoading = false;
  formGroup: FormGroup;
  error = false;
  errorMessage = '';
  mode: 'password' | 'otp' | undefined;

  private auth: Auth;
  private recaptcha: RecaptchaVerifier;
  private confirmationResult: ConfirmationResult;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.auth = this.authService.getAuth();
    this.formGroup = this.fb.group({
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(VALIDATOR_PATTERNS.PHONE_NUMBER),
        ],
      ],
      otpCode: ['', [Validators.pattern(VALIDATOR_PATTERNS.OTP_CODE)]],
      password: [''],
    });
  }

  ngAfterViewInit(): void {
    this.recaptcha = new RecaptchaVerifier(
      'recaptcha',
      { size: 'invisible' },
      this.auth
    );
    this.recaptcha.render();
  }

  async login() {
    if (!this.valid) return;
    this.error = false;
    switch (this.mode) {
      case 'otp':
        return this.logInWithOtp();
      case 'password':
        return this.logInWithPassword();
    }
  }

  private async logInWithPassword() {
    //
  }

  private async logInWithOtp() {
    try {
      this.isLoading = true;
      let credential = PhoneAuthProvider.credential(
        this.confirmationResult.verificationId,
        this.otpCode.value
      );
      await signInWithCredential(this.auth, credential);
      this.router.navigate(['']);
    } catch (e) {
      this.isLoading = false;
      this.otpCode.setValue('');
      this.handleError(e);
    }
  }

  setLoginMode(mode: 'password' | 'otp') {
    this.mode = mode;
    this.loaded = true;
  }

  async sendOTP() {
    if (this.loaded) return;
    this.loaded = true;
    this.setLoginMode('otp');
    this.confirmationResult = await signInWithPhoneNumber(
      this.auth,
      this.localPhone,
      this.recaptcha
    );
    requestAnimationFrame(() => {
      document.querySelector<HTMLInputElement>('input#otpCode')?.focus();
    });
  }

  changePhone(): void {
    this.error = this.loaded = false;
    this.mode = undefined;
    this.formGroup.reset();
    requestAnimationFrame(() => {
      document.querySelector<HTMLInputElement>('input#phoneNumber')?.focus();
      document.querySelector<HTMLInputElement>('input#phoneNumber')?.select();
    });
  }

  private handleError(err: any) {
    this.error = true;
    switch (err.message) {
      case 'auth/invalid-verification-code':
        this.errorMessage = 'Invalid verification code';
        break;
      default:
        this.errorMessage = 'Something went wrong';
    }
  }

  get phoneNumber() {
    return this.formGroup.get('phoneNumber');
  }

  get otpCode() {
    return this.formGroup.get('otpCode');
  }

  get password() {
    return this.formGroup.get('password');
  }

  get localPhone() {
    let phoneNumber: string = this.phoneNumber.value;
    if (phoneNumber.slice(0, 1) === '+') return phoneNumber;
    if (phoneNumber.slice(0, 2) === '09') return `+959${phoneNumber.slice(2)}`;
    return `+${phoneNumber}`;
  }

  get valid() {
    return this.loaded && this.formGroup.valid;
  }
}
