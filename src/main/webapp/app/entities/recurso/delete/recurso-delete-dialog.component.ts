import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IRecurso } from '../recurso.model';
import { RecursoService } from '../service/recurso.service';

@Component({
  templateUrl: './recurso-delete-dialog.component.html',
})
export class RecursoDeleteDialogComponent {
  recurso?: IRecurso;

  constructor(protected recursoService: RecursoService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.recursoService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
