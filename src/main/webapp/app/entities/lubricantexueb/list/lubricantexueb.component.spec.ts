import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { LUBRICANTEXUEBService } from '../service/lubricantexueb.service';

import { LUBRICANTEXUEBComponent } from './lubricantexueb.component';

describe('Component Tests', () => {
  describe('LUBRICANTEXUEB Management Component', () => {
    let comp: LUBRICANTEXUEBComponent;
    let fixture: ComponentFixture<LUBRICANTEXUEBComponent>;
    let service: LUBRICANTEXUEBService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [LUBRICANTEXUEBComponent],
      })
        .overrideTemplate(LUBRICANTEXUEBComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LUBRICANTEXUEBComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(LUBRICANTEXUEBService);

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
      expect(comp.lUBRICANTEXUEBS?.[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
