import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'firebase/auth';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  user: User;
  error = false;
  errorMessage = '';
  formGroup: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder) {}

  ngOnInit(): void {
    const user = (this.user = this.authService.getCurrentUser());

    this.formGroup = this.fb.group({
      displayName: user.displayName || '',
      photoURL: user.photoURL || 'assets/img/avatar.png',
      phoneNumber: user.phoneNumber || '',
      password: '',
    });
  }

  async saveChanges() {
    const form = this.formGroup;
    this.error = false;
    try {
      if (form.controls.photoURL.touched || form.controls.displayName.touched) {
        await this.authService.updateProfile(this.user, {
          displayName: form.controls.displayName.value,
          photoURL: form.controls.photoURL.value,
        });
      }
      if (form.controls.password.touched) {
        await this.authService.updatePassword(
          this.user,
          form.controls.password.value
        );
      }
    } catch (e) {
      this.error = true;
      this.errorMessage = e.message;
    }
  }
}
