import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { AsignacionService } from '../service/asignacion.service';

import { AsignacionComponent } from './asignacion.component';

describe('Component Tests', () => {
  describe('Asignacion Management Component', () => {
    let comp: AsignacionComponent;
    let fixture: ComponentFixture<AsignacionComponent>;
    let service: AsignacionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [AsignacionComponent],
      })
        .overrideTemplate(AsignacionComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AsignacionComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(AsignacionService);

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
      expect(comp.asignacions?.[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
