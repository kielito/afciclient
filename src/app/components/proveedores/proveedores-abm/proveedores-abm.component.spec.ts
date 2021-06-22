import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedoresAbmComponent } from './proveedores-abm.component';

describe('ProveedoresAbmComponent', () => {
  let component: ProveedoresAbmComponent;
  let fixture: ComponentFixture<ProveedoresAbmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProveedoresAbmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProveedoresAbmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
