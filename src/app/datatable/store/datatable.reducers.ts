import { Action } from '@ngrx/store';
import { LOAD_DATATABLE } from './datatable.actions';



const initialState = {
    myValue: [
        '1',
        '2'
    ]
}

export function datatableReducer(state = initialState, action: Action) {
    /* switch (action.type) {
        case LOAD_DATATABLE:
            return {
                ...state,
                myValue: [...state.myValue, action.]
            }
    }
    return state; */
}
