import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILogin } from '../Interfaces/ILogin';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  role:string | null = ''
  // id = 0
  constructor(private http:HttpClient) {
    if(localStorage.getItem('userToken') !== null)
    this.getProfile()
  }
  getProfile(){
    let token:any = localStorage.getItem('userToken')
    let decode:any = jwtDecode(token)
    localStorage.setItem('role', decode.userGroup)
    localStorage.setItem('userName', decode.userName)
    localStorage.setItem('email', decode.userEmail)
    // this.id = decode.userId
    this.getRole()
    return decode
  }
  getRole(){
    if(localStorage.getItem('userToken') !== null && localStorage.getItem('role') !== null ){
      this.role = localStorage.getItem('role')
    }
  }
  login(data:ILogin){
    return this.http.post("Users/Login", data)
  }
  register(data:FormData){
    return this.http.post("Users/Register", data)
  }
  ReqResPass(data:string){
    return this.http.post("Users/Reset/Request", data)
  }
  resPass(data:string){
    return this.http.post("Users/Reset", data)
  }
}
