import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IEquipo, Equipo } from '../equipo.model';
import { EquipoService } from '../service/equipo.service';
import { IMotor } from 'app/entities/motor/motor.model';
import { MotorService } from 'app/entities/motor/service/motor.service';
import { IChofer } from 'app/entities/chofer/chofer.model';
import { ChoferService } from 'app/entities/chofer/service/chofer.service';

@Component({
  selector: 'jhi-equipo-update',
  templateUrl: './equipo-update.component.html',
})
export class EquipoUpdateComponent implements OnInit {
  isSaving = false;

  motorsCollection: IMotor[] = [];
  chofersCollection: IChofer[] = [];

  editForm = this.fb.group({
    id: [],
    chapilla: [null, []],
    clase: [],
    modelo: [],
    codigo: [null, []],
    chapa: [null, []],
    estado: [],
    anno: [],
    ueb: [],
    marca: [],
    motor: [],
    chofer: [],
  });

  constructor(
    protected equipoService: EquipoService,
    protected motorService: MotorService,
    protected choferService: ChoferService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ equipo }) => {
      this.updateForm(equipo);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const equipo = this.createFromForm();
    if (equipo.id !== undefined) {
      this.subscribeToSaveResponse(this.equipoService.update(equipo));
    } else {
      this.subscribeToSaveResponse(this.equipoService.create(equipo));
    }
  }

  trackMotorById(index: number, item: IMotor): number {
    return item.id!;
  }

  trackChoferById(index: number, item: IChofer): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEquipo>>): void {
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

  protected updateForm(equipo: IEquipo): void {
    this.editForm.patchValue({
      id: equipo.id,
      chapilla: equipo.chapilla,
      clase: equipo.clase,
      modelo: equipo.modelo,
      codigo: equipo.codigo,
      chapa: equipo.chapa,
      estado: equipo.estado,
      anno: equipo.anno,
      ueb: equipo.ueb,
      marca: equipo.marca,
      motor: equipo.motor,
      chofer: equipo.chofer,
    });

    this.motorsCollection = this.motorService.addMotorToCollectionIfMissing(this.motorsCollection, equipo.motor);
    this.chofersCollection = this.choferService.addChoferToCollectionIfMissing(this.chofersCollection, equipo.chofer);
  }

  protected loadRelationshipsOptions(): void {
    this.motorService
      .query({ filter: 'equipo-is-null' })
      .pipe(map((res: HttpResponse<IMotor[]>) => res.body ?? []))
      .pipe(map((motors: IMotor[]) => this.motorService.addMotorToCollectionIfMissing(motors, this.editForm.get('motor')!.value)))
      .subscribe((motors: IMotor[]) => (this.motorsCollection = motors));

    this.choferService
      .query({ filter: 'equipo-is-null' })
      .pipe(map((res: HttpResponse<IChofer[]>) => res.body ?? []))
      .pipe(map((chofers: IChofer[]) => this.choferService.addChoferToCollectionIfMissing(chofers, this.editForm.get('chofer')!.value)))
      .subscribe((chofers: IChofer[]) => (this.chofersCollection = chofers));
  }

  protected createFromForm(): IEquipo {
    return {
      ...new Equipo(),
      id: this.editForm.get(['id'])!.value,
      chapilla: this.editForm.get(['chapilla'])!.value,
      clase: this.editForm.get(['clase'])!.value,
      modelo: this.editForm.get(['modelo'])!.value,
      codigo: this.editForm.get(['codigo'])!.value,
      chapa: this.editForm.get(['chapa'])!.value,
      estado: this.editForm.get(['estado'])!.value,
      anno: this.editForm.get(['anno'])!.value,
      ueb: this.editForm.get(['ueb'])!.value,
      marca: this.editForm.get(['marca'])!.value,
      motor: this.editForm.get(['motor'])!.value,
      chofer: this.editForm.get(['chofer'])!.value,
    };
  }
}
