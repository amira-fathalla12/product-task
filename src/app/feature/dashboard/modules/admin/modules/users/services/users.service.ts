import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponse } from '../../recipes/models/IResponse';
import { IUsers } from '../models/IUsers';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _httpClient:HttpClient) { }

  getAllUsers(tableParams:any):Observable<IResponse<IUsers[]>>{
    return this._httpClient.get<IResponse<IUsers[]>>("Users", {params: tableParams})
  }
  deleteUsers(id:number){
    return this._httpClient.delete("Users/" + id)
  }
}
