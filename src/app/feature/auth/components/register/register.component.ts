import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm!:FormGroup
  showPassword:boolean = false
  showConfirmPassword:boolean = false
  files: File[] = [];
  imgSrc:any;
  errorsMsgs!:string[];
  isLoading:boolean = false
  resMsg:string = ''
  private readonly fb = inject(FormBuilder)
  private readonly _authService = inject(AuthService)
  private readonly toastr = inject(ToastrService)
  constructor(){
    this.registerForm = this.fb.group({
      profileImage : [null],
      userName: [null, [Validators.required, Validators.pattern(/^(?=.*\d)[a-zA-Z\d]{1,8}$/)]],
      email: [null, [Validators.required, Validators.email]],
      country : [null, [Validators.required]],
      phoneNumber  : [null, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      password: [null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/)]],
      confirmPassword : [null, [Validators.required]]
    }, { validator: this.checkPasswords });
  }

  register(){
    this.isLoading = true
    const myData = new FormData()
    Object.keys(this.registerForm.controls).forEach((key) => {
      const value = this.registerForm.get(key)?.value
      if(value){
        myData.append(key, value)
      }
    });
    myData.append('profileImage', this.imgSrc)

    this._authService.register(myData).subscribe({
      next: (res:any) => {
        this.isLoading = false
        this.resMsg = res.message
      },
      error: (err) => {
        this.isLoading = false
        let errorsArr = err.error.additionalInfo.errors
        if(errorsArr){
          Object.entries(errorsArr).forEach(([key, value]) => {
            this.errorsMsgs = Array.isArray(value) ? value : [value];  // Ensure value is an array
            this.errorsMsgs.forEach((message: string) => {
              this.toastr.error(message, 'Error')
            });
          });
        } else {
          this.toastr.error(err.error.message, 'Error')
        }
      },
      complete: () => {
        this.toastr.success(this.resMsg,'Successfully')
      }
    })
  }

  onSelect(event:any) {
    this.files.push(...event.addedFiles);
    this.imgSrc = this.files[0]
    // console.log(this.imgSrc)
  }

  onRemove(event:any) {
    // console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
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
