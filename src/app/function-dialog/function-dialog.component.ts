import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-function-dialog',
  templateUrl: './function-dialog.component.html',
  styleUrls: ['./function-dialog.component.scss']
})
export class FunctionDialogComponent implements OnInit {

  constructor (public dialogRef: MatDialogRef<FunctionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

export interface DialogData {
  animal: string;
  name: string;
}
