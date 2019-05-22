import { CleanseOperation } from './cleanse.operation';

export interface CellData {
    isParent: boolean;
    isOriginal: boolean;
    nextSibling: any;
    prevSibling: any;
}

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
    fields: Array<Field>;
}

export interface Field extends Base {
    id: number;
    name: string;
    dataType: string;
    length: number;
    businessProcesses: Array<BusinessProcess>;
    cellData: CellData;
}

export interface InputRow {
    id: number;
    order: number;
    step: Step[];
    cleanse: CleanseOperation[];
    cssGridValue: { gridTemplateColumns: string };
}
export interface Step {
    [order: number]: { cssGridCol: string, cssGridRow: string, product: string | number, anticedent: number };
}