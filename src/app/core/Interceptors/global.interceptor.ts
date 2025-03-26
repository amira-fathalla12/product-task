import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class GlobalInterceptor implements HttpInterceptor {
  baseUrl = "https://upskilling-egypt.com:3006/api/v1/"
  constructor() {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('userToken')
    let newReq = request.clone ({
      url: this.baseUrl + request.url,
      setHeaders: {
        "Authorization": `${token}`
      }
    })
    return next.handle(newReq);
  }


  getBaseUrl(): string {
    return this.baseUrl
  }
}
