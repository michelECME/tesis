import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ILUBRICANTEXUEB, LUBRICANTEXUEB } from '../lubricantexueb.model';
import { LUBRICANTEXUEBService } from '../service/lubricantexueb.service';

@Component({
  selector: 'jhi-lubricantexueb-update',
  templateUrl: './lubricantexueb-update.component.html',
})
export class LUBRICANTEXUEBUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    cantidadLubricanteUEB: [],
    ueb: [],
  });

  constructor(
    protected lUBRICANTEXUEBService: LUBRICANTEXUEBService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ lUBRICANTEXUEB }) => {
      this.updateForm(lUBRICANTEXUEB);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const lUBRICANTEXUEB = this.createFromForm();
    if (lUBRICANTEXUEB.id !== undefined) {
      this.subscribeToSaveResponse(this.lUBRICANTEXUEBService.update(lUBRICANTEXUEB));
    } else {
      this.subscribeToSaveResponse(this.lUBRICANTEXUEBService.create(lUBRICANTEXUEB));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILUBRICANTEXUEB>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(lUBRICANTEXUEB: ILUBRICANTEXUEB): void {
    this.editForm.patchValue({
      id: lUBRICANTEXUEB.id,
      cantidadLubricanteUEB: lUBRICANTEXUEB.cantidadLubricanteUEB,
      ueb: lUBRICANTEXUEB.ueb,
    });
  }

  protected createFromForm(): ILUBRICANTEXUEB {
    return {
      ...new LUBRICANTEXUEB(),
      id: this.editForm.get(['id'])!.value,
      cantidadLubricanteUEB: this.editForm.get(['cantidadLubricanteUEB'])!.value,
      ueb: this.editForm.get(['ueb'])!.value,
    };
  }
}
