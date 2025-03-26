import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICategory } from 'src/app/feature/dashboard/modules/admin/modules/categories/models/ICategory';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent {
  // currentData?:ICategory
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {cat: ICategory, type: string},
  ) {
    // console.log(data.cat.name)
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  deleteItem(): void {
    this.dialogRef.close({action: "delete"});
  }
}
