import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { CantidadXUEBService } from '../service/cantidad-xueb.service';

import { CantidadXUEBComponent } from './cantidad-xueb.component';

describe('Component Tests', () => {
  describe('CantidadXUEB Management Component', () => {
    let comp: CantidadXUEBComponent;
    let fixture: ComponentFixture<CantidadXUEBComponent>;
    let service: CantidadXUEBService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [CantidadXUEBComponent],
      })
        .overrideTemplate(CantidadXUEBComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CantidadXUEBComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(CantidadXUEBService);

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
      expect(comp.cantidadXUEBS?.[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
