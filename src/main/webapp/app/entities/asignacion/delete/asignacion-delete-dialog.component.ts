import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IAsignacion } from '../asignacion.model';
import { AsignacionService } from '../service/asignacion.service';

@Component({
  templateUrl: './asignacion-delete-dialog.component.html',
})
export class AsignacionDeleteDialogComponent {
  asignacion?: IAsignacion;

  constructor(protected asignacionService: AsignacionService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.asignacionService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
