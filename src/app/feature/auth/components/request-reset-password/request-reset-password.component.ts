import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-request-reset-password',
  templateUrl: './request-reset-password.component.html',
  styleUrls: ['./request-reset-password.component.scss']
})
export class RequestResetPasswordComponent {

  reqResPassForm!:FormGroup;
  resMsg:string = ''
  isLoading:boolean = false
  private readonly fb = inject(FormBuilder)
  private readonly _authService = inject(AuthService)
  private readonly toastr = inject(ToastrService)
  private readonly router = inject(Router)
  constructor(){
    this.reqResPassForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]]
    })
  }
  sendReq(){
    this.isLoading = true
    this._authService.ReqResPass(this.reqResPassForm.value).subscribe({
      next: (res:any) => {
        this.isLoading = false
        this.resMsg = res.message
      },
      error: (err) =>{
        this.toastr.error(err.error.message, 'Error')
      },
      complete: () => {
        this.toastr.success(this.resMsg,'Successfully')
        localStorage.setItem('email', this.reqResPassForm.value.email)
        this.router.navigateByUrl('auth/reset-password')
      }
    })
  }
  get email() {
    return this.reqResPassForm.get('email');
  }
}
