import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosActivarComponent } from './usuarios-activar.component';

describe('UsuariosActivarComponent', () => {
  let component: UsuariosActivarComponent;
  let fixture: ComponentFixture<UsuariosActivarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuariosActivarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosActivarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
