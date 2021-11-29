import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { CANTIDADXTIPOService } from '../service/cantidadxtipo.service';

import { CANTIDADXTIPOComponent } from './cantidadxtipo.component';

describe('Component Tests', () => {
  describe('CANTIDADXTIPO Management Component', () => {
    let comp: CANTIDADXTIPOComponent;
    let fixture: ComponentFixture<CANTIDADXTIPOComponent>;
    let service: CANTIDADXTIPOService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [CANTIDADXTIPOComponent],
      })
        .overrideTemplate(CANTIDADXTIPOComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CANTIDADXTIPOComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(CANTIDADXTIPOService);

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
      expect(comp.cANTIDADXTIPOS?.[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
