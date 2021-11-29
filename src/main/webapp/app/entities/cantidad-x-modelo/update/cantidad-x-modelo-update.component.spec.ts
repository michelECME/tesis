jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { CantidadXModeloService } from '../service/cantidad-x-modelo.service';
import { ICantidadXModelo, CantidadXModelo } from '../cantidad-x-modelo.model';

import { CantidadXModeloUpdateComponent } from './cantidad-x-modelo-update.component';

describe('Component Tests', () => {
  describe('CantidadXModelo Management Update Component', () => {
    let comp: CantidadXModeloUpdateComponent;
    let fixture: ComponentFixture<CantidadXModeloUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let cantidadXModeloService: CantidadXModeloService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [CantidadXModeloUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(CantidadXModeloUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CantidadXModeloUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      cantidadXModeloService = TestBed.inject(CantidadXModeloService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const cantidadXModelo: ICantidadXModelo = { id: 456 };

        activatedRoute.data = of({ cantidadXModelo });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(cantidadXModelo));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const cantidadXModelo = { id: 123 };
        spyOn(cantidadXModeloService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ cantidadXModelo });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: cantidadXModelo }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(cantidadXModeloService.update).toHaveBeenCalledWith(cantidadXModelo);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const cantidadXModelo = new CantidadXModelo();
        spyOn(cantidadXModeloService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ cantidadXModelo });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: cantidadXModelo }));
        saveSubject.complete();

        // THEN
        expect(cantidadXModeloService.create).toHaveBeenCalledWith(cantidadXModelo);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const cantidadXModelo = { id: 123 };
        spyOn(cantidadXModeloService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ cantidadXModelo });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(cantidadXModeloService.update).toHaveBeenCalledWith(cantidadXModelo);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
