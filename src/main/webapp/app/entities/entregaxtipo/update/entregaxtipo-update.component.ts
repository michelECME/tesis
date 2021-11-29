import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IENTREGAXTIPO, ENTREGAXTIPO } from '../entregaxtipo.model';
import { ENTREGAXTIPOService } from '../service/entregaxtipo.service';

@Component({
  selector: 'jhi-entregaxtipo-update',
  templateUrl: './entregaxtipo-update.component.html',
})
export class ENTREGAXTIPOUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    cantidad: [],
    tipo: [],
  });

  constructor(protected eNTREGAXTIPOService: ENTREGAXTIPOService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ eNTREGAXTIPO }) => {
      this.updateForm(eNTREGAXTIPO);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const eNTREGAXTIPO = this.createFromForm();
    if (eNTREGAXTIPO.id !== undefined) {
      this.subscribeToSaveResponse(this.eNTREGAXTIPOService.update(eNTREGAXTIPO));
    } else {
      this.subscribeToSaveResponse(this.eNTREGAXTIPOService.create(eNTREGAXTIPO));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IENTREGAXTIPO>>): void {
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

  protected updateForm(eNTREGAXTIPO: IENTREGAXTIPO): void {
    this.editForm.patchValue({
      id: eNTREGAXTIPO.id,
      cantidad: eNTREGAXTIPO.cantidad,
      tipo: eNTREGAXTIPO.tipo,
    });
  }

  protected createFromForm(): IENTREGAXTIPO {
    return {
      ...new ENTREGAXTIPO(),
      id: this.editForm.get(['id'])!.value,
      cantidad: this.editForm.get(['cantidad'])!.value,
      tipo: this.editForm.get(['tipo'])!.value,
    };
  }
}
