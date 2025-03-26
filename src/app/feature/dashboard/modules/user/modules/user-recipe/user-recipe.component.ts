import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { IResponse } from 'src/app/shared/models/IResponse';
import { ViewRecipesComponent } from '../../../admin/modules/recipes/components/view-recipes/view-recipes.component';
import { IDialogData } from '../../../admin/modules/recipes/models/IDialogData';
import { IRecipes } from '../../../admin/modules/recipes/models/IRecipes';
import { RecipesService } from '../../../admin/modules/recipes/services/recipes.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-user-recipe',
  templateUrl: './user-recipe.component.html',
  styleUrls: ['./user-recipe.component.scss']
})
export class UserRecipeComponent {

pageSize:number = 10
  pageNumber:number = 1
  tableResponse?:IResponse<IRecipes[]>
  pageEvent?: PageEvent;
  resName:string = ''
  searchVal:string = ''
  tagId = 0
  catId = 0
  baseUrl = environment.baseUrl
  tagList:any = []
  categoriesList:any = []
  constructor(
    private _recipesService:RecipesService,
    public dialog: MatDialog,
  ){}

  ngOnInit(): void {
    this.getAllRecipes()
    this.getTags();
    this.getCategories();
  }

  getTags(){
    this._recipesService.getTags().subscribe({
      next: (res) => {
        this.tagList = res
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  getCategories(){
    this._recipesService.getCategories().subscribe({
      next: (res:any) => {
        this.categoriesList = res.data
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  getAllRecipes(){
    let tableParams = {
      name: this.searchVal,
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      tagId: this.tagId,
      categoryId: this.catId,
    }
    this._recipesService.getAllRecipes(tableParams).subscribe({
      next: (res:IResponse<IRecipes[]>) => {
        this.tableResponse = res
        this.tableResponse.data.forEach((item) => {
          item.imagePath = item.imagePath ? this.baseUrl + item.imagePath : ""
        })
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  clearFilter(){
    this.searchVal = ''
    this.catId= 0
    this.tagId = 0
    this.getAllRecipes()
  }
  // paginator
  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageNumber = e.pageIndex;
    this.getAllRecipes();
  }
  openViewDialog(recipe:IRecipes){
    const dialogRef = this.dialog.open(ViewRecipesComponent, {
      data: { recipe, showFav: true },
    });

    dialogRef.afterClosed().subscribe((result: IDialogData) => {
      console.log(result)
    });
  }
}
