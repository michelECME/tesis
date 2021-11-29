import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AsignacionDetailComponent } from './asignacion-detail.component';

describe('Component Tests', () => {
  describe('Asignacion Management Detail Component', () => {
    let comp: AsignacionDetailComponent;
    let fixture: ComponentFixture<AsignacionDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [AsignacionDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ asignacion: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(AsignacionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AsignacionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load asignacion on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.asignacion).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
