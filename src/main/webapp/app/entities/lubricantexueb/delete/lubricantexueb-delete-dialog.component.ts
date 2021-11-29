import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ILUBRICANTEXUEB } from '../lubricantexueb.model';
import { LUBRICANTEXUEBService } from '../service/lubricantexueb.service';

@Component({
  templateUrl: './lubricantexueb-delete-dialog.component.html',
})
export class LUBRICANTEXUEBDeleteDialogComponent {
  lUBRICANTEXUEB?: ILUBRICANTEXUEB;

  constructor(protected lUBRICANTEXUEBService: LUBRICANTEXUEBService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.lUBRICANTEXUEBService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
