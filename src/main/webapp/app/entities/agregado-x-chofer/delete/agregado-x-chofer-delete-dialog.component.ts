import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IAgregadoXChofer } from '../agregado-x-chofer.model';
import { AgregadoXChoferService } from '../service/agregado-x-chofer.service';

@Component({
  templateUrl: './agregado-x-chofer-delete-dialog.component.html',
})
export class AgregadoXChoferDeleteDialogComponent {
  agregadoXChofer?: IAgregadoXChofer;

  constructor(protected agregadoXChoferService: AgregadoXChoferService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.agregadoXChoferService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
