import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticulosABMComponent } from './articulos-abm.component';

describe('ArticulosABMComponent', () => {
  let component: ArticulosABMComponent;
  let fixture: ComponentFixture<ArticulosABMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticulosABMComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticulosABMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
