import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICantidadXMarca } from '../cantidad-x-marca.model';

@Component({
  selector: 'jhi-cantidad-x-marca-detail',
  templateUrl: './cantidad-x-marca-detail.component.html',
})
export class CantidadXMarcaDetailComponent implements OnInit {
  cantidadXMarca: ICantidadXMarca | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cantidadXMarca }) => {
      this.cantidadXMarca = cantidadXMarca;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
