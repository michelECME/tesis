import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICantidadXUEB } from '../cantidad-xueb.model';

@Component({
  selector: 'jhi-cantidad-xueb-detail',
  templateUrl: './cantidad-xueb-detail.component.html',
})
export class CantidadXUEBDetailComponent implements OnInit {
  cantidadXUEB: ICantidadXUEB | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cantidadXUEB }) => {
      this.cantidadXUEB = cantidadXUEB;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
