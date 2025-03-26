import { Component, OnInit } from '@angular/core';
import { IRecipes } from './models/IRecipes';
import { IResponse } from './models/IResponse';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { IDialogData } from './models/IDialogData';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';
import { RecipesService } from './services/recipes.service';
import { ViewRecipesComponent } from './components/view-recipes/view-recipes.component';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  pageSize:number = 10
  pageNumber:number = 1
  tableResponse?:IResponse<IRecipes[]>
  pageEvent?: PageEvent;
  resName:string = ''
  searchVal:string = ''
  tagId = 0
  catId = 0
  baseUrl = environment.baseUrl ;
  tagList:any = []
  categoriesList:any = []
  constructor(
    private _recipesService:RecipesService,
    public dialog: MatDialog,
    private _toastr: ToastrService,
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
      data: { recipe },
    });

    dialogRef.afterClosed().subscribe((result: IDialogData) => {
      console.log(result)
    });
  }

  openDeleteDialog(recipes :IRecipes){
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {cat: recipes, type: "recipes"},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(recipes)
      if(result?.action === 'delete'){
        this._recipesService.deleteRecipe(recipes.id).subscribe({
          next: () => this.resName = recipes.name,
          error: () => this._toastr.error('Please make sure to enter the recipes name correctly ', 'Error'),
          complete: () => {
            this._toastr.success(this.resName + ' recipes deleted successfully')
            this.getAllRecipes()
          }
        })
      }
    });
  }
}

