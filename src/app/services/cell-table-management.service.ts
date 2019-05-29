import { Injectable } from '@angular/core';
import {
  Step,
  Field,
  InputRow,
  InputObject,
  FormulaField,
  Icon,
  ICONS,
  RowType,
  FormulaDependency
} from '../shared/model/cell.data';
import { CLEANSE_OPERATIONS, CleanseOperation, CleanseOption } from '../shared/model/cleanse.operation';
import { NewStepPackage } from '../datatable/datatable.component';
import { Subject } from 'rxjs';
import * as _ from 'lodash';
@Injectable({
  providedIn: 'root'
})
export class CellTableManagementService {
  currentStepCount: number;
  sortOrder: number;
  inputObject: InputObject;
  rowGridColumnChanged = new Subject();

  constructor() {
    this.currentStepCount = 1;
    this.sortOrder = 1;
  }

  gridTemplateColumnCss(row: InputRow) {
    const maxWidth = 814;

    const columnsPercentArr: number[] = [];
    _.forEach(this.inputObject.rows, (value) => {
      if (value.steps.length > this.currentStepCount) {
        this.createNewColumn();
      }
    });
    for (let i = 0; i < this.currentStepCount; i++) {
      columnsPercentArr.push(maxWidth / this.currentStepCount / (maxWidth / 100));
    }

    const columnsPercent = columnsPercentArr.join('% ') + '%';
    this.rowGridColumnChanged.next(columnsPercent);
    row.cssGridColumns = columnsPercent;

    const cssTransitionArr: number[] = [];
    let cssGridColumnValue: string;
    const columnWidth = (814 / (this.currentStepCount - 1)) / (814 / 100);
    for (let i = 0; i < columnsPercentArr.length; i++) {
      cssTransitionArr.push(columnWidth);
    }
    cssTransitionArr.splice((cssTransitionArr.length - 1), 1, 0);
    let count = 0;

    const animate = setInterval(() => {
      count++;
      for (let i = 0; i < cssTransitionArr.length - 1; i++) {
        cssTransitionArr[i] -= 1;
        cssTransitionArr[cssTransitionArr.length - 1] += 1;
        cssGridColumnValue = cssTransitionArr.join('% ') + '%';
        if (cssTransitionArr[i] === count) {
          clearInterval(animate);
        }
      }
    }, 5);
    return cssGridColumnValue;

  }
/*   groomGrid(inputRow: InputRow) {
    this.rowStepsToColumnsStatus(inputRow);

    for (let i = 0; i < this.inputObject.rows.length; i++) {
      this.gridTemplateColumnCss(this.inputObject.rows[i]);
      if (this.inputObject.rows[i].id !== inputRow.id) {
        this.rowStepsToColumnsStatus(this.inputObject.rows[i]);
      }
    }
  } */
  groomGrid() {
    for (let i = 0; i < this.inputObject.rows.length; i++) {
      this.gridTemplateColumnCss(this.inputObject.rows[i]);
    }
  }

/*   slottedStep(row: InputRow) {
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

  rowStepsToColumnsStatus() {
    for (let row of this.inputObject.rows) {

    }
    if (inputRow.steps.length > this.currentStepCount) {
      this.createNewColumn(inputRow);
    }
    this.slottedStep(inputRow);
  } */
  createNewColumn() {
    this.currentStepCount++;
  }

