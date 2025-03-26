import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICategory } from 'src/app/feature/dashboard/modules/admin/modules/categories/models/ICategory';
import { IRecipes } from '../../models/IRecipes';
import { FavoritesService } from 'src/app/feature/dashboard/modules/user/modules/favorites/services/favorites.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-recipes',
  templateUrl: './view-recipes.component.html',
  styleUrls: ['./view-recipes.component.scss']
})
export class ViewRecipesComponent {

  constructor(
    private toast:ToastrService,
    private _favoritesService:FavoritesService,
    public dialogRef: MatDialogRef<ViewRecipesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {recipe: IRecipes, showFav: boolean},
  ) {
    console.log(data)
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  addFavorites(id:number){
    this._favoritesService.addFavorite(id).subscribe({
      next: () => {
        this.toast.success('added to favorites successfully!');
        this.closeDialog()
      },
      error: (err) => {
        this.toast.error('Failed to delete from favorites');
        console.error(err);
      }
    })
  }
}

