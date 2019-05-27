import { Injectable } from '@angular/core';
import { Step, Field, InputRow, InputObject, FormulaField, Icon, ICONS, RowType, FormulaDependency } from '../shared/model/cell.data';
import { CLEANSE_OPERATIONS, CleanseOperation, CleanseOption } from '../shared/model/cleanse.operation';
import { NewStepPackage } from '../datatable/datatable.component';

@Injectable({
  providedIn: 'root'
})
export class CellTableManagementService {
  currentStepCount: number;
  sortOrder: number;
  inputObject: InputObject;
  stepsArrLength: number;

  constructor() {
    this.currentStepCount = 1;
    this.sortOrder = 1;
  }

  /*incrementStepCount(step: number) {
     if (step === this.currentStepCount) {
      this.currentStepCount++;
    } 
  }*/

  /*makeNewStep(stepPackage: NewStepPackage, icon: Icon): Step {

     this.currentStepCount++;

    const step: Step = {
      id: stepPackage.appliedToStep.id + 1,
      operationSourceId: stepPackage.appliedToStep.id,
      postStep: stepPackage.postStep,
      preStep: 'pre',
      sortOrder: stepPackage.appliedToStep.sortOrder,
      style: 'grid-column: ',
      startColumn: this.currentStepCount,
      endColumn: (this.currentStepCount + 1),
      type: 'CLEANSING',
      stepIcon: icon
    };

    return step; 
  }*/

  /*remodelSteps( alteredRowId) {
     for (const row of this.inputObject.rows) {
      if (alteredRowId !== row.id) {
        row.steps[row.steps.length - 1].endColumn = row.steps[row.steps.length - 1].endColumn + 1;
      }
    } 
  }*/

  /*buildInputObject(fields: Field[]): InputObject {
     const rows: InputRow[] = [];

    for (const field of fields) {

      const step: Step = {
        id: 1,
        operationSourceId: 0,
        postStep: field.name,
        preStep: null,
        sortOrder: 0,
        type: 'INPUT',
        startColumn: this.currentStepCount,
        endColumn: (this.currentStepCount + 1),
        style: 'grid-column: ',
        stepIcon: ICONS.find(i => i.name === 'input')
      };

      const cleanseOptions: CleanseOperation[] = [];
      for (const cOption of CLEANSE_OPERATIONS) {
        if (field.dataType === cOption.dataType) {
          const {dataType, icon, id, isApplied, name, operation} = cOption;
          const cleanseOption = new CleanseOption(id, dataType, name, icon, operation, isApplied);
          cleanseOptions.push(cleanseOption);
        }
      }

      const inputRow: InputRow = {
        field,
        id: field.id,
        currentValue: field.name,
        sortOrder: this.sortOrder,
        cleanseOperations: cleanseOptions,
        steps: [step]
      };
      rows.push(inputRow);
    }

    const inputObj: InputObject = { rows };

    return inputObj;
  }*/
  /***********************************
    FORMULA FIELD REFACTOR --------->

  s = step.length
  c = column count

  1a   (X > @ > Y)  |  1a(s2)(c2)   [slotted]
  1b-d (Y)          |  1b-d(s1)(c2) [spanning]

  2b   (Y)
  X SLOTTED
  Y SPANNED
  Z FORMULA
  @ NEWCOLM
  ---------------- 1 CLEANSE:NO-SPACE --------------------
     |  |
   >a|12|** @ > X X      s(1+1*) > c(1) [action]> added new cleansing step
    b|12|'' Y               s(1) = c(1) no spanning
    c|12|'' Y
    d|12|'' Y

     |  |**|              [result]= added new colum
   =a|12|23| SLOTTED            s(2) = c(1+1*) [result]= (s1,e2)(s2,e3) no spanning
     |1.:.3| s(1) < c(2) last step must span 1
    c|1.:.3| ''
    d|1.:.3| ''

  ---------------- 2 CLEANSE:W/SPACE ----------------------
     |  |  |
     |12|23| s(2) = c(2) no spanning
   >b|1.:.3| s(1+1*) = c(2) [action]> new cleansing step added, no spanning
    c|1.:.3|
    d|1.:.3| ''

     |  |  |
    a|12|23|
   =b|12|23| s(2) = c(2) [result]= no spanning
    c|1.:.3|
    d|1.:.3|

 ------------------ 3 FORMULA:W/SPACE ---------------------
     |  |  |
    a|12|23|
    b|12|23| s(2) = c(2)
  a>c|1.:.3| s(1+1*) = c(2) a> new dependent step for new formula, no spanning
    d|1.:.3|
  b>e***[**] s(1*) < c(2) b> new formula row

     |  |  |
    a|12|23| ''
    b|12|23| ''
  a=c|12[23] s(2) = c(2) a= new formula step DEPENDENCY, no spanning
    d|1.:.3| ''
  b=e   [23] s(1) < c(2) (c - s) = 'x' b= new formula row DEPENDENCY, formula's first step skips 'x' column(s)

 ------------------4 FORMULA:NO-SPACE ----------------------
     |  |  |
  a>a|12|23[**] s(2+1*) > c(2) [action]a>: new dependent step for new formula, no spanning
    b|12|23|''
    c[12]23|''
    d|1.:.3|''
    e   [23]''
  b>f******[**]   s(1*) < c(2) [action]b> new formula row

     |  |  |**|
  a=a|12|23[34] s(3) = c(3) [result]a= new formula step DEPENDENCY
    b|12|2.:.4| ''
    c[12]2.:.4]
    d|1.:..:.4| ''
    e[12|2.:.4]
  b=f      [34] [result]b: new formula row DEPENDENCY

EPENDENCY
 -----------------------------------------
   if s < c and not formula row = last step must span the difference of c - s
   if s < c and IS formula row = first step must begin at the difference of c - s
   if s = c no spanning
   if s > c increase col count

  (s < c) = (c - s) = last step span amount (e.g. if 1 step and 3 columns then 1 step spanning 2 columns) (if 2 steps and 5 columns last child spans 3 columns: |12|2.:..:..:.6)
  ----------------------------------------
  
  (s > c) = (c + 1) = (s = c) = no spanning in this row
 -----------------------------------------
 */

