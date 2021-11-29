jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { CantidadXUEBService } from '../service/cantidad-xueb.service';
import { ICantidadXUEB, CantidadXUEB } from '../cantidad-xueb.model';

import { CantidadXUEBUpdateComponent } from './cantidad-xueb-update.component';

describe('Component Tests', () => {
  describe('CantidadXUEB Management Update Component', () => {
    let comp: CantidadXUEBUpdateComponent;
    let fixture: ComponentFixture<CantidadXUEBUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let cantidadXUEBService: CantidadXUEBService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [CantidadXUEBUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(CantidadXUEBUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CantidadXUEBUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      cantidadXUEBService = TestBed.inject(CantidadXUEBService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const cantidadXUEB: ICantidadXUEB = { id: 456 };

        activatedRoute.data = of({ cantidadXUEB });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(cantidadXUEB));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const cantidadXUEB = { id: 123 };
        spyOn(cantidadXUEBService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ cantidadXUEB });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: cantidadXUEB }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(cantidadXUEBService.update).toHaveBeenCalledWith(cantidadXUEB);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const cantidadXUEB = new CantidadXUEB();
        spyOn(cantidadXUEBService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ cantidadXUEB });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: cantidadXUEB }));
        saveSubject.complete();

        // THEN
        expect(cantidadXUEBService.create).toHaveBeenCalledWith(cantidadXUEB);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const cantidadXUEB = { id: 123 };
        spyOn(cantidadXUEBService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ cantidadXUEB });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(cantidadXUEBService.update).toHaveBeenCalledWith(cantidadXUEB);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
