import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICategory } from '../models/ICategory';
import { IResponse } from '../../../../../../../shared/models/IResponse';
import { IUpdateCategory } from '../models/IUpdateCategory';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private _httpClient:HttpClient) { }
  getAllCategories(tableParams:any):Observable<IResponse<ICategory[]>>{
    return this._httpClient.get<IResponse<ICategory[]>>("Category", {params: tableParams})
  }
  addCategory(name: string): Observable<ICategory>{
    return this._httpClient.post<ICategory>("Category", {name})
  }
  updateCategory(name: string, id:number): Observable<IUpdateCategory>{
    return this._httpClient.put<IUpdateCategory>("Category/" + id, {name})
  }
  deleteCategory(id:number){
    return this._httpClient.delete("Category/" + id)
  }
}
