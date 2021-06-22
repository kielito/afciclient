import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticulosListarComponent } from './articulos-listar.component';

describe('ArticulosListarComponent', () => {
  let component: ArticulosListarComponent;
  let fixture: ComponentFixture<ArticulosListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticulosListarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticulosListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
