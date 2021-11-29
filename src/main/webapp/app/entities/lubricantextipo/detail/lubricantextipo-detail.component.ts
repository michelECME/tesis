import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILUBRICANTEXTIPO } from '../lubricantextipo.model';

@Component({
  selector: 'jhi-lubricantextipo-detail',
  templateUrl: './lubricantextipo-detail.component.html',
})
export class LUBRICANTEXTIPODetailComponent implements OnInit {
  lUBRICANTEXTIPO: ILUBRICANTEXTIPO | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ lUBRICANTEXTIPO }) => {
      this.lUBRICANTEXTIPO = lUBRICANTEXTIPO;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
