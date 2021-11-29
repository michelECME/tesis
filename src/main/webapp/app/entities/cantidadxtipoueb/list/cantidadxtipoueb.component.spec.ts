import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { CANTIDADXTIPOUEBService } from '../service/cantidadxtipoueb.service';

import { CANTIDADXTIPOUEBComponent } from './cantidadxtipoueb.component';

describe('Component Tests', () => {
  describe('CANTIDADXTIPOUEB Management Component', () => {
    let comp: CANTIDADXTIPOUEBComponent;
    let fixture: ComponentFixture<CANTIDADXTIPOUEBComponent>;
    let service: CANTIDADXTIPOUEBService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [CANTIDADXTIPOUEBComponent],
      })
        .overrideTemplate(CANTIDADXTIPOUEBComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CANTIDADXTIPOUEBComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(CANTIDADXTIPOUEBService);

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
      expect(comp.cANTIDADXTIPOUEBS?.[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
