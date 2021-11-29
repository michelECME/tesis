import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { AgregadoXChoferService } from '../service/agregado-x-chofer.service';

import { AgregadoXChoferComponent } from './agregado-x-chofer.component';

describe('Component Tests', () => {
  describe('AgregadoXChofer Management Component', () => {
    let comp: AgregadoXChoferComponent;
    let fixture: ComponentFixture<AgregadoXChoferComponent>;
    let service: AgregadoXChoferService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [AgregadoXChoferComponent],
      })
        .overrideTemplate(AgregadoXChoferComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AgregadoXChoferComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(AgregadoXChoferService);

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
      expect(comp.agregadoXChofers?.[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
