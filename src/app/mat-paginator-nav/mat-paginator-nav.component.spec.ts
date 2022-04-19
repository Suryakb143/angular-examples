import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatPaginatorNavComponent } from './mat-paginator-nav.component';

describe('MatPaginatorNavComponent', () => {
  let component: MatPaginatorNavComponent;
  let fixture: ComponentFixture<MatPaginatorNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatPaginatorNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatPaginatorNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
