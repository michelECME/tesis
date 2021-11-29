jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { CantidadXMarcaService } from '../service/cantidad-x-marca.service';
import { ICantidadXMarca, CantidadXMarca } from '../cantidad-x-marca.model';

import { CantidadXMarcaUpdateComponent } from './cantidad-x-marca-update.component';

describe('Component Tests', () => {
  describe('CantidadXMarca Management Update Component', () => {
    let comp: CantidadXMarcaUpdateComponent;
    let fixture: ComponentFixture<CantidadXMarcaUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let cantidadXMarcaService: CantidadXMarcaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [CantidadXMarcaUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(CantidadXMarcaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CantidadXMarcaUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      cantidadXMarcaService = TestBed.inject(CantidadXMarcaService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const cantidadXMarca: ICantidadXMarca = { id: 456 };

        activatedRoute.data = of({ cantidadXMarca });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(cantidadXMarca));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const cantidadXMarca = { id: 123 };
        spyOn(cantidadXMarcaService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ cantidadXMarca });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: cantidadXMarca }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(cantidadXMarcaService.update).toHaveBeenCalledWith(cantidadXMarca);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const cantidadXMarca = new CantidadXMarca();
        spyOn(cantidadXMarcaService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ cantidadXMarca });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: cantidadXMarca }));
        saveSubject.complete();

        // THEN
        expect(cantidadXMarcaService.create).toHaveBeenCalledWith(cantidadXMarca);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const cantidadXMarca = { id: 123 };
        spyOn(cantidadXMarcaService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ cantidadXMarca });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(cantidadXMarcaService.update).toHaveBeenCalledWith(cantidadXMarca);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
