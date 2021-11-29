import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import * as dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { IAsignacion, Asignacion } from '../asignacion.model';
import { AsignacionService } from '../service/asignacion.service';
import { IChofer } from 'app/entities/chofer/chofer.model';
import { ChoferService } from 'app/entities/chofer/service/chofer.service';
import { IRecurso } from 'app/entities/recurso/recurso.model';
import { RecursoService } from 'app/entities/recurso/service/recurso.service';

@Component({
  selector: 'jhi-asignacion-update',
  templateUrl: './asignacion-update.component.html',
})
export class AsignacionUpdateComponent implements OnInit {
  isSaving = false;

  chofersSharedCollection: IChofer[] = [];
  recursosSharedCollection: IRecurso[] = [];

  editForm = this.fb.group({
    id: [],
    fecha: [],
    cantidad: [],
    chofer: [],
    recurso: [],
  });

  constructor(
    protected asignacionService: AsignacionService,
    protected choferService: ChoferService,
    protected recursoService: RecursoService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ asignacion }) => {
      if (asignacion.id === undefined) {
        const today = dayjs().startOf('day');
        asignacion.fecha = today;
      }

      this.updateForm(asignacion);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const asignacion = this.createFromForm();
    if (asignacion.id !== undefined) {
      this.subscribeToSaveResponse(this.asignacionService.update(asignacion));
    } else {
      this.subscribeToSaveResponse(this.asignacionService.create(asignacion));
    }
  }

  trackChoferById(index: number, item: IChofer): number {
    return item.id!;
  }

  trackRecursoById(index: number, item: IRecurso): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAsignacion>>): void {
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

  protected updateForm(asignacion: IAsignacion): void {
    this.editForm.patchValue({
      id: asignacion.id,
      fecha: asignacion.fecha ? asignacion.fecha.format(DATE_TIME_FORMAT) : null,
      cantidad: asignacion.cantidad,
      chofer: asignacion.chofer,
      recurso: asignacion.recurso,
    });

    this.chofersSharedCollection = this.choferService.addChoferToCollectionIfMissing(this.chofersSharedCollection, asignacion.chofer);
    this.recursosSharedCollection = this.recursoService.addRecursoToCollectionIfMissing(this.recursosSharedCollection, asignacion.recurso);
  }

  protected loadRelationshipsOptions(): void {
    this.choferService
      .query()
      .pipe(map((res: HttpResponse<IChofer[]>) => res.body ?? []))
      .pipe(map((chofers: IChofer[]) => this.choferService.addChoferToCollectionIfMissing(chofers, this.editForm.get('chofer')!.value)))
      .subscribe((chofers: IChofer[]) => (this.chofersSharedCollection = chofers));

    this.recursoService
      .query()
      .pipe(map((res: HttpResponse<IRecurso[]>) => res.body ?? []))
      .pipe(
        map((recursos: IRecurso[]) => this.recursoService.addRecursoToCollectionIfMissing(recursos, this.editForm.get('recurso')!.value))
      )
      .subscribe((recursos: IRecurso[]) => (this.recursosSharedCollection = recursos));
  }

  protected createFromForm(): IAsignacion {
    return {
      ...new Asignacion(),
      id: this.editForm.get(['id'])!.value,
      fecha: this.editForm.get(['fecha'])!.value ? dayjs(this.editForm.get(['fecha'])!.value, DATE_TIME_FORMAT) : undefined,
      cantidad: this.editForm.get(['cantidad'])!.value,
      chofer: this.editForm.get(['chofer'])!.value,
      recurso: this.editForm.get(['recurso'])!.value,
    };
  }
}
