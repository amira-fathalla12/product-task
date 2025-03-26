import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDialogData } from '../../models/IDialogData';

@Component({
  selector: 'app-add-edit-view-category',
  templateUrl: './add-edit-view-category.component.html',
  styleUrls: ['./add-edit-view-category.component.scss']
})
export class AddEditViewCategoryComponent {

temporaryData: IDialogData;
  constructor(
    public dialogRef: MatDialogRef<AddEditViewCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogData,
  ) {
    if (data.category !== null) {
      this.temporaryData = JSON.parse(JSON.stringify(data));
    }
    else {
      this.temporaryData = { category: { id: 0, name: '', creationDate: '', modificationDate: '' }, type: data.type };
    }
  }

  closeDialog(): void {
    this.dialogRef.close({ category: this.temporaryData.category });
  }
}
