import { Component, OnInit } from '@angular/core';
import { DatatableService } from '../services/datatable.service';
import { DataSet, Field, InputRow, InputObject, Step, ICONS } from '../shared/model/cell.data';
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

  stepCountCss = 'grid-template-columns: repeat(' + this.cellManagement.currentStepCount + ', 1fr) 65px';
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
    public cellManagement: CellTableManagementService,
    public dialog: MatDialog,
    private safe: SafePipe) { }

  ngOnInit() {
    this.inputTable = this.datatableService.dataSets.filter(inputTable => inputTable.type === 'FILE');
    this.outputTable = this.datatableService.dataSets.filter(outputTable => outputTable.type === 'TABLE');
    console.log(this.inputTable);
    const { fields } = this.inputTable[0];
    // this.inputObject = this.cellManagement.buildInputObject(fields);
    this.inputObject = this.cellManagement._makeInputObject(fields);

    if (this.outputTable.length > 0) {
      for (const outputRow of this.outputTable) {
        this.outputRows = outputRow.fields;
      }
    }
  }

  /*gridTemplateColumnCss(columnsInPercent, columnQuantity) {

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
  }*/
  _makeNewFormulaRow(step: Step, inputRow: InputRow) {
    const icon = ICONS.find(i => i.name === 'dependent');
    this.cellManagement._updateInputRow(inputRow, icon);
  }

  _applyCleanse(cleanseOption: CleanseOperation, inputRow: InputRow) {
    const currentRowValue = this.inputObject.rows.filter(row => row.id === inputRow.id);
    const icon = ICONS.find(i => i.name === cleanseOption.name);
    this.cellManagement._updateInputRow(inputRow, icon);
    // this.cellManagement._remodelSteps();
  }

  /*applyCleanse(cleanseType: string, inputRowId: number) {
    let stepIcon: Icon;

    if (cleanseType === 'trim') {
      stepIcon = 'crop';
    } else if (cleanseType === 'case') {
      stepIcon = 'text_format';
    } else if (cleanseType === 'round') {
      stepIcon = 'all_out';
    }

    const currentRowValue = this.inputObject.rows.filter(row => row.id === inputRowId);
    const newStepPackage: NewStepPackage = {
      postStep: currentRowValue[0].currentValue,
      inputRowId,
      stepType: 'CLEANSING',
      data: cleanseType
    };

    this.cellManagement.remodelSteps(this.inputObject, inputRowId);

    for (let i = 0; i < this.inputObject.rows.length; i++) {
      if (inputRowId === this.inputObject.rows[i].id) {
        newStepPackage.appliedToStep = this.inputObject.rows[i].steps[this.inputObject.rows[i].steps.length - 1];
        const newStep = this.cellManagement.makeNewStep(newStepPackage, stepIcon);

        for (const cleanseOption of this.inputObject.rows[i].cleanseOperations) {
          if (cleanseOption.name === cleanseType) {
            cleanseOption.isApplied = true;
          }
        }
        this.inputObject.rows[i].steps.push(newStep);
      }
    }
  }*/

  openDialog(): void {
    const dialogRef = this.dialog.open(FunctionDialogComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.cellManagement.addRow();
    });
  }

  drawerChanged(isOpen: boolean) {
    this.drawerIsOpen = isOpen;
  }
}

export interface NewStepPackage {
  stepType: string;
  postStep: any;
  data: any;
  appliedToStep?: Step | null;
  inputRowId: number;
}
