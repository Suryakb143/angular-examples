import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdkDualListComponent } from './cdk-dual-list.component';

describe('CdkDualListComponent', () => {
  let component: CdkDualListComponent;
  let fixture: ComponentFixture<CdkDualListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CdkDualListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CdkDualListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
