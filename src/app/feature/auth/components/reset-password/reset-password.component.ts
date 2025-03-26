import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  resPassForm!:FormGroup;
  showPassword:boolean = false
  showConfirmPassword:boolean = false
  isLoading:boolean = false
  resMsg:string = ''
  private readonly fb = inject(FormBuilder)
  private readonly _authService = inject(AuthService)
  private readonly toastr = inject(ToastrService)
  private readonly router = inject(Router)

  constructor(){
    this.resPassForm = this.fb.group({
      email: [localStorage.getItem('email'), [Validators.email, Validators.required]],
      seed: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/)]],
      confirmPassword: [null, Validators.required]
    }, { validator: this.checkPasswords })
  }

  sendReq(){
    this.isLoading = true
    this._authService.resPass(this.resPassForm.value).subscribe({
      next: (res:any) => {
        this.isLoading = false
        this.resMsg = res.message
      },
      error: (err) =>{
        this.isLoading = false
        this.toastr.error(err.error.message,'Error')
      },
      complete: () => {
        localStorage.removeItem('email')
        this.toastr.success(this.resMsg,'Successfully')
        this.router.navigateByUrl('home')
      }
    })
  }

  toggleShowPass(): void{
    this.showPassword = !this.showPassword
  }

  toggleShowConfirmPass(): void{
    this.showConfirmPassword = !this.showConfirmPassword
  }

  checkPasswords(g:AbstractControl) {
    const password = g.get('password')?.value;
    const confirmPassword = g.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true }
  }
}

