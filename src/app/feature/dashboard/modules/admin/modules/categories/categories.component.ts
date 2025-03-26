import { Component, OnInit} from '@angular/core';
import { CategoriesService } from './services/categories.service';
import { ICategory } from './models/ICategory';
import { IResponse } from '../../../../../../shared/models/IResponse';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { IDialogData } from './models/IDialogData';
import { AddEditViewCategoryComponent } from './components/add-edit-view-category/add-edit-view-category.component';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories: ICategory[] = [];
  pageSize:number = 10
  pageNumber:number = 1
  tableResponse?:IResponse<ICategory[]>
  pageEvent?: PageEvent;
  catName:string = ''
  searchVal:string = ''

  constructor(
    private _categoriesService:CategoriesService,
    public dialog: MatDialog,
    private _toastr: ToastrService
  ){}

  ngOnInit(): void {
    this.getAllCategories()
  }

  getAllCategories(){
    let tableParams = {
      name: this.searchVal,
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
    }
    this._categoriesService.getAllCategories(tableParams).subscribe({
      next: (res:IResponse<ICategory[]>) => {
        this.categories = res.data
        this.tableResponse = res
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  // paginator
  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageNumber = e.pageIndex;
    this.getAllCategories();
  }
  // search by name
  searchByCategoryName(e:any){
    this.searchVal = e.target.value
  }

  openDialog(category :ICategory | null, dialogType:string){
    const dialogRef = this.dialog.open(AddEditViewCategoryComponent, {
      data: { category, type: dialogType },
    });
    dialogRef.afterClosed().subscribe((result: IDialogData) => {
      if(result?.category?.name){
        switch(dialogType){
          case 'Add':
            this._categoriesService.addCategory(result.category.name).subscribe({
              next: () => this.catName = result.category.name,
              error: () => this._toastr.error('Please make sure to enter the category name correctly ', 'Error'),
              complete: () => {
                this._toastr.success(this.catName + ' category added successfully')
                this.getAllCategories()
              }
            })
            break;
          case 'Update':
              console.log(result.category.name);
              this._categoriesService.updateCategory(result.category.name, result.category.id).subscribe({
                next: (res) => this.catName = result.category.name,
                error: (err) => this._toastr.error('Please make sure to enter the category name correctly ', 'Error'),
                complete: () => {
                  this._toastr.success(this.catName + ' category Updated successfully')
                  this.getAllCategories()
                }
              })
              break;
        }
      }
    });
  }

  openDeleteDialog(category :ICategory){
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {cat: category, type: "Category"},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(category)
      if(result?.action === 'delete'){
        this._categoriesService.deleteCategory(category.id).subscribe({
          next: () => this.catName = category.name,
          error: () => this._toastr.error('Please make sure to enter the category name correctly ', 'Error'),
          complete: () => {
            this._toastr.success(this.catName + ' category deleted successfully')
            this.getAllCategories()
          }
        })
      }
    });
  }

}
