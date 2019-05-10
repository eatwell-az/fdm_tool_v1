import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputRowComponent } from './output-row.component';

describe('OutputRowComponent', () => {
  let component: OutputRowComponent;
  let fixture: ComponentFixture<OutputRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutputRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutputRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
