jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { COMBUSTIBLEXUEBService } from '../service/combustiblexueb.service';
import { ICOMBUSTIBLEXUEB, COMBUSTIBLEXUEB } from '../combustiblexueb.model';

import { COMBUSTIBLEXUEBUpdateComponent } from './combustiblexueb-update.component';

describe('Component Tests', () => {
  describe('COMBUSTIBLEXUEB Management Update Component', () => {
    let comp: COMBUSTIBLEXUEBUpdateComponent;
    let fixture: ComponentFixture<COMBUSTIBLEXUEBUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let cOMBUSTIBLEXUEBService: COMBUSTIBLEXUEBService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [COMBUSTIBLEXUEBUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(COMBUSTIBLEXUEBUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(COMBUSTIBLEXUEBUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      cOMBUSTIBLEXUEBService = TestBed.inject(COMBUSTIBLEXUEBService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const cOMBUSTIBLEXUEB: ICOMBUSTIBLEXUEB = { id: 456 };

        activatedRoute.data = of({ cOMBUSTIBLEXUEB });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(cOMBUSTIBLEXUEB));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const cOMBUSTIBLEXUEB = { id: 123 };
        spyOn(cOMBUSTIBLEXUEBService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ cOMBUSTIBLEXUEB });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: cOMBUSTIBLEXUEB }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(cOMBUSTIBLEXUEBService.update).toHaveBeenCalledWith(cOMBUSTIBLEXUEB);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const cOMBUSTIBLEXUEB = new COMBUSTIBLEXUEB();
        spyOn(cOMBUSTIBLEXUEBService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ cOMBUSTIBLEXUEB });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: cOMBUSTIBLEXUEB }));
        saveSubject.complete();

        // THEN
        expect(cOMBUSTIBLEXUEBService.create).toHaveBeenCalledWith(cOMBUSTIBLEXUEB);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const cOMBUSTIBLEXUEB = { id: 123 };
        spyOn(cOMBUSTIBLEXUEBService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ cOMBUSTIBLEXUEB });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(cOMBUSTIBLEXUEBService.update).toHaveBeenCalledWith(cOMBUSTIBLEXUEB);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
