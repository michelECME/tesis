import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IAgregadoXChofer, AgregadoXChofer } from '../agregado-x-chofer.model';
import { AgregadoXChoferService } from '../service/agregado-x-chofer.service';

@Component({
  selector: 'jhi-agregado-x-chofer-update',
  templateUrl: './agregado-x-chofer-update.component.html',
})
export class AgregadoXChoferUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    cantidadChorfer: [],
    chapa: [],
    nombre: [],
  });

  constructor(
    protected agregadoXChoferService: AgregadoXChoferService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ agregadoXChofer }) => {
      this.updateForm(agregadoXChofer);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const agregadoXChofer = this.createFromForm();
    if (agregadoXChofer.id !== undefined) {
      this.subscribeToSaveResponse(this.agregadoXChoferService.update(agregadoXChofer));
    } else {
      this.subscribeToSaveResponse(this.agregadoXChoferService.create(agregadoXChofer));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAgregadoXChofer>>): void {
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

  protected updateForm(agregadoXChofer: IAgregadoXChofer): void {
    this.editForm.patchValue({
      id: agregadoXChofer.id,
      cantidadChorfer: agregadoXChofer.cantidadChorfer,
      chapa: agregadoXChofer.chapa,
      nombre: agregadoXChofer.nombre,
    });
  }

  protected createFromForm(): IAgregadoXChofer {
    return {
      ...new AgregadoXChofer(),
      id: this.editForm.get(['id'])!.value,
      cantidadChorfer: this.editForm.get(['cantidadChorfer'])!.value,
      chapa: this.editForm.get(['chapa'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
    };
  }
}
