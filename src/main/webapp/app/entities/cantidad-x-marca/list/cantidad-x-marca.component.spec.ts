import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { CantidadXMarcaService } from '../service/cantidad-x-marca.service';

import { CantidadXMarcaComponent } from './cantidad-x-marca.component';

describe('Component Tests', () => {
  describe('CantidadXMarca Management Component', () => {
    let comp: CantidadXMarcaComponent;
    let fixture: ComponentFixture<CantidadXMarcaComponent>;
    let service: CantidadXMarcaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [CantidadXMarcaComponent],
      })
        .overrideTemplate(CantidadXMarcaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CantidadXMarcaComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(CantidadXMarcaService);

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
      expect(comp.cantidadXMarcas?.[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