  makeNewStep(inputRow: InputRow, icon: Icon, parentRow?: InputRow): Step {
    let startColumn: number, endColumn: number;
    const stepPackage = this.makeNewStepPackage(inputRow, icon);
    const appliedToStep: Step  = {
        id: inputRow.steps.length,
        type: icon.name,
        operationSourceId: parentRow ? parentRow.id : 0,
        preStep: '',
        style: '',
        startColumn: (inputRow.type === RowType.Formula  && parentRow ? parentRow.steps[parentRow.steps.length - 1].startColumn : 1),
        endColumn: this.currentStepCount,
        isPlaceholder: (icon.name === 'placeholder' ? true : false),
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
        const field: Field | FormulaField = inputRow.field;
        field.formula = '';
        startColumn = parentRow.steps[parentRow.steps.length - 1].startColumn;
        endColumn = this.currentStepCount;
      }
    } else {
      startColumn = inputRow.steps.length + 1;
      endColumn = startColumn + 1;
    }

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
      stepIcon: icon,
      isPlaceholder: appliedToStep.isPlaceholder
    };
    
    return step;
  }

  makeNewStepPackage(inputRow: InputRow, icon: Icon): NewStepPackage {
    const { currentValue, id, steps } = inputRow;
    const newStepPackage: NewStepPackage = {
      postStep: currentValue,
      inputRowId: id,
      stepType: icon.type,
      data: icon,
      appliedToStep: (icon.type === 'INPUT' ? null : steps[steps.length - 1])
    };

    return newStepPackage;
  }

  makeNewCleanseOptions(field: Field | FormulaField): CleanseOperation[] {
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

  updateFieldDependency(childRow: InputRow, parentRow: InputRow) {

    function highestOrder (dependencies: FormulaDependency, currentDependency: FormulaDependency) {
      return dependencies.order < currentDependency.order ? currentDependency : null;
    }

    const bindChildToParent: FormulaDependency = {
      order: parentRow.field.dependsOn.reduce(highestOrder).order + 1,
      row: childRow
    };
    parentRow.field.dependsOn.push(bindChildToParent);

    const bindParentToChild: FormulaDependency = {
      order: 1,
      row: parentRow
    }
    childRow.field.dependsOn.push(bindParentToChild);
    return;
  }

  makeNewFormulaRow(parentRow: InputRow, stepIcon: Icon, order?: number) {
    const {id, dataType, length, businessProcesses} = parentRow.field;

    const childField: FormulaField = {
      id, name, dataType, length, businessProcesses,
      formula: '100 * ' + parentRow.field.name,
      dependsOn: []
    };

    childField.id = childField.id + 100;

    const childRow = this.makeNewInputRow(childField, RowType.Formula, stepIcon, parentRow);
    this.updateFieldDependency(childRow, parentRow);
    this.inputObject.rows.push(childRow);
    return;
  }

  updateInputRow(inputRow: InputRow, stepIcon) {
    let newStepIcon: Icon;

    if (stepIcon.type === 'FORMULA') {
        this.makeNewFormulaRow(inputRow, stepIcon);
        return;
    }
    for (let i = 0; i < this.inputObject.rows.length; i++) {
      if (inputRow.id === this.inputObject.rows[i].id) {
        newStepIcon = stepIcon;
        for (const cleanseOption of this.inputObject.rows[i].cleanseOperations) {
          if (cleanseOption.name === newStepIcon.name) {
            cleanseOption.isApplied = true;
          }
        }
      } else {

        newStepIcon = ICONS.find(icon => icon.name === 'placeholder');
        const newStep = this.makeNewStep(this.inputObject.rows[i], newStepIcon);
        this.inputObject.rows[i].steps.push(newStep);

      }
    }

    this.groomGrid();
  }

  makeNewInputRow(field: Field | FormulaField, type: RowType, icon?: Icon, parent?: InputRow): InputRow {
    const newInputRow: InputRow = {
        field,
        id: field.id,
        currentValue: field.name,
        sortOrder: this.sortOrder,
        cleanseOperations: this.makeNewCleanseOptions(field),
        steps: [],
        type,
        cssGridColumns: '100%'
      };
      const step = this.makeNewStep(newInputRow, icon);
      newInputRow.steps.push(step);
    return newInputRow;
  }

  makeInputObject(fields: Field[]) {
    const rows: InputRow[] = [];
    const icon: Icon = ICONS.find(i => {
      return i.name === 'input';
    });
    for (const field of fields) {
      const inputRow = this.makeNewInputRow(field, RowType.Input, icon);
      rows.push(inputRow);
    }
    this.inputObject = { rows };

    return this.inputObject;
  }
}
