import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICOMBUSTIBLEXUEB } from '../combustiblexueb.model';
import { COMBUSTIBLEXUEBService } from '../service/combustiblexueb.service';

@Component({
  templateUrl: './combustiblexueb-delete-dialog.component.html',
})
export class COMBUSTIBLEXUEBDeleteDialogComponent {
  cOMBUSTIBLEXUEB?: ICOMBUSTIBLEXUEB;

  constructor(protected cOMBUSTIBLEXUEBService: COMBUSTIBLEXUEBService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cOMBUSTIBLEXUEBService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
