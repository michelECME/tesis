jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { ENTREGAXTIPOService } from '../service/entregaxtipo.service';
import { IENTREGAXTIPO, ENTREGAXTIPO } from '../entregaxtipo.model';

import { ENTREGAXTIPOUpdateComponent } from './entregaxtipo-update.component';

describe('Component Tests', () => {
  describe('ENTREGAXTIPO Management Update Component', () => {
    let comp: ENTREGAXTIPOUpdateComponent;
    let fixture: ComponentFixture<ENTREGAXTIPOUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let eNTREGAXTIPOService: ENTREGAXTIPOService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [ENTREGAXTIPOUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(ENTREGAXTIPOUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ENTREGAXTIPOUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      eNTREGAXTIPOService = TestBed.inject(ENTREGAXTIPOService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const eNTREGAXTIPO: IENTREGAXTIPO = { id: 456 };

        activatedRoute.data = of({ eNTREGAXTIPO });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(eNTREGAXTIPO));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const eNTREGAXTIPO = { id: 123 };
        spyOn(eNTREGAXTIPOService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ eNTREGAXTIPO });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: eNTREGAXTIPO }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(eNTREGAXTIPOService.update).toHaveBeenCalledWith(eNTREGAXTIPO);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const eNTREGAXTIPO = new ENTREGAXTIPO();
        spyOn(eNTREGAXTIPOService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ eNTREGAXTIPO });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: eNTREGAXTIPO }));
        saveSubject.complete();

        // THEN
        expect(eNTREGAXTIPOService.create).toHaveBeenCalledWith(eNTREGAXTIPO);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const eNTREGAXTIPO = { id: 123 };
        spyOn(eNTREGAXTIPOService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ eNTREGAXTIPO });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(eNTREGAXTIPOService.update).toHaveBeenCalledWith(eNTREGAXTIPO);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
