jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { EquipoService } from '../service/equipo.service';
import { IEquipo, Equipo } from '../equipo.model';
import { IMotor } from 'app/entities/motor/motor.model';
import { MotorService } from 'app/entities/motor/service/motor.service';
import { IChofer } from 'app/entities/chofer/chofer.model';
import { ChoferService } from 'app/entities/chofer/service/chofer.service';

import { EquipoUpdateComponent } from './equipo-update.component';

describe('Component Tests', () => {
  describe('Equipo Management Update Component', () => {
    let comp: EquipoUpdateComponent;
    let fixture: ComponentFixture<EquipoUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let equipoService: EquipoService;
    let motorService: MotorService;
    let choferService: ChoferService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [EquipoUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(EquipoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EquipoUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      equipoService = TestBed.inject(EquipoService);
      motorService = TestBed.inject(MotorService);
      choferService = TestBed.inject(ChoferService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call motor query and add missing value', () => {
        const equipo: IEquipo = { id: 456 };
        const motor: IMotor = { id: 10730 };
        equipo.motor = motor;

        const motorCollection: IMotor[] = [{ id: 77365 }];
        spyOn(motorService, 'query').and.returnValue(of(new HttpResponse({ body: motorCollection })));
        const expectedCollection: IMotor[] = [motor, ...motorCollection];
        spyOn(motorService, 'addMotorToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ equipo });
        comp.ngOnInit();

        expect(motorService.query).toHaveBeenCalled();
        expect(motorService.addMotorToCollectionIfMissing).toHaveBeenCalledWith(motorCollection, motor);
        expect(comp.motorsCollection).toEqual(expectedCollection);
      });

      it('Should call chofer query and add missing value', () => {
        const equipo: IEquipo = { id: 456 };
        const chofer: IChofer = { id: 25324 };
        equipo.chofer = chofer;

        const choferCollection: IChofer[] = [{ id: 40480 }];
        spyOn(choferService, 'query').and.returnValue(of(new HttpResponse({ body: choferCollection })));
        const expectedCollection: IChofer[] = [chofer, ...choferCollection];
        spyOn(choferService, 'addChoferToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ equipo });
        comp.ngOnInit();

        expect(choferService.query).toHaveBeenCalled();
        expect(choferService.addChoferToCollectionIfMissing).toHaveBeenCalledWith(choferCollection, chofer);
        expect(comp.chofersCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const equipo: IEquipo = { id: 456 };
        const motor: IMotor = { id: 44326 };
        equipo.motor = motor;
        const chofer: IChofer = { id: 29557 };
        equipo.chofer = chofer;

        activatedRoute.data = of({ equipo });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(equipo));
        expect(comp.motorsCollection).toContain(motor);
        expect(comp.chofersCollection).toContain(chofer);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const equipo = { id: 123 };
        spyOn(equipoService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ equipo });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: equipo }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(equipoService.update).toHaveBeenCalledWith(equipo);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const equipo = new Equipo();
        spyOn(equipoService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ equipo });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: equipo }));
        saveSubject.complete();

        // THEN
        expect(equipoService.create).toHaveBeenCalledWith(equipo);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const equipo = { id: 123 };
        spyOn(equipoService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ equipo });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(equipoService.update).toHaveBeenCalledWith(equipo);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackMotorById', () => {
        it('Should return tracked Motor primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackMotorById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

      describe('trackChoferById', () => {
        it('Should return tracked Chofer primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackChoferById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
