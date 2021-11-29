jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { AsignacionService } from '../service/asignacion.service';
import { IAsignacion, Asignacion } from '../asignacion.model';
import { IChofer } from 'app/entities/chofer/chofer.model';
import { ChoferService } from 'app/entities/chofer/service/chofer.service';
import { IRecurso } from 'app/entities/recurso/recurso.model';
import { RecursoService } from 'app/entities/recurso/service/recurso.service';

import { AsignacionUpdateComponent } from './asignacion-update.component';

describe('Component Tests', () => {
  describe('Asignacion Management Update Component', () => {
    let comp: AsignacionUpdateComponent;
    let fixture: ComponentFixture<AsignacionUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let asignacionService: AsignacionService;
    let choferService: ChoferService;
    let recursoService: RecursoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [AsignacionUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(AsignacionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AsignacionUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      asignacionService = TestBed.inject(AsignacionService);
      choferService = TestBed.inject(ChoferService);
      recursoService = TestBed.inject(RecursoService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call Chofer query and add missing value', () => {
        const asignacion: IAsignacion = { id: 456 };
        const chofer: IChofer = { id: 84976 };
        asignacion.chofer = chofer;

        const choferCollection: IChofer[] = [{ id: 55526 }];
        spyOn(choferService, 'query').and.returnValue(of(new HttpResponse({ body: choferCollection })));
        const additionalChofers = [chofer];
        const expectedCollection: IChofer[] = [...additionalChofers, ...choferCollection];
        spyOn(choferService, 'addChoferToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ asignacion });
        comp.ngOnInit();

        expect(choferService.query).toHaveBeenCalled();
        expect(choferService.addChoferToCollectionIfMissing).toHaveBeenCalledWith(choferCollection, ...additionalChofers);
        expect(comp.chofersSharedCollection).toEqual(expectedCollection);
      });

      it('Should call Recurso query and add missing value', () => {
        const asignacion: IAsignacion = { id: 456 };
        const recurso: IRecurso = { id: 34484 };
        asignacion.recurso = recurso;

        const recursoCollection: IRecurso[] = [{ id: 49368 }];
        spyOn(recursoService, 'query').and.returnValue(of(new HttpResponse({ body: recursoCollection })));
        const additionalRecursos = [recurso];
        const expectedCollection: IRecurso[] = [...additionalRecursos, ...recursoCollection];
        spyOn(recursoService, 'addRecursoToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ asignacion });
        comp.ngOnInit();

        expect(recursoService.query).toHaveBeenCalled();
        expect(recursoService.addRecursoToCollectionIfMissing).toHaveBeenCalledWith(recursoCollection, ...additionalRecursos);
        expect(comp.recursosSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const asignacion: IAsignacion = { id: 456 };
        const chofer: IChofer = { id: 58780 };
        asignacion.chofer = chofer;
        const recurso: IRecurso = { id: 2218 };
        asignacion.recurso = recurso;

        activatedRoute.data = of({ asignacion });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(asignacion));
        expect(comp.chofersSharedCollection).toContain(chofer);
        expect(comp.recursosSharedCollection).toContain(recurso);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const asignacion = { id: 123 };
        spyOn(asignacionService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ asignacion });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: asignacion }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(asignacionService.update).toHaveBeenCalledWith(asignacion);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const asignacion = new Asignacion();
        spyOn(asignacionService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ asignacion });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: asignacion }));
        saveSubject.complete();

        // THEN
        expect(asignacionService.create).toHaveBeenCalledWith(asignacion);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const asignacion = { id: 123 };
        spyOn(asignacionService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ asignacion });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(asignacionService.update).toHaveBeenCalledWith(asignacion);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackChoferById', () => {
        it('Should return tracked Chofer primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackChoferById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

      describe('trackRecursoById', () => {
        it('Should return tracked Recurso primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackRecursoById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