  _groomGrid(inputRow: InputRow) {
    this.rowStepsToColumnsStatus(inputRow);

    for (const row of this.inputObject.rows) {
      if (row.id !== inputRow.id) {
        this.rowStepsToColumnsStatus(row);
      }
    }
  }

  slottedStep(row: InputRow) {

    for (let i = 0; i < row.steps.length; i++) {
      if (row.type === RowType.Formula) {
        row.steps[i].startColumn = row.field.dependsOn[0].step.startColumn;
        row.steps[i].endColumn = row.field.dependsOn[0].step.endColumn;
      } else {
        row.steps[i].startColumn = i + 1;
        row.steps[i].endColumn = i + 2;
      }
    }
    if (row.steps.length < this.currentStepCount) {
      this.spannedStep(row.steps[row.steps.length - 1]);
    }
  }

  spannedStep(step: Step) {
    step.endColumn = this.currentStepCount + 1;
  }

  rowStepsToColumnsStatus(inputRow: InputRow) {
    if (inputRow.steps.length > this.currentStepCount) {
      this.createNewColumn();
    }
    this.slottedStep(inputRow);
  }
  createNewColumn() {
    this.currentStepCount++;
  }



  _makeNewStep(inputRow: InputRow, icon: Icon): Step {

    let startColumn: number, endColumn: number;
    const stepPackage = this._makeNewStepPackage(inputRow, icon);
    const appliedToStep: Step  = {
        id: inputRow.steps.length,
        type: icon.name,
        operationSourceId: 0,
        preStep: '',
        style: '',
        startColumn: 1,
        endColumn: 2,

        postStep: inputRow.currentValue,
        sortOrder: inputRow.steps.length,
        stepIcon: icon
      };

    let stepId: number;

    if (stepPackage.appliedToStep === null || stepPackage.appliedToStep === undefined) {
      stepId = inputRow.id;
    } else {
      stepId = stepPackage.appliedToStep.id;
    }
    if (inputRow.steps.length === 0) {
      if (inputRow.type !== RowType.Formula) {
        startColumn = 1;
        endColumn = 2;
      } else {
        const field: FormulaField = inputRow.field;
        field.formula = '';
        startColumn = field.dependsOn[0].step.startColumn;
        endColumn = field.dependsOn[0].step.endColumn;
      }
    } else {
      startColumn = inputRow.steps.length + 1;
      endColumn = startColumn + 1;
    }
    console.log(inputRow.id, inputRow.currentValue, startColumn + ' / ' + endColumn);

    const step: Step = {
      id: inputRow.steps.length,
      operationSourceId: appliedToStep.id,
      postStep: appliedToStep.postStep,
      preStep: appliedToStep.preStep,
      sortOrder: appliedToStep.sortOrder,
      style: 'grid-column: ',
      startColumn,
      endColumn,
      type: icon.type,
      stepIcon: icon
    };

    return step;
  }

