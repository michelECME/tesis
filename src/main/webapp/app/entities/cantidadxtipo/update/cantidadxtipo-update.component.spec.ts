jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { CANTIDADXTIPOService } from '../service/cantidadxtipo.service';
import { ICANTIDADXTIPO, CANTIDADXTIPO } from '../cantidadxtipo.model';

import { CANTIDADXTIPOUpdateComponent } from './cantidadxtipo-update.component';

describe('Component Tests', () => {
  describe('CANTIDADXTIPO Management Update Component', () => {
    let comp: CANTIDADXTIPOUpdateComponent;
    let fixture: ComponentFixture<CANTIDADXTIPOUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let cANTIDADXTIPOService: CANTIDADXTIPOService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [CANTIDADXTIPOUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(CANTIDADXTIPOUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CANTIDADXTIPOUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      cANTIDADXTIPOService = TestBed.inject(CANTIDADXTIPOService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const cANTIDADXTIPO: ICANTIDADXTIPO = { id: 456 };

        activatedRoute.data = of({ cANTIDADXTIPO });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(cANTIDADXTIPO));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const cANTIDADXTIPO = { id: 123 };
        spyOn(cANTIDADXTIPOService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ cANTIDADXTIPO });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: cANTIDADXTIPO }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(cANTIDADXTIPOService.update).toHaveBeenCalledWith(cANTIDADXTIPO);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const cANTIDADXTIPO = new CANTIDADXTIPO();
        spyOn(cANTIDADXTIPOService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ cANTIDADXTIPO });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: cANTIDADXTIPO }));
        saveSubject.complete();

        // THEN
        expect(cANTIDADXTIPOService.create).toHaveBeenCalledWith(cANTIDADXTIPO);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const cANTIDADXTIPO = { id: 123 };
        spyOn(cANTIDADXTIPOService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ cANTIDADXTIPO });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(cANTIDADXTIPOService.update).toHaveBeenCalledWith(cANTIDADXTIPO);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
