import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAgregadoXChofer } from '../agregado-x-chofer.model';

@Component({
  selector: 'jhi-agregado-x-chofer-detail',
  templateUrl: './agregado-x-chofer-detail.component.html',
})
export class AgregadoXChoferDetailComponent implements OnInit {
  agregadoXChofer: IAgregadoXChofer | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ agregadoXChofer }) => {
      this.agregadoXChofer = agregadoXChofer;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
