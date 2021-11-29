import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IRecurso, Recurso } from '../recurso.model';
import { RecursoService } from '../service/recurso.service';

@Component({
  selector: 'jhi-recurso-update',
  templateUrl: './recurso-update.component.html',
})
export class RecursoUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nombre: [],
    um: [],
    tipo: [],
  });

  constructor(protected recursoService: RecursoService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ recurso }) => {
      this.updateForm(recurso);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const recurso = this.createFromForm();
    if (recurso.id !== undefined) {
      this.subscribeToSaveResponse(this.recursoService.update(recurso));
    } else {
      this.subscribeToSaveResponse(this.recursoService.create(recurso));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRecurso>>): void {
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

  protected updateForm(recurso: IRecurso): void {
    this.editForm.patchValue({
      id: recurso.id,
      nombre: recurso.nombre,
      um: recurso.um,
      tipo: recurso.tipo,
    });
  }

  protected createFromForm(): IRecurso {
    return {
      ...new Recurso(),
      id: this.editForm.get(['id'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      um: this.editForm.get(['um'])!.value,
      tipo: this.editForm.get(['tipo'])!.value,
    };
  }
}
