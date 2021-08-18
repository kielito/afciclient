import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeListarComponent } from './informe-listar.component';

describe('InformeListarComponent', () => {
  let component: InformeListarComponent;
  let fixture: ComponentFixture<InformeListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformeListarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformeListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
