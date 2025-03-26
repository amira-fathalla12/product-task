import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRecipes } from '../models/IRecipes';
import { IResponse } from '../models/IResponse';
import { IUpdateRecipes } from '../models/IUpdateRecipes';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  constructor(private _httpClient:HttpClient) { }
  getAllRecipes(tableParams:any):Observable<IResponse<IRecipes[]>>{
    return this._httpClient.get<IResponse<IRecipes[]>>("Recipe", {params: tableParams})
  }
  addRecipe(recipe: FormData): Observable<IRecipes> {
    return this._httpClient.post<IRecipes>("Recipe", recipe);
  }
  getRecipeById(id:number){
    return this._httpClient.get<IUpdateRecipes>("Recipe/" + id)
  }
  updateRecipe(recipe: FormData): Observable<IUpdateRecipes>{
    return this._httpClient.put<IUpdateRecipes>("Recipe/" + recipe.get('id'), recipe)
  }
  deleteRecipe(id:number){
    return this._httpClient.delete("Recipe/" + id)
  }
  getTags(){
    return this._httpClient.get("tag")
  }
  getCategories() {
    const params = new HttpParams()
      .set('pageSize', '2000')
      .set('pageNumber', '1');
    return this._httpClient.get('Category', { params });
  }
}
