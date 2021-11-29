import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { LUBRICANTEXTIPOService } from '../service/lubricantextipo.service';

import { LUBRICANTEXTIPOComponent } from './lubricantextipo.component';

describe('Component Tests', () => {
  describe('LUBRICANTEXTIPO Management Component', () => {
    let comp: LUBRICANTEXTIPOComponent;
    let fixture: ComponentFixture<LUBRICANTEXTIPOComponent>;
    let service: LUBRICANTEXTIPOService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [LUBRICANTEXTIPOComponent],
      })
        .overrideTemplate(LUBRICANTEXTIPOComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LUBRICANTEXTIPOComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(LUBRICANTEXTIPOService);

      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [{ id: 123 }],
            headers,
          })
        )
      );
    });

    it('Should call load all on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.lUBRICANTEXTIPOS?.[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
