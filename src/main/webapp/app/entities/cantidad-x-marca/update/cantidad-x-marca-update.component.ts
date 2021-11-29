import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ICantidadXMarca, CantidadXMarca } from '../cantidad-x-marca.model';
import { CantidadXMarcaService } from '../service/cantidad-x-marca.service';

@Component({
  selector: 'jhi-cantidad-x-marca-update',
  templateUrl: './cantidad-x-marca-update.component.html',
})
export class CantidadXMarcaUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    cantidadMarca: [],
    modelo: [],
  });

  constructor(
    protected cantidadXMarcaService: CantidadXMarcaService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cantidadXMarca }) => {
      this.updateForm(cantidadXMarca);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cantidadXMarca = this.createFromForm();
    if (cantidadXMarca.id !== undefined) {
      this.subscribeToSaveResponse(this.cantidadXMarcaService.update(cantidadXMarca));
    } else {
      this.subscribeToSaveResponse(this.cantidadXMarcaService.create(cantidadXMarca));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICantidadXMarca>>): void {
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

  protected updateForm(cantidadXMarca: ICantidadXMarca): void {
    this.editForm.patchValue({
      id: cantidadXMarca.id,
      cantidadMarca: cantidadXMarca.cantidadMarca,
      modelo: cantidadXMarca.modelo,
    });
  }

  protected createFromForm(): ICantidadXMarca {
    return {
      ...new CantidadXMarca(),
      id: this.editForm.get(['id'])!.value,
      cantidadMarca: this.editForm.get(['cantidadMarca'])!.value,
      modelo: this.editForm.get(['modelo'])!.value,
    };
  }
}
