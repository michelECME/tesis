import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICANTIDADXTIPO } from '../cantidadxtipo.model';
import { CANTIDADXTIPOService } from '../service/cantidadxtipo.service';

@Component({
  templateUrl: './cantidadxtipo-delete-dialog.component.html',
})
export class CANTIDADXTIPODeleteDialogComponent {
  cANTIDADXTIPO?: ICANTIDADXTIPO;

  constructor(protected cANTIDADXTIPOService: CANTIDADXTIPOService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cANTIDADXTIPOService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
