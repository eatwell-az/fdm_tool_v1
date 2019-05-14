import { Action } from '@ngrx/store';
import { DataSet } from 'src/app/shared/model/cell.data';

export const LOAD_DATATABLE = 'LOAD_DATATABLE';

export class LoadDatatable implements Action {
    readonly type = LOAD_DATATABLE;

    constructor(public payload: DataSet) { }
}

export type DatatableActions = LoadDatatable;