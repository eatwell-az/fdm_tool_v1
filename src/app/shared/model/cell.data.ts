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

    formula?: string;
    dependsOn?: FormulaDependency[];
}

export interface FormulaDependency {
    order: number;
    row: InputRow;
}

export interface FormulaField extends Field {
    id: number;
    name: string;
    dataType: string;
    length: number;
    businessProcesses: Array<BusinessProcess>;
    formula: string;
    dependsOn: FormulaDependency[];
}
export interface InputRow {
    field: Field | FormulaField;
    id: number;
    sortOrder: number;
    cleanseOperations: CleanseOperation[];
    currentValue: any;
    steps: Step[];
    type: RowType;
    cssGridColumns?: string;
}
export enum RowType {
    Input,
    Formula
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
    stepIcon: Icon;
    isPlaceholder: boolean;
}

export interface InputObject {
    rows: InputRow[];
}

export interface Icon {
    materialIconName: string;
    style: string;
    type: string;
    name: string;
}

export const ICONS: Icon[] = [
    { name: 'round', materialIconName: 'all_out', style: '', type: 'CLEANSING' },
    { name: 'trim', materialIconName: 'crop', style: '', type: 'CLEANSING' },
    { name: 'case', materialIconName: 'text_format', style: '', type: 'CLEANSING' },
    { name: 'input', materialIconName: 'input', style: '', type: 'INPUT' },
    { name: 'formula', materialIconName: 'functions', style: '', type: 'FORMULA' },
    { name: 'dependent', materialIconName: 'device_hub', style: '', type: 'FORMULA' },
    { name: 'placeholder', materialIconName: '', style: '', type: 'PLACEHOLDER' }
];

export const TOOLTIP_OBJECT = {
    cleanseMenu: 'Cleanse...',
    trim: 'Trim',
    case: 'Lower Case',
    round: 'Round',
    input: 'Input',
    dependent: 'This cell is dependent on another...',
    functionMenu: 'Function...',
    decisionTable: 'Decision Table...'
};
