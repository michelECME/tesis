import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICantidadXMarca } from '../cantidad-x-marca.model';
import { CantidadXMarcaService } from '../service/cantidad-x-marca.service';

@Component({
  templateUrl: './cantidad-x-marca-delete-dialog.component.html',
})
export class CantidadXMarcaDeleteDialogComponent {
  cantidadXMarca?: ICantidadXMarca;

  constructor(protected cantidadXMarcaService: CantidadXMarcaService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cantidadXMarcaService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
