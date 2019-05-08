import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderColumnLeftComponent } from './header-column-left.component';

describe('HeaderColumnLeftComponent', () => {
  let component: HeaderColumnLeftComponent;
  let fixture: ComponentFixture<HeaderColumnLeftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderColumnLeftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderColumnLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
