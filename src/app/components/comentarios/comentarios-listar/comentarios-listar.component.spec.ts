import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComentariosListarComponent } from './comentarios-listar.component';

describe('ComentariosListarComponent', () => {
  let component: ComentariosListarComponent;
  let fixture: ComponentFixture<ComentariosListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComentariosListarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComentariosListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
