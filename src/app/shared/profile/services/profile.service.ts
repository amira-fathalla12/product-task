import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProfile } from '../models/IProfile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http:HttpClient) {}

  getUserProfile (): Observable<IProfile> {
    return this.http.get<IProfile>('Users/currentUser');
  }
  updateUser (data: FormData) {
    return this.http.put('Users', data);
  }
}
