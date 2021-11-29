import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { LUBRICANTEXUEBDetailComponent } from './lubricantexueb-detail.component';

describe('Component Tests', () => {
  describe('LUBRICANTEXUEB Management Detail Component', () => {
    let comp: LUBRICANTEXUEBDetailComponent;
    let fixture: ComponentFixture<LUBRICANTEXUEBDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [LUBRICANTEXUEBDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ lUBRICANTEXUEB: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(LUBRICANTEXUEBDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LUBRICANTEXUEBDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load lUBRICANTEXUEB on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.lUBRICANTEXUEB).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
