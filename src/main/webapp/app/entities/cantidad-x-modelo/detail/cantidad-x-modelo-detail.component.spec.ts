import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CantidadXModeloDetailComponent } from './cantidad-x-modelo-detail.component';

describe('Component Tests', () => {
  describe('CantidadXModelo Management Detail Component', () => {
    let comp: CantidadXModeloDetailComponent;
    let fixture: ComponentFixture<CantidadXModeloDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [CantidadXModeloDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ cantidadXModelo: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(CantidadXModeloDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CantidadXModeloDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load cantidadXModelo on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.cantidadXModelo).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
