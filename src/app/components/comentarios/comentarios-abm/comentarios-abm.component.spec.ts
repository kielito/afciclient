import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComentariosAbmComponent } from './comentarios-abm.component';

describe('ComentariosAbmComponent', () => {
  let component: ComentariosAbmComponent;
  let fixture: ComponentFixture<ComentariosAbmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComentariosAbmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComentariosAbmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
