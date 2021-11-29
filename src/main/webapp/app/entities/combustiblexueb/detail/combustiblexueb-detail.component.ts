import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICOMBUSTIBLEXUEB } from '../combustiblexueb.model';

@Component({
  selector: 'jhi-combustiblexueb-detail',
  templateUrl: './combustiblexueb-detail.component.html',
})
export class COMBUSTIBLEXUEBDetailComponent implements OnInit {
  cOMBUSTIBLEXUEB: ICOMBUSTIBLEXUEB | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cOMBUSTIBLEXUEB }) => {
      this.cOMBUSTIBLEXUEB = cOMBUSTIBLEXUEB;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
