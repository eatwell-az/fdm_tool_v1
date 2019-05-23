import { TestBed } from '@angular/core/testing';

import { CellTableManagementService } from './cell-table-management.service';

describe('CellTableManagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CellTableManagementService = TestBed.get(CellTableManagementService);
    expect(service).toBeTruthy();
  });
});
