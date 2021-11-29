import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICANTIDADXTIPOUEB } from '../cantidadxtipoueb.model';

@Component({
  selector: 'jhi-cantidadxtipoueb-detail',
  templateUrl: './cantidadxtipoueb-detail.component.html',
})
export class CANTIDADXTIPOUEBDetailComponent implements OnInit {
  cANTIDADXTIPOUEB: ICANTIDADXTIPOUEB | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cANTIDADXTIPOUEB }) => {
      this.cANTIDADXTIPOUEB = cANTIDADXTIPOUEB;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
