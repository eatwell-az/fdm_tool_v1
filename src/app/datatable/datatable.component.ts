import { Component, OnInit } from '@angular/core';
import { DatatableService } from '../services/datatable.service';
import { DataSet, Field, InputRow, InputObject, Step } from '../shared/model/cell.data';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTooltip } from '@angular/material';
import { FunctionDialogComponent } from '../function-dialog/function-dialog.component';
import { CleanseOperation } from '../shared/model/cleanse.operation';
import { SafePipe } from '../pipes/safe.pipe';
import { CellTableManagementService } from '../services/cell-table-management.service';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss'],
  providers: [ MatDialog, SafePipe ]
})
export class DatatableComponent implements OnInit {

  inputTable: DataSet[];
  inputFields: Field[];
  inputObject: InputObject;
  inputColumns: string[];
  outputRows: Field[];
  outputTable: DataSet[];
  datatableForm: FormGroup;
  drawerIsOpen = false;
  stepCountCss = 'grid-template-columns: repeat(' + this.datatableService.currentStep + ', 1fr) 65px';
  tooltipObj = {
    cleanseTooltip: {
      general: 'Cleanse...',
      trim: 'Trim',
      case: 'Lower Case',
      round: 'Round',
      select: `Cell chooser...`
   },
    functionTooltip: {
      general: 'Function...'
    },
    decisionTable: {
      general: 'Decision Table...'
    }
  };

  constructor(
    private datatableService: DatatableService,
    private cellManagement: CellTableManagementService,
    public dialog: MatDialog,
    private safe: SafePipe) { }

  ngOnInit() {
    this.inputTable = this.datatableService.dataSets.filter(inputTable => inputTable.type === 'FILE');
    this.outputTable = this.datatableService.dataSets.filter(outputTable => outputTable.type === 'TABLE');

    const { fields } = this.inputTable[0];
    this.inputObject = this.datatableService.getInputObject(fields);

    if (this.outputTable.length > 0) {
      for (const outputRow of this.outputTable) {
        this.outputRows = outputRow.fields;
      }
    }
    // this.getDatatableForm(this.inputRows);

  }

/*   gridTemplateColumnCss(columnsInPercent, columnQuantity) {

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
  } */

  applyCleanse(cleanseType: string, inputRowId: number) {
    const newStep = this.makeNewStep();
    for (let i = 0; i < this.inputObject.rows.length; i++) {
      if( inputRowId === this.inputObject.rows[i].id) {
        this.inputObject.rows[i].steps.push(newStep);

        this.cellManagement.currentStepCount = this.cellManagement.currentStepCount + 1;
        this.inputObject.currentStepCount = this.inputObject.currentStepCount + 1;
      }
      // row[i].steps.push(newStep);
    }

    const newStepPackage: NewStepPackage = {
      data: cleanseType,
      inputRowId,
      stepType: 'CLEANSING'
    };

    this.stepCountCss = 'grid-template-columns: repeat(' + this.inputObject.currentStepCount + ', 1fr) 65px';
  }

  makeNewStep(): Step {
    const step: Step = {
      id: 2,
      operationSourceId: 1,
      postStep: 'New Step!',
      preStep: 'pre',
      sortOrder: 2,
      style: 'grid-column: 2 / 3',
      type: 'CLEANSING'
    };

    return step;
  }
/*   setColumns(qty: number) {
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
  } */

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

  getDatatableForm(inputRows: InputRow[]) {
    if (inputRows.length > 0) {

      /*this.inputRows.map(row => {
         if (typeof this.datatableForm === 'undefined') {
          this.datatableForm = new FormGroup({
            [field.name]: new FormControl(null)
          });
        } else {
          this.datatableForm.addControl(field.name, new FormControl(null));
        } 
      });*/
    }
  }


}

export interface NewStepPackage {
  stepType: string;
  data: any;
  inputRowId: number;
}