  _makeNewStepPackage(inputRow: InputRow, icon: Icon): NewStepPackage {
    const { currentValue, id, steps } = inputRow;
    const newStepPackage: NewStepPackage = {
      postStep: currentValue,
      inputRowId: id,
      stepType: icon.type,
      data: icon,
      appliedToStep: icon.type === 'INPUT' ? null : steps[steps.length - 1]
    };

    return newStepPackage;
  }

  _makeNewCleanseOptions(field: Field | FormulaField): CleanseOperation[] {
    const cleanseOptions: CleanseOperation[] = [];
    for (const cOption of CLEANSE_OPERATIONS) {
      if (field.dataType === cOption.dataType) {
        const {dataType, icon, id, isApplied, name, operation} = cOption;
        const cleanseOption = new CleanseOption(id, dataType, name, icon, operation, isApplied);
        cleanseOptions.push(cleanseOption);
      }
    }

    return cleanseOptions;
  }

  _makeNewFormulaField(inputRow: InputRow, stepIcon: Icon) {
    let icon = stepIcon;
    if (stepIcon.type === 'FORMULA') {
      icon = ICONS.find(i => i.name === 'formula');
    }
    const {id, dataType, length, businessProcesses} = inputRow.field;
    const name = 'FUNC_' + inputRow.field.name;
    const dependency: FormulaDependency = {
      order: 1,
      row: inputRow,
      step: inputRow.steps[inputRow.steps.length - 1]
    };
    const field: FormulaField = {id, name, dataType, length, businessProcesses,
      formula: '100 * ' + inputRow.field.name,
      dependsOn: [dependency]
    };
    field.id = field.id + 100;
    const formulaRow = this._makeNewInputRow(field, RowType.Formula, icon);
    this.inputObject.rows.push(formulaRow);
  }

  _updateInputRow(inputRow: InputRow, stepIcon) {
    for (let i = 0; i < this.inputObject.rows.length; i++) {
      if (inputRow.id === this.inputObject.rows[i].id) {
        const newStep = this._makeNewStep(inputRow, stepIcon);
        for (const cleanseOption of this.inputObject.rows[i].cleanseOperations) {
          if (cleanseOption.name === stepIcon.name) {
            cleanseOption.isApplied = true;
          }
        }
        this.inputObject.rows[i].steps.push(newStep);
        if (stepIcon.type === 'FORMULA') {
          this._makeNewFormulaField(inputRow, stepIcon);
        }
        this._groomGrid(inputRow);
      }
    }
  }

  _makeNewInputRow(field: Field | FormulaField, type: RowType, icon?: Icon): InputRow {

    const inputRow: InputRow = {
        field,
        id: field.id,
        currentValue: field.name,
        sortOrder: this.sortOrder,
        cleanseOperations: this._makeNewCleanseOptions(field),
        steps: [],
        type
      };
      const step = this._makeNewStep(inputRow, icon);
      inputRow.steps.push(step);
      if (type === RowType.Formula) {

      }
      /* if (inputRow.steps.length > 1) {
        this._increaseColumnCount(inputRow);
      } */
    return inputRow;

  }

  _makeInputObject(fields: Field[]) {
    const rows: InputRow[] = [];
    const icon: Icon = ICONS.find(i => {
      return i.name === 'input';
    });
    for (const field of fields) {
      const inputRow = this._makeNewInputRow(field, RowType.Input, icon);
      rows.push(inputRow);
    }
    this.inputObject = { rows };

    return this.inputObject;
  }

  /*
    <----- FORMULA FIELD REFACTOR
  ***************************************************************************/
}
