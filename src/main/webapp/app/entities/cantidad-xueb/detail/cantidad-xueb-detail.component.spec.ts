import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CantidadXUEBDetailComponent } from './cantidad-xueb-detail.component';

describe('Component Tests', () => {
  describe('CantidadXUEB Management Detail Component', () => {
    let comp: CantidadXUEBDetailComponent;
    let fixture: ComponentFixture<CantidadXUEBDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [CantidadXUEBDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ cantidadXUEB: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(CantidadXUEBDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CantidadXUEBDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load cantidadXUEB on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.cantidadXUEB).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
