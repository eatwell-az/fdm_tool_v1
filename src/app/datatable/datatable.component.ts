import { Component, OnInit, ViewChild, ElementRef, Renderer2, ViewChildren, Inject } from '@angular/core';
import { DatatableService } from '../services/datatable.service';
import { DataSet, Field } from '../shared/model/cell.data';
import { FormGroup, FormControl } from '@angular/forms';
import { DataManagementService } from '../services/data-management.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FunctionDialogComponent } from '../function-dialog/function-dialog.component';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss'],
  providers: [ MatDialog ]
})
export class DatatableComponent implements OnInit {

  animal: string;
  name: string;

  inputTable: DataSet[];
  inputRows: Field[];
  inputColumns: any = [];
  cssGridInputColumnsValue: string;
  outputRows: any;
  outputTable: DataSet[];
  datatableForm: FormGroup;
  showFiller = false;
  drawerIsOpen = false;

  cleanseTooltip = 'Apply a cleansing operation';
  functionTooltip = 'Apply a function calculating operation';
  constructor(
    private datatableService: DatatableService,
    private dataManagementService: DataManagementService,
    private renderer: Renderer2,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.inputTable = this.datatableService.dataSets.filter(inputTable => inputTable.type === 'FILE');
    this.outputTable = this.datatableService.dataSets.filter(outputTable => outputTable.type === 'TABLE');

    if (this.outputTable.length > 0) {
      for (const outputRow of this.outputTable) {
        this.outputRows = outputRow.fields;
      }
    }

    this.getDatatableForm(this.inputTable);
    this.insertColumn(2);
  }

  insertColumn(qty: number) {
    const cssColumnValue = 'auto';
    const cols: string[] = [];
    for (let i = 0; i < qty; i++) {
      cols.push(cssColumnValue);
    }
    this.inputColumns = cols;
    this.cssGridInputColumnsValue = cols.join(' ');
    console.log(this.cssGridInputColumnsValue);
    console.log(this.inputColumns);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(FunctionDialogComponent, {
      width: '250px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed: ', result);
    });
  }

  drawerChanged(isOpen: boolean) {
    this.drawerIsOpen = isOpen;
  }

  getDatatableForm(inputTable: DataSet[]) {
    if (inputTable.length > 0) {
      this.inputRows = inputTable[0].fields;
      console.log(this.inputRows);
      this.inputRows.map(field => {
        if (typeof this.datatableForm === 'undefined') {
          this.datatableForm = new FormGroup({
            [field.name]: new FormControl(null)
          });
        } else {
          this.datatableForm.addControl(field.name, new FormControl(null));
        }
      });
    }
  }
}
