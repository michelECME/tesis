import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ICANTIDADXTIPO, CANTIDADXTIPO } from '../cantidadxtipo.model';
import { CANTIDADXTIPOService } from '../service/cantidadxtipo.service';

@Component({
  selector: 'jhi-cantidadxtipo-update',
  templateUrl: './cantidadxtipo-update.component.html',
})
export class CANTIDADXTIPOUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    cantidadTipo: [],
    tipo: [],
  });

  constructor(protected cANTIDADXTIPOService: CANTIDADXTIPOService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cANTIDADXTIPO }) => {
      this.updateForm(cANTIDADXTIPO);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cANTIDADXTIPO = this.createFromForm();
    if (cANTIDADXTIPO.id !== undefined) {
      this.subscribeToSaveResponse(this.cANTIDADXTIPOService.update(cANTIDADXTIPO));
    } else {
      this.subscribeToSaveResponse(this.cANTIDADXTIPOService.create(cANTIDADXTIPO));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICANTIDADXTIPO>>): void {
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

  protected updateForm(cANTIDADXTIPO: ICANTIDADXTIPO): void {
    this.editForm.patchValue({
      id: cANTIDADXTIPO.id,
      cantidadTipo: cANTIDADXTIPO.cantidadTipo,
      tipo: cANTIDADXTIPO.tipo,
    });
  }

  protected createFromForm(): ICANTIDADXTIPO {
    return {
      ...new CANTIDADXTIPO(),
      id: this.editForm.get(['id'])!.value,
      cantidadTipo: this.editForm.get(['cantidadTipo'])!.value,
      tipo: this.editForm.get(['tipo'])!.value,
    };
  }
}
