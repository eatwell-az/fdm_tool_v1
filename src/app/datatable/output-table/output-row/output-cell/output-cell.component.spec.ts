import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputCellComponent } from './output-cell.component';

describe('OutputCellComponent', () => {
  let component: OutputCellComponent;
  let fixture: ComponentFixture<OutputCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutputCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutputCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
