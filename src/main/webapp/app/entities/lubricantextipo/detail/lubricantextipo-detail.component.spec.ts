import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { LUBRICANTEXTIPODetailComponent } from './lubricantextipo-detail.component';

describe('Component Tests', () => {
  describe('LUBRICANTEXTIPO Management Detail Component', () => {
    let comp: LUBRICANTEXTIPODetailComponent;
    let fixture: ComponentFixture<LUBRICANTEXTIPODetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [LUBRICANTEXTIPODetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ lUBRICANTEXTIPO: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(LUBRICANTEXTIPODetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LUBRICANTEXTIPODetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load lUBRICANTEXTIPO on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.lUBRICANTEXTIPO).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
