import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IChofer, Chofer } from '../chofer.model';
import { ChoferService } from '../service/chofer.service';

@Component({
  selector: 'jhi-chofer-update',
  templateUrl: './chofer-update.component.html',
})
export class ChoferUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nombre: [],
    licencia: [],
    no_licencia: [null, [Validators.required]],
  });

  constructor(protected choferService: ChoferService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ chofer }) => {
      this.updateForm(chofer);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const chofer = this.createFromForm();
    if (chofer.id !== undefined) {
      this.subscribeToSaveResponse(this.choferService.update(chofer));
    } else {
      this.subscribeToSaveResponse(this.choferService.create(chofer));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IChofer>>): void {
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

  protected updateForm(chofer: IChofer): void {
    this.editForm.patchValue({
      id: chofer.id,
      nombre: chofer.nombre,
      licencia: chofer.licencia,
      no_licencia: chofer.no_licencia,
    });
  }

  protected createFromForm(): IChofer {
    return {
      ...new Chofer(),
      id: this.editForm.get(['id'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      licencia: this.editForm.get(['licencia'])!.value,
      no_licencia: this.editForm.get(['no_licencia'])!.value,
    };
  }
}
