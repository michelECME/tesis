import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CANTIDADXTIPOUEBDetailComponent } from './cantidadxtipoueb-detail.component';

describe('Component Tests', () => {
  describe('CANTIDADXTIPOUEB Management Detail Component', () => {
    let comp: CANTIDADXTIPOUEBDetailComponent;
    let fixture: ComponentFixture<CANTIDADXTIPOUEBDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [CANTIDADXTIPOUEBDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ cANTIDADXTIPOUEB: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(CANTIDADXTIPOUEBDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CANTIDADXTIPOUEBDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load cANTIDADXTIPOUEB on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.cANTIDADXTIPOUEB).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
