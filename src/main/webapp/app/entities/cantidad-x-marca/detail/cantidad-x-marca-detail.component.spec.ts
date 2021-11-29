import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CantidadXMarcaDetailComponent } from './cantidad-x-marca-detail.component';

describe('Component Tests', () => {
  describe('CantidadXMarca Management Detail Component', () => {
    let comp: CantidadXMarcaDetailComponent;
    let fixture: ComponentFixture<CantidadXMarcaDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [CantidadXMarcaDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ cantidadXMarca: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(CantidadXMarcaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CantidadXMarcaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load cantidadXMarca on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.cantidadXMarca).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
