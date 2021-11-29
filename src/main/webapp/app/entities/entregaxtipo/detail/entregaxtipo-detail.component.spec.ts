import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ENTREGAXTIPODetailComponent } from './entregaxtipo-detail.component';

describe('Component Tests', () => {
  describe('ENTREGAXTIPO Management Detail Component', () => {
    let comp: ENTREGAXTIPODetailComponent;
    let fixture: ComponentFixture<ENTREGAXTIPODetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ENTREGAXTIPODetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ eNTREGAXTIPO: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(ENTREGAXTIPODetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ENTREGAXTIPODetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load eNTREGAXTIPO on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.eNTREGAXTIPO).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
