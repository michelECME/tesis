import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CANTIDADXTIPODetailComponent } from './cantidadxtipo-detail.component';

describe('Component Tests', () => {
  describe('CANTIDADXTIPO Management Detail Component', () => {
    let comp: CANTIDADXTIPODetailComponent;
    let fixture: ComponentFixture<CANTIDADXTIPODetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [CANTIDADXTIPODetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ cANTIDADXTIPO: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(CANTIDADXTIPODetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CANTIDADXTIPODetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load cANTIDADXTIPO on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.cANTIDADXTIPO).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
