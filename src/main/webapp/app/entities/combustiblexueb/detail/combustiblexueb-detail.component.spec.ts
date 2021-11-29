import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { COMBUSTIBLEXUEBDetailComponent } from './combustiblexueb-detail.component';

describe('Component Tests', () => {
  describe('COMBUSTIBLEXUEB Management Detail Component', () => {
    let comp: COMBUSTIBLEXUEBDetailComponent;
    let fixture: ComponentFixture<COMBUSTIBLEXUEBDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [COMBUSTIBLEXUEBDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ cOMBUSTIBLEXUEB: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(COMBUSTIBLEXUEBDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(COMBUSTIBLEXUEBDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load cOMBUSTIBLEXUEB on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.cOMBUSTIBLEXUEB).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
