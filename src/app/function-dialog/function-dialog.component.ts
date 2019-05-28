import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';


@Component({
  selector: 'app-function-dialog',
  templateUrl: './function-dialog.component.html',
  styleUrls: ['./function-dialog.component.scss']
})
export class FunctionDialogComponent implements OnInit {
  stateForm: FormGroup = this.fb.group({
    stateGroup: '',
  });

  constructor (public dialogRef: MatDialogRef<FunctionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private fb: FormBuilder) { }

  ngOnInit() { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onCancel() {
    this.dialogRef.close();
  }
}

export interface DialogData {
  formula: string;
}
