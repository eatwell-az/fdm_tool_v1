import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderColumnCenterComponent } from './header-column-center.component';

describe('HeaderColumnCenterComponent', () => {
  let component: HeaderColumnCenterComponent;
  let fixture: ComponentFixture<HeaderColumnCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderColumnCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderColumnCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
