jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { AgregadoXChoferService } from '../service/agregado-x-chofer.service';
import { IAgregadoXChofer, AgregadoXChofer } from '../agregado-x-chofer.model';

import { AgregadoXChoferUpdateComponent } from './agregado-x-chofer-update.component';

describe('Component Tests', () => {
  describe('AgregadoXChofer Management Update Component', () => {
    let comp: AgregadoXChoferUpdateComponent;
    let fixture: ComponentFixture<AgregadoXChoferUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let agregadoXChoferService: AgregadoXChoferService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [AgregadoXChoferUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(AgregadoXChoferUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AgregadoXChoferUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      agregadoXChoferService = TestBed.inject(AgregadoXChoferService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const agregadoXChofer: IAgregadoXChofer = { id: 456 };

        activatedRoute.data = of({ agregadoXChofer });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(agregadoXChofer));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const agregadoXChofer = { id: 123 };
        spyOn(agregadoXChoferService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ agregadoXChofer });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: agregadoXChofer }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(agregadoXChoferService.update).toHaveBeenCalledWith(agregadoXChofer);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const agregadoXChofer = new AgregadoXChofer();
        spyOn(agregadoXChoferService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ agregadoXChofer });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: agregadoXChofer }));
        saveSubject.complete();

        // THEN
        expect(agregadoXChoferService.create).toHaveBeenCalledWith(agregadoXChofer);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const agregadoXChofer = { id: 123 };
        spyOn(agregadoXChoferService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ agregadoXChofer });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(agregadoXChoferService.update).toHaveBeenCalledWith(agregadoXChofer);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
