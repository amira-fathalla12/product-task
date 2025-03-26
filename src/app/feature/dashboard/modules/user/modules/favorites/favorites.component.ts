import { Component, OnInit } from '@angular/core';
import { FavoritesService } from './services/favorites.service';
import { IResponse } from 'src/app/shared/models/IResponse';
import { IRecipes } from '../../../admin/modules/recipes/models/IRecipes';
import { environment } from 'src/environments/environment.development';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  favorites:any[] = []
  baseUrl = environment.baseUrl;
  constructor(private _favoritesService:FavoritesService, private toast:ToastrService) {}
  ngOnInit(): void {
    this.getAllFavorites()
  }

  getAllFavorites(){
    this._favoritesService.getAllFavorite().subscribe((res:any) => {
      this.favorites = res.data
      this.favorites.forEach((item:any) => {
        item.recipe.imagePath = item.recipe.imagePath ? this.baseUrl + item.recipe.imagePath : ""
      })
      console.log(this.favorites)
    })
  }
  deleteFav(id: number) {
    this._favoritesService.deleteFavorite(id).subscribe({
      next: () => {
        this.toast.success('Deleted from favorites successfully!');
        this.getAllFavorites(); 
      },
      error: (err) => {
        this.toast.error('Failed to delete from favorites');
        console.error(err);
      }
    });
  }

}
