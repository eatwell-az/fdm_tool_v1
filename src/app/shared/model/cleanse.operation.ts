import { Base } from './cell.data';
import { Pipe } from '@angular/compiler/src/core';

export interface CleanseOperation extends Base {
    id: number;
    dataType: string;
    name: string;
    icon: string;
    operation: Pipe;
    isApplied: boolean;
}
export const CLEANSE_OPERATIONS: CleanseOperation[] = [
    { dataType: 'CHARACTER', id: 1, icon: 'crop', name: 'trim', operation: null, isApplied: false },
    { dataType: 'CHARACTER', id: 2, icon: 'text_format', name: 'case', operation: null, isApplied: false },
    { dataType: 'NUMERIC', id: 3, icon: 'all_out', name: 'round', operation: null, isApplied: false }
  ];
