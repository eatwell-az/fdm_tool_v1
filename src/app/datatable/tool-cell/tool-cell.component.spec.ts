import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolCellComponent } from './tool-cell.component';

describe('ToolCellComponent', () => {
  let component: ToolCellComponent;
  let fixture: ComponentFixture<ToolCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
