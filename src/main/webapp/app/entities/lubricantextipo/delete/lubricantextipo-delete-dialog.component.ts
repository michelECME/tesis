import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ILUBRICANTEXTIPO } from '../lubricantextipo.model';
import { LUBRICANTEXTIPOService } from '../service/lubricantextipo.service';

@Component({
  templateUrl: './lubricantextipo-delete-dialog.component.html',
})
export class LUBRICANTEXTIPODeleteDialogComponent {
  lUBRICANTEXTIPO?: ILUBRICANTEXTIPO;

  constructor(protected lUBRICANTEXTIPOService: LUBRICANTEXTIPOService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.lUBRICANTEXTIPOService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
