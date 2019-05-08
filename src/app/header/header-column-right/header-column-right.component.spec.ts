import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderColumnRightComponent } from './header-column-right.component';

describe('HeaderColumnRightComponent', () => {
  let component: HeaderColumnRightComponent;
  let fixture: ComponentFixture<HeaderColumnRightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderColumnRightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderColumnRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
