import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ICANTIDADXTIPOUEB, CANTIDADXTIPOUEB } from '../cantidadxtipoueb.model';
import { CANTIDADXTIPOUEBService } from '../service/cantidadxtipoueb.service';

@Component({
  selector: 'jhi-cantidadxtipoueb-update',
  templateUrl: './cantidadxtipoueb-update.component.html',
})
export class CANTIDADXTIPOUEBUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    cantidadTipoUEB: [],
    tipoCarro: [],
    ueb: [],
  });

  constructor(
    protected cANTIDADXTIPOUEBService: CANTIDADXTIPOUEBService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cANTIDADXTIPOUEB }) => {
      this.updateForm(cANTIDADXTIPOUEB);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cANTIDADXTIPOUEB = this.createFromForm();
    if (cANTIDADXTIPOUEB.id !== undefined) {
      this.subscribeToSaveResponse(this.cANTIDADXTIPOUEBService.update(cANTIDADXTIPOUEB));
    } else {
      this.subscribeToSaveResponse(this.cANTIDADXTIPOUEBService.create(cANTIDADXTIPOUEB));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICANTIDADXTIPOUEB>>): void {
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

  protected updateForm(cANTIDADXTIPOUEB: ICANTIDADXTIPOUEB): void {
    this.editForm.patchValue({
      id: cANTIDADXTIPOUEB.id,
      cantidadTipoUEB: cANTIDADXTIPOUEB.cantidadTipoUEB,
      tipoCarro: cANTIDADXTIPOUEB.tipoCarro,
      ueb: cANTIDADXTIPOUEB.ueb,
    });
  }

  protected createFromForm(): ICANTIDADXTIPOUEB {
    return {
      ...new CANTIDADXTIPOUEB(),
      id: this.editForm.get(['id'])!.value,
      cantidadTipoUEB: this.editForm.get(['cantidadTipoUEB'])!.value,
      tipoCarro: this.editForm.get(['tipoCarro'])!.value,
      ueb: this.editForm.get(['ueb'])!.value,
    };
  }
}
