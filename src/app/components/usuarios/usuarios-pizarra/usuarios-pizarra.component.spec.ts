import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosPizarraComponent } from './usuarios-pizarra.component';

describe('UsuariosPizarraComponent', () => {
  let component: UsuariosPizarraComponent;
  let fixture: ComponentFixture<UsuariosPizarraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuariosPizarraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosPizarraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
