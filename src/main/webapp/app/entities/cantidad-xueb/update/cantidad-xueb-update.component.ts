import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ICantidadXUEB, CantidadXUEB } from '../cantidad-xueb.model';
import { CantidadXUEBService } from '../service/cantidad-xueb.service';

@Component({
  selector: 'jhi-cantidad-xueb-update',
  templateUrl: './cantidad-xueb-update.component.html',
})
export class CantidadXUEBUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    cantidadModelo: [],
    ueb: [],
  });

  constructor(protected cantidadXUEBService: CantidadXUEBService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cantidadXUEB }) => {
      this.updateForm(cantidadXUEB);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cantidadXUEB = this.createFromForm();
    if (cantidadXUEB.id !== undefined) {
      this.subscribeToSaveResponse(this.cantidadXUEBService.update(cantidadXUEB));
    } else {
      this.subscribeToSaveResponse(this.cantidadXUEBService.create(cantidadXUEB));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICantidadXUEB>>): void {
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

  protected updateForm(cantidadXUEB: ICantidadXUEB): void {
    this.editForm.patchValue({
      id: cantidadXUEB.id,
      cantidadModelo: cantidadXUEB.cantidadModelo,
      ueb: cantidadXUEB.ueb,
    });
  }

  protected createFromForm(): ICantidadXUEB {
    return {
      ...new CantidadXUEB(),
      id: this.editForm.get(['id'])!.value,
      cantidadModelo: this.editForm.get(['cantidadModelo'])!.value,
      ueb: this.editForm.get(['ueb'])!.value,
    };
  }
}
