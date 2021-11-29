import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICantidadXModelo } from '../cantidad-x-modelo.model';
import { CantidadXModeloService } from '../service/cantidad-x-modelo.service';

@Component({
  templateUrl: './cantidad-x-modelo-delete-dialog.component.html',
})
export class CantidadXModeloDeleteDialogComponent {
  cantidadXModelo?: ICantidadXModelo;

  constructor(protected cantidadXModeloService: CantidadXModeloService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cantidadXModeloService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
