import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { CantidadXModeloService } from '../service/cantidad-x-modelo.service';

import { CantidadXModeloComponent } from './cantidad-x-modelo.component';

describe('Component Tests', () => {
  describe('CantidadXModelo Management Component', () => {
    let comp: CantidadXModeloComponent;
    let fixture: ComponentFixture<CantidadXModeloComponent>;
    let service: CantidadXModeloService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [CantidadXModeloComponent],
      })
        .overrideTemplate(CantidadXModeloComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CantidadXModeloComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(CantidadXModeloService);

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
      expect(comp.cantidadXModelos?.[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
