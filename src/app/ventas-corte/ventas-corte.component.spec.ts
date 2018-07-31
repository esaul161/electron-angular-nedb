/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VentasCorteComponent } from './ventas-corte.component';

describe('VentasCorteComponent', () => {
  let component: VentasCorteComponent;
  let fixture: ComponentFixture<VentasCorteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VentasCorteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VentasCorteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
