import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ILUBRICANTEXTIPO, LUBRICANTEXTIPO } from '../lubricantextipo.model';
import { LUBRICANTEXTIPOService } from '../service/lubricantextipo.service';

@Component({
  selector: 'jhi-lubricantextipo-update',
  templateUrl: './lubricantextipo-update.component.html',
})
export class LUBRICANTEXTIPOUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    cantidadLubricante: [],
    lubricante: [],
  });

  constructor(
    protected lUBRICANTEXTIPOService: LUBRICANTEXTIPOService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ lUBRICANTEXTIPO }) => {
      this.updateForm(lUBRICANTEXTIPO);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const lUBRICANTEXTIPO = this.createFromForm();
    if (lUBRICANTEXTIPO.id !== undefined) {
      this.subscribeToSaveResponse(this.lUBRICANTEXTIPOService.update(lUBRICANTEXTIPO));
    } else {
      this.subscribeToSaveResponse(this.lUBRICANTEXTIPOService.create(lUBRICANTEXTIPO));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILUBRICANTEXTIPO>>): void {
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

  protected updateForm(lUBRICANTEXTIPO: ILUBRICANTEXTIPO): void {
    this.editForm.patchValue({
      id: lUBRICANTEXTIPO.id,
      cantidadLubricante: lUBRICANTEXTIPO.cantidadLubricante,
      lubricante: lUBRICANTEXTIPO.lubricante,
    });
  }

  protected createFromForm(): ILUBRICANTEXTIPO {
    return {
      ...new LUBRICANTEXTIPO(),
      id: this.editForm.get(['id'])!.value,
      cantidadLubricante: this.editForm.get(['cantidadLubricante'])!.value,
      lubricante: this.editForm.get(['lubricante'])!.value,
    };
  }
}
