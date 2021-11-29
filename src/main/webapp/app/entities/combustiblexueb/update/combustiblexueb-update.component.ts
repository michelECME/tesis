import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ICOMBUSTIBLEXUEB, COMBUSTIBLEXUEB } from '../combustiblexueb.model';
import { COMBUSTIBLEXUEBService } from '../service/combustiblexueb.service';

@Component({
  selector: 'jhi-combustiblexueb-update',
  templateUrl: './combustiblexueb-update.component.html',
})
export class COMBUSTIBLEXUEBUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    cantidadCombustibleUEB: [],
    ueb: [],
  });

  constructor(
    protected cOMBUSTIBLEXUEBService: COMBUSTIBLEXUEBService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cOMBUSTIBLEXUEB }) => {
      this.updateForm(cOMBUSTIBLEXUEB);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cOMBUSTIBLEXUEB = this.createFromForm();
    if (cOMBUSTIBLEXUEB.id !== undefined) {
      this.subscribeToSaveResponse(this.cOMBUSTIBLEXUEBService.update(cOMBUSTIBLEXUEB));
    } else {
      this.subscribeToSaveResponse(this.cOMBUSTIBLEXUEBService.create(cOMBUSTIBLEXUEB));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICOMBUSTIBLEXUEB>>): void {
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

  protected updateForm(cOMBUSTIBLEXUEB: ICOMBUSTIBLEXUEB): void {
    this.editForm.patchValue({
      id: cOMBUSTIBLEXUEB.id,
      cantidadCombustibleUEB: cOMBUSTIBLEXUEB.cantidadCombustibleUEB,
      ueb: cOMBUSTIBLEXUEB.ueb,
    });
  }

  protected createFromForm(): ICOMBUSTIBLEXUEB {
    return {
      ...new COMBUSTIBLEXUEB(),
      id: this.editForm.get(['id'])!.value,
      cantidadCombustibleUEB: this.editForm.get(['cantidadCombustibleUEB'])!.value,
      ueb: this.editForm.get(['ueb'])!.value,
    };
  }
}
