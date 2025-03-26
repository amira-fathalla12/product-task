import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRecipes } from '../../../../admin/modules/recipes/models/IRecipes';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor(private _httpClient:HttpClient) { }
  getAllFavorite():Observable<IRecipes>{
    return this._httpClient.get<IRecipes>("userRecipe")
  }
  addFavorite(recipeId:number):Observable<IRecipes>{
    return this._httpClient.post<IRecipes>("userRecipe/", {recipeId})
  }
  deleteFavorite(recipeId:number):Observable<IRecipes>{
    return this._httpClient.delete<IRecipes>("userRecipe/" + recipeId)
  }
}
