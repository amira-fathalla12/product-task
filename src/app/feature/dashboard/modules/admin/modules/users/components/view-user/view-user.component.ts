import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IUsers } from '../../models/IUsers';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent {

    constructor(
      public dialogRef: MatDialogRef<ViewUserComponent>,
      @Inject(MAT_DIALOG_DATA) public data: {user: IUsers},
    ) {
      console.log(data)
    }

    closeDialog(): void {
      this.dialogRef.close();
    }
}
