import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { COMBUSTIBLEXUEBService } from '../service/combustiblexueb.service';

import { COMBUSTIBLEXUEBComponent } from './combustiblexueb.component';

describe('Component Tests', () => {
  describe('COMBUSTIBLEXUEB Management Component', () => {
    let comp: COMBUSTIBLEXUEBComponent;
    let fixture: ComponentFixture<COMBUSTIBLEXUEBComponent>;
    let service: COMBUSTIBLEXUEBService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [COMBUSTIBLEXUEBComponent],
      })
        .overrideTemplate(COMBUSTIBLEXUEBComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(COMBUSTIBLEXUEBComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(COMBUSTIBLEXUEBService);

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
      expect(comp.cOMBUSTIBLEXUEBS?.[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
