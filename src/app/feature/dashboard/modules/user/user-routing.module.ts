import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from 'src/app/shared/not-found/not-found.component';
import { HomeComponent } from 'src/app/shared/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'user-recipe', loadChildren: () => import('./modules/user-recipe/user-recipe.module').then(m => m.UserRecipeModule) },
  { path: 'favorites', loadChildren: () => import('./modules/favorites/favorites.module').then(m => m.FavoritesModule) },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
