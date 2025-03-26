import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/feature/auth/services/auth.service';
import { ProfileService } from './services/profile.service';
import { IProfile } from './models/IProfile';
import { environment } from 'src/environments/environment.development';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  userImage: string | null = null;
  baseUrl = environment.baseUrl;
  isPasswordVisible: { [key: string]: boolean } = {
    password: false,
    confirmPassword: false,
  };

  error!: string;
  files: File[] = [];

  constructor(
    private profileService: ProfileService,
    private fb: FormBuilder,
    private toast: ToastrService,
  ) {}

  ngOnInit() {
    this.profileForm = this.fb.group({
      email: [''],
      userName: [''],
      phoneNumber: [''],
      country: [''],
      password: [''],
      confirmPassword: ['']
    });

    this.loadProfile();
  }

  loadProfile() {
    this.profileService.getUserProfile().subscribe({
      next: (profile: IProfile) => {
        this.profileForm.patchValue(profile);
        this.userImage = profile.imagePath ? `${this.baseUrl}/${profile.imagePath}` : null;
      },
      error: (err) => this.toast.error('Failed to load profile')
    });
  }

  onSelect(event: { addedFiles: File[] }) {
    this.files.push(...event.addedFiles);
  }

  onRemove(event: File) {
    this.files = this.files.filter(file => file !== event);
  }

  togglePasswordVisibility(field: string): void {
    this.isPasswordVisible[field] = !this.isPasswordVisible[field];
  }

  private buildFormData(formGroup: FormGroup, fileFields: { [key: string]: File }): FormData {
    const formData = new FormData();
    Object.keys(formGroup.controls).forEach(key => {
      formData.append(key, formGroup.get(key)?.value);
    });

    Object.keys(fileFields).forEach(key => {
      formData.append(key, fileFields[key]);
    });

    return formData;
  }

  onChangeProfile() {
    const form = this.buildFormData(this.profileForm, { profileImage: this.files[0] });
    this.profileService.updateUser(form).subscribe({
      next: () => {
        this.toast.success('Profile updated successfully');
      },
      error: (err) => this.toast.error(err.error.message)
    });
  }

  get email() {
    return this.profileForm.get('email');
  }

  get userName() {
    return this.profileForm.get('userName');
  }

  get phoneNumber() {
    return this.profileForm.get('phoneNumber');
  }

  get country() {
    return this.profileForm.get('country');
  }

  get confirmPassword() {
    return this.profileForm.get('confirmPassword');
  }
}
