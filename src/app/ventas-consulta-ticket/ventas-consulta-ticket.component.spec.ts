/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VentasConsultaTicketComponent } from './ventas-consulta-ticket.component';

describe('VentasConsultaTicketComponent', () => {
  let component: VentasConsultaTicketComponent;
  let fixture: ComponentFixture<VentasConsultaTicketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VentasConsultaTicketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VentasConsultaTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
