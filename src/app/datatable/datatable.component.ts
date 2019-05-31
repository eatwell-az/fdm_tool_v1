import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DatatableService } from '../services/datatable.service';
import { DataSet, Field, InputRow, InputObject, Step, ICONS, Icon } from '../shared/model/cell.data';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTooltip, MatSnackBar } from '@angular/material';
import { FunctionDialogComponent } from '../function-dialog/function-dialog.component';
import { CleanseOperation } from '../shared/model/cleanse.operation';
import { SafePipe } from '../pipes/safe.pipe';
import { CellTableManagementService } from '../services/cell-table-management.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import * as _ from 'lodash';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss'],
  animations: [
    trigger('columnState', [
      state('columnAdded', style({
        // transform: 'scaleX(0.2)'
      })),
      state('columnReady', style({
        // transform: 'scaleX(0.5)'
      })),
      transition('columnAdded <=> columnReady', animate(300))
    ])
  ],
  providers: [ MatDialog, SafePipe ]
})
export class DatatableComponent implements OnInit {
  durationInSeconds = 5;
  state = 'columnAdded';
  inputTable: DataSet[];
  inputFields: Field[];
  inputObject: InputObject;
  inputColumns: string[];
  outputRows: Field[];
  outputTable: DataSet[];
  drawerIsOpen = false;
  cssInputColumnsValue: any;
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
    private safe: SafePipe,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.inputTable = this.datatableService.dataSets.filter(inputTable => inputTable.type === 'FILE');
    this.outputTable = this.datatableService.dataSets.filter(outputTable => outputTable.type === 'TABLE');

    const { fields } = this.inputTable[0];

    this.inputObject = this.cellManagement.makeInputObject(fields);
    this.cellManagement.rowGridColumnChanged
      .pipe()
      .subscribe(result => {
        this.onRowGridColumnChanged(result);
      });
    if (this.outputTable.length > 0) {
      for (const outputRow of this.outputTable) {
        this.outputRows = outputRow.fields;
      }
    }
  }

  openSnackBar(message: string) {
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: this.durationInSeconds * 1000,
      data: message
    });
  }

  makeNewFormulaRow(step: Step, inputRow: InputRow) {
    if (!step.isPlaceholder) {
      const icon: Icon = ICONS.find(i => i.name === 'dependent');
      this.cellManagement.updateInputRow(inputRow, icon, step);
    } else {
      this.openSnackBar('Placeholder cells cannot contain formulas');
    }
  }

  applyCleanse(cleanseOption: CleanseOperation, inputRow: InputRow, step: Step) {
    const icon: Icon = ICONS.find(i => i.name === cleanseOption.name);
    this.cellManagement.updateInputRow(inputRow, icon, step);
  }

  onRowGridColumnChanged(cssColumnData: any) {
    this.state === 'columnAdded' ? this.state = 'columnReady' : this.state = 'columnAdded';
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(FunctionDialogComponent, {
      width: '850px',
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
