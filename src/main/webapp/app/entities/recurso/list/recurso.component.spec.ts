import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { RecursoService } from '../service/recurso.service';

import { RecursoComponent } from './recurso.component';

describe('Component Tests', () => {
  describe('Recurso Management Component', () => {
    let comp: RecursoComponent;
    let fixture: ComponentFixture<RecursoComponent>;
    let service: RecursoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [RecursoComponent],
      })
        .overrideTemplate(RecursoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RecursoComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(RecursoService);

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
      expect(comp.recursos?.[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
