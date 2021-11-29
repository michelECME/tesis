import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IENTREGAXTIPO } from '../entregaxtipo.model';
import { ENTREGAXTIPOService } from '../service/entregaxtipo.service';

@Component({
  templateUrl: './entregaxtipo-delete-dialog.component.html',
})
export class ENTREGAXTIPODeleteDialogComponent {
  eNTREGAXTIPO?: IENTREGAXTIPO;

  constructor(protected eNTREGAXTIPOService: ENTREGAXTIPOService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.eNTREGAXTIPOService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
