import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprasAgregarComponent } from './compras-agregar.component';

describe('ComprasAgregarComponent', () => {
  let component: ComprasAgregarComponent;
  let fixture: ComponentFixture<ComprasAgregarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComprasAgregarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprasAgregarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
