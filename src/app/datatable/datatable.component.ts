import { Component, OnInit, ViewChild, ElementRef, Renderer2, ViewChildren, Inject } from '@angular/core';
import { DatatableService } from '../services/datatable.service';
import { DataSet, Field } from '../shared/model/cell.data';
import { FormGroup, FormControl } from '@angular/forms';
import { DataManagementService } from '../services/data-management.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FunctionDialogComponent } from '../function-dialog/function-dialog.component';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss'],
  providers: [ MatDialog ]
})
export class DatatableComponent implements OnInit {

  inputTable: DataSet[];
  inputRows: Field[];
  inputColumns: any = [];
  cssInputColumnsValue = { gridTemplateColumns: 'auto' };
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
    this.setColumns(1);
  }


  gridTemplateColumnCss(columnsInPercent, columnQuantity) {

    checkPercentTotal();

    function checkPercentTotal() {
      if (((100 / columnQuantity) % 2) > 1) {
        const lastColumnPercent = columnsInPercent[columnsInPercent.length - 1];
        const paddingLastColumnToTotal100 = lastColumnPercent + 1;
        columnsInPercent.splice((columnsInPercent.length - 1), 1, paddingLastColumnToTotal100);
      }
    }

    if (columnQuantity > 1) {
      let newRowWidth = 0;
      let previousColumns = '';
      for (let i = 0; i < (columnsInPercent.length - 1); i++) {
        previousColumns += 'auto ';
      }
      const animateColumnInsertion = setInterval(() => {
        if(newRowWidth < 1) {
          this.inputColumns = columnsInPercent;
        }
        newRowWidth += 1;
        if (newRowWidth === columnsInPercent[columnsInPercent.length - 1]) {
          clearInterval(animateColumnInsertion);
        }
        const gridValues = previousColumns + newRowWidth + '%';
        console.log(gridValues);
        this.cssInputColumnsValue = { gridTemplateColumns: gridValues };
      }, 5);
    }
  }

  setColumns(qty: number) {
    const colPercentWidths = Math.round(100 / qty);
    const arr = [];
    if (qty > 1) {
      for (let i = 0; i < qty; i++) {
        arr.push(colPercentWidths);
      }
    } else {
      arr.push('auto');
      this.inputColumns = arr;
    }

    this.gridTemplateColumnCss(arr, qty);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(FunctionDialogComponent, {
      width: '250px',
      data: {}
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
