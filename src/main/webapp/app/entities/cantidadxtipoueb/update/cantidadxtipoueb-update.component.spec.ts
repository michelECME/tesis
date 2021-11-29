jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { CANTIDADXTIPOUEBService } from '../service/cantidadxtipoueb.service';
import { ICANTIDADXTIPOUEB, CANTIDADXTIPOUEB } from '../cantidadxtipoueb.model';

import { CANTIDADXTIPOUEBUpdateComponent } from './cantidadxtipoueb-update.component';

describe('Component Tests', () => {
  describe('CANTIDADXTIPOUEB Management Update Component', () => {
    let comp: CANTIDADXTIPOUEBUpdateComponent;
    let fixture: ComponentFixture<CANTIDADXTIPOUEBUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let cANTIDADXTIPOUEBService: CANTIDADXTIPOUEBService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [CANTIDADXTIPOUEBUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(CANTIDADXTIPOUEBUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CANTIDADXTIPOUEBUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      cANTIDADXTIPOUEBService = TestBed.inject(CANTIDADXTIPOUEBService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const cANTIDADXTIPOUEB: ICANTIDADXTIPOUEB = { id: 456 };

        activatedRoute.data = of({ cANTIDADXTIPOUEB });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(cANTIDADXTIPOUEB));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const cANTIDADXTIPOUEB = { id: 123 };
        spyOn(cANTIDADXTIPOUEBService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ cANTIDADXTIPOUEB });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: cANTIDADXTIPOUEB }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(cANTIDADXTIPOUEBService.update).toHaveBeenCalledWith(cANTIDADXTIPOUEB);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const cANTIDADXTIPOUEB = new CANTIDADXTIPOUEB();
        spyOn(cANTIDADXTIPOUEBService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ cANTIDADXTIPOUEB });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: cANTIDADXTIPOUEB }));
        saveSubject.complete();

        // THEN
        expect(cANTIDADXTIPOUEBService.create).toHaveBeenCalledWith(cANTIDADXTIPOUEB);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const cANTIDADXTIPOUEB = { id: 123 };
        spyOn(cANTIDADXTIPOUEBService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ cANTIDADXTIPOUEB });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(cANTIDADXTIPOUEBService.update).toHaveBeenCalledWith(cANTIDADXTIPOUEB);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
