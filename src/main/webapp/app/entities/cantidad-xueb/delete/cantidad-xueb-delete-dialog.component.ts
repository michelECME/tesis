import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICantidadXUEB } from '../cantidad-xueb.model';
import { CantidadXUEBService } from '../service/cantidad-xueb.service';

@Component({
  templateUrl: './cantidad-xueb-delete-dialog.component.html',
})
export class CantidadXUEBDeleteDialogComponent {
  cantidadXUEB?: ICantidadXUEB;

  constructor(protected cantidadXUEBService: CantidadXUEBService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cantidadXUEBService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
