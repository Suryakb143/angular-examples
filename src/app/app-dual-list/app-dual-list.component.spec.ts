import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDualListComponent } from './app-dual-list.component';

describe('AppDualListComponent', () => {
  let component: AppDualListComponent;
  let fixture: ComponentFixture<AppDualListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppDualListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppDualListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
