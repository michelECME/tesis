import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ICantidadXModelo, CantidadXModelo } from '../cantidad-x-modelo.model';
import { CantidadXModeloService } from '../service/cantidad-x-modelo.service';

@Component({
  selector: 'jhi-cantidad-x-modelo-update',
  templateUrl: './cantidad-x-modelo-update.component.html',
})
export class CantidadXModeloUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    cantidadModelo: [],
    modelo: [],
  });

  constructor(
    protected cantidadXModeloService: CantidadXModeloService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cantidadXModelo }) => {
      this.updateForm(cantidadXModelo);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cantidadXModelo = this.createFromForm();
    if (cantidadXModelo.id !== undefined) {
      this.subscribeToSaveResponse(this.cantidadXModeloService.update(cantidadXModelo));
    } else {
      this.subscribeToSaveResponse(this.cantidadXModeloService.create(cantidadXModelo));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICantidadXModelo>>): void {
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

  protected updateForm(cantidadXModelo: ICantidadXModelo): void {
    this.editForm.patchValue({
      id: cantidadXModelo.id,
      cantidadModelo: cantidadXModelo.cantidadModelo,
      modelo: cantidadXModelo.modelo,
    });
  }

  protected createFromForm(): ICantidadXModelo {
    return {
      ...new CantidadXModelo(),
      id: this.editForm.get(['id'])!.value,
      cantidadModelo: this.editForm.get(['cantidadModelo'])!.value,
      modelo: this.editForm.get(['modelo'])!.value,
    };
  }
}
