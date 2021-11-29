import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICantidadXModelo } from '../cantidad-x-modelo.model';

@Component({
  selector: 'jhi-cantidad-x-modelo-detail',
  templateUrl: './cantidad-x-modelo-detail.component.html',
})
export class CantidadXModeloDetailComponent implements OnInit {
  cantidadXModelo: ICantidadXModelo | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cantidadXModelo }) => {
      this.cantidadXModelo = cantidadXModelo;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
