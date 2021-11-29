import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AgregadoXChoferDetailComponent } from './agregado-x-chofer-detail.component';

describe('Component Tests', () => {
  describe('AgregadoXChofer Management Detail Component', () => {
    let comp: AgregadoXChoferDetailComponent;
    let fixture: ComponentFixture<AgregadoXChoferDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [AgregadoXChoferDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ agregadoXChofer: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(AgregadoXChoferDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AgregadoXChoferDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load agregadoXChofer on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.agregadoXChofer).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
