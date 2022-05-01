import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  ConfirmationResult,
  PhoneAuthProvider,
  RecaptchaVerifier,
  signInWithCredential,
  signInWithPhoneNumber,
} from 'firebase/auth';
import { VALIDATOR_PATTERNS } from 'src/app/app.config';
import { expandCollapse } from 'src/app/shared/animations/expand-collapse';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
    '.mat-form-field-wrapper { padding-bottom: 0.6rem; }',
    '.mat-hint { padding-top: 7px; }',
  ],
  encapsulation: ViewEncapsulation.None,
  animations: [expandCollapse],
})
export class LoginComponent implements OnInit {
  isSentingOTP = false;
  isSentOTP = false;
  isLoading = false;
  isLoaded = false;
  formGroup: FormGroup;
  error = false;
  errorMessage = '';

  @ViewChild('otpRef') otpRef: ElementRef;
  @ViewChild('msisdnRef') msisdnRef: ElementRef;

  private recaptcha: RecaptchaVerifier;
  private confirmationResult: ConfirmationResult;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      msisdn: [
        '',
        [
          Validators.required,
          Validators.pattern(VALIDATOR_PATTERNS.PHONE_NUMBER),
        ],
      ],
      otpCode: ['', [Validators.pattern(VALIDATOR_PATTERNS.OTP_CODE)]],
    });
  }

  private renderRecaptcha() {
    this.isSentingOTP = true;
    this.recaptcha = new RecaptchaVerifier(
      'recaptcha',
      { size: 'invisible' },
      this.authService.getAuth()
    );
    return this.recaptcha.render();
  }

  login() {
    this.isSentOTP ? this.logInWithOtp() : this.sendOTP();
  }

  private logInWithOtp() {
    this.isLoading = true;
    let credential = PhoneAuthProvider.credential(
      this.confirmationResult.verificationId,
      this.otpCode.value
    );
    signInWithCredential(this.authService.getAuth(), credential)
      .then(() => this.router.navigate(['']))
      .catch((e) => {
        this.isLoading = false;
        this.otpCode.reset();
        this.handleError(e);
      });
  }

  async sendOTP() {
    this.clearError();
    this.recaptcha || (await this.renderRecaptcha());
    this.confirmationResult = await signInWithPhoneNumber(
      this.authService.getAuth(),
      this.localPhone,
      this.recaptcha
    );
    this.isSentingOTP = false;
    this.isSentOTP = true;
    requestAnimationFrame(() => this.otpRef.nativeElement.focus());
  }

  changePhone(): void {
    this.isSentOTP = this.isSentingOTP = false;
    this.clearError();
    this.otpCode.reset();
    requestAnimationFrame(() => this.msisdnRef.nativeElement.focus());
  }

  private clearError() {
    this.error = false;
    this.errorMessage = '';
  }

  private handleError(err: any) {
    this.error = true;
    switch (err.code) {
      case 'auth/invalid-verification-code':
        this.errorMessage = 'Invalid verification code';
        this.otpCode.reset();
        requestAnimationFrame(() => this.otpRef.nativeElement.focus());
        break;
      default:
        this.errorMessage = err.message;
    }
  }

  get msisdn() {
    return this.formGroup.get('msisdn');
  }

  get otpCode() {
    return this.formGroup.get('otpCode');
  }

  get localPhone() {
    let msisdn: string = this.msisdn.value;
    if (msisdn.slice(0, 1) === '+') return msisdn;
    if (msisdn.slice(0, 2) === '09') return `+959${msisdn.slice(2)}`;
    return `+${msisdn}`;
  }
}
