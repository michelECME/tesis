jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { RecursoService } from '../service/recurso.service';
import { IRecurso, Recurso } from '../recurso.model';

import { RecursoUpdateComponent } from './recurso-update.component';

describe('Component Tests', () => {
  describe('Recurso Management Update Component', () => {
    let comp: RecursoUpdateComponent;
    let fixture: ComponentFixture<RecursoUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let recursoService: RecursoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [RecursoUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(RecursoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RecursoUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      recursoService = TestBed.inject(RecursoService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const recurso: IRecurso = { id: 456 };

        activatedRoute.data = of({ recurso });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(recurso));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const recurso = { id: 123 };
        spyOn(recursoService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ recurso });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: recurso }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(recursoService.update).toHaveBeenCalledWith(recurso);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const recurso = new Recurso();
        spyOn(recursoService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ recurso });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: recurso }));
        saveSubject.complete();

        // THEN
        expect(recursoService.create).toHaveBeenCalledWith(recurso);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const recurso = { id: 123 };
        spyOn(recursoService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ recurso });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(recursoService.update).toHaveBeenCalledWith(recurso);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
