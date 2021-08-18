import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclaracionListarComponent } from './declaracion-listar.component';

describe('DeclaracionListarComponent', () => {
  let component: DeclaracionListarComponent;
  let fixture: ComponentFixture<DeclaracionListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeclaracionListarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeclaracionListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
