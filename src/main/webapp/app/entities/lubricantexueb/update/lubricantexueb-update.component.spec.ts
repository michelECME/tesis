jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { LUBRICANTEXUEBService } from '../service/lubricantexueb.service';
import { ILUBRICANTEXUEB, LUBRICANTEXUEB } from '../lubricantexueb.model';

import { LUBRICANTEXUEBUpdateComponent } from './lubricantexueb-update.component';

describe('Component Tests', () => {
  describe('LUBRICANTEXUEB Management Update Component', () => {
    let comp: LUBRICANTEXUEBUpdateComponent;
    let fixture: ComponentFixture<LUBRICANTEXUEBUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let lUBRICANTEXUEBService: LUBRICANTEXUEBService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [LUBRICANTEXUEBUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(LUBRICANTEXUEBUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LUBRICANTEXUEBUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      lUBRICANTEXUEBService = TestBed.inject(LUBRICANTEXUEBService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const lUBRICANTEXUEB: ILUBRICANTEXUEB = { id: 456 };

        activatedRoute.data = of({ lUBRICANTEXUEB });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(lUBRICANTEXUEB));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const lUBRICANTEXUEB = { id: 123 };
        spyOn(lUBRICANTEXUEBService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ lUBRICANTEXUEB });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: lUBRICANTEXUEB }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(lUBRICANTEXUEBService.update).toHaveBeenCalledWith(lUBRICANTEXUEB);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const lUBRICANTEXUEB = new LUBRICANTEXUEB();
        spyOn(lUBRICANTEXUEBService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ lUBRICANTEXUEB });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: lUBRICANTEXUEB }));
        saveSubject.complete();

        // THEN
        expect(lUBRICANTEXUEBService.create).toHaveBeenCalledWith(lUBRICANTEXUEB);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const lUBRICANTEXUEB = { id: 123 };
        spyOn(lUBRICANTEXUEBService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ lUBRICANTEXUEB });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(lUBRICANTEXUEBService.update).toHaveBeenCalledWith(lUBRICANTEXUEB);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
