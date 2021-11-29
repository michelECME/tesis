import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICANTIDADXTIPOUEB } from '../cantidadxtipoueb.model';
import { CANTIDADXTIPOUEBService } from '../service/cantidadxtipoueb.service';

@Component({
  templateUrl: './cantidadxtipoueb-delete-dialog.component.html',
})
export class CANTIDADXTIPOUEBDeleteDialogComponent {
  cANTIDADXTIPOUEB?: ICANTIDADXTIPOUEB;

  constructor(protected cANTIDADXTIPOUEBService: CANTIDADXTIPOUEBService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cANTIDADXTIPOUEBService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
