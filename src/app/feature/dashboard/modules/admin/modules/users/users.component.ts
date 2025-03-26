import { Component } from '@angular/core';
import { IResponse } from '../../../../../../shared/models/IResponse';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { IUsers } from './models/IUsers';
import { UsersService } from './services/users.service';
import { ViewUserComponent } from './components/view-user/view-user.component';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  users: IUsers[] = [];
  pageSize:number = 10
  pageNumber:number = 1
  tableResponse?:IResponse<IUsers[]>
  pageEvent?: PageEvent;
  userName:string = ''
  searchVal:string = ''
  baseUrl = environment.baseUrl ;

    constructor(
      private _usersService:UsersService,
      public dialog: MatDialog,
      private _toastr: ToastrService
    ){}

    ngOnInit(): void {
      this.getAllUsers()
    }

    getAllUsers(){
      let tableParams = {
        userName: this.searchVal,
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
      }
      console.log(tableParams)
      this._usersService.getAllUsers(tableParams).subscribe({
        next: (res:IResponse<IUsers[]>) => {
          this.users = res.data
          this.users.forEach((item) => {
            item.imagePath = item.imagePath ? this.baseUrl + item.imagePath : "assets/users/anonymous-users.jpg"
          })
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
      this.getAllUsers();
    }
    // search by name
    searchByUsersName(e:any){
      this.searchVal = e.target.value
    }

    openDialog(user :IUsers){
      console.log(user)
      const dialogRef = this.dialog.open(ViewUserComponent, {
        data: { user },
      });
    }

    openDeleteDialog(Users :IUsers){
      const dialogRef = this.dialog.open(DeleteDialogComponent, {
        data: {cat: Users, type: "this user"},
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(Users)
        if(result?.action === 'delete'){
          this._usersService.deleteUsers(Users.id).subscribe({
            next: () => this.userName = Users.userName,
            error: () => this._toastr.error('Please make sure to enter the Users name correctly ', 'Error'),
            complete: () => {
              this._toastr.success(this.userName + ' Users deleted successfully')
              this.getAllUsers()
            }
          })
        }
      });
    }
  }
