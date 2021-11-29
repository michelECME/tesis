import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IENTREGAXTIPO } from '../entregaxtipo.model';

@Component({
  selector: 'jhi-entregaxtipo-detail',
  templateUrl: './entregaxtipo-detail.component.html',
})
export class ENTREGAXTIPODetailComponent implements OnInit {
  eNTREGAXTIPO: IENTREGAXTIPO | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ eNTREGAXTIPO }) => {
      this.eNTREGAXTIPO = eNTREGAXTIPO;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
