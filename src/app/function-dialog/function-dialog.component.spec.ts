import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionDialogComponent } from './function-dialog.component';

describe('FunctionDialogComponent', () => {
  let component: FunctionDialogComponent;
  let fixture: ComponentFixture<FunctionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunctionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
