import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprasListarComponent } from './compras-listar.component';

describe('ComprasListarComponent', () => {
  let component: ComprasListarComponent;
  let fixture: ComponentFixture<ComprasListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComprasListarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprasListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
