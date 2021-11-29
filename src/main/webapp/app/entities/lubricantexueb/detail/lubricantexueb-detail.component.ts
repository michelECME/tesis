import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILUBRICANTEXUEB } from '../lubricantexueb.model';

@Component({
  selector: 'jhi-lubricantexueb-detail',
  templateUrl: './lubricantexueb-detail.component.html',
})
export class LUBRICANTEXUEBDetailComponent implements OnInit {
  lUBRICANTEXUEB: ILUBRICANTEXUEB | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ lUBRICANTEXUEB }) => {
      this.lUBRICANTEXUEB = lUBRICANTEXUEB;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
