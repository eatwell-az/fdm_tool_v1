import { CleanseOperation } from './cleanse.operation';

export interface Base {
    id: number;
    name: string;
}
export interface BusinessProcess extends Base {
    id: number;
    name: string;
}
export interface System extends Base {
    id: number;
    name: string;
}
export interface DataSet extends Base {
    id: number;
    name: string;
    type: string;
    systems: Array<System>;
    fields: any;
}
export interface Field extends Base {
    id: number;
    name: string;
    dataType: string;
    length: number;
    businessProcesses: Array<BusinessProcess>;
}

export interface FormulaField extends Field {
    id: number;
    name: string;
    dataType: string;
    length: number;
    businessProcesses: Array<BusinessProcess>;
    formula: string;
    dependsOn: Field[] | FormulaField[];
}
export interface InputRow {
    field: Field;
    id: number;
    sortOrder: number;
    cleanseOperations: CleanseOperation[];
    currentValue: any;
    steps: Step[];
}
export interface Step {
    id: number;
    type: string;
    operationSourceId: number;
    preStep: any;
    style: string;
    startColumn: number;
    endColumn: number;
    postStep: any;
    sortOrder: number;
    stepIcon: string;
}

export interface InputObject {
    rows: InputRow[];
}