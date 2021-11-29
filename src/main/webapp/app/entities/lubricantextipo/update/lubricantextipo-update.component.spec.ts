jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { LUBRICANTEXTIPOService } from '../service/lubricantextipo.service';
import { ILUBRICANTEXTIPO, LUBRICANTEXTIPO } from '../lubricantextipo.model';

import { LUBRICANTEXTIPOUpdateComponent } from './lubricantextipo-update.component';

describe('Component Tests', () => {
  describe('LUBRICANTEXTIPO Management Update Component', () => {
    let comp: LUBRICANTEXTIPOUpdateComponent;
    let fixture: ComponentFixture<LUBRICANTEXTIPOUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let lUBRICANTEXTIPOService: LUBRICANTEXTIPOService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [LUBRICANTEXTIPOUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(LUBRICANTEXTIPOUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LUBRICANTEXTIPOUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      lUBRICANTEXTIPOService = TestBed.inject(LUBRICANTEXTIPOService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const lUBRICANTEXTIPO: ILUBRICANTEXTIPO = { id: 456 };

        activatedRoute.data = of({ lUBRICANTEXTIPO });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(lUBRICANTEXTIPO));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const lUBRICANTEXTIPO = { id: 123 };
        spyOn(lUBRICANTEXTIPOService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ lUBRICANTEXTIPO });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: lUBRICANTEXTIPO }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(lUBRICANTEXTIPOService.update).toHaveBeenCalledWith(lUBRICANTEXTIPO);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const lUBRICANTEXTIPO = new LUBRICANTEXTIPO();
        spyOn(lUBRICANTEXTIPOService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ lUBRICANTEXTIPO });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: lUBRICANTEXTIPO }));
        saveSubject.complete();

        // THEN
        expect(lUBRICANTEXTIPOService.create).toHaveBeenCalledWith(lUBRICANTEXTIPO);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const lUBRICANTEXTIPO = { id: 123 };
        spyOn(lUBRICANTEXTIPOService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ lUBRICANTEXTIPO });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(lUBRICANTEXTIPOService.update).toHaveBeenCalledWith(lUBRICANTEXTIPO);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
