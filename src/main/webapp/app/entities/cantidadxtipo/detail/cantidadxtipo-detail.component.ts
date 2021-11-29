import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICANTIDADXTIPO } from '../cantidadxtipo.model';

@Component({
  selector: 'jhi-cantidadxtipo-detail',
  templateUrl: './cantidadxtipo-detail.component.html',
})
export class CANTIDADXTIPODetailComponent implements OnInit {
  cANTIDADXTIPO: ICANTIDADXTIPO | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cANTIDADXTIPO }) => {
      this.cANTIDADXTIPO = cANTIDADXTIPO;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
