import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { ENTREGAXTIPOService } from '../service/entregaxtipo.service';

import { ENTREGAXTIPOComponent } from './entregaxtipo.component';

describe('Component Tests', () => {
  describe('ENTREGAXTIPO Management Component', () => {
    let comp: ENTREGAXTIPOComponent;
    let fixture: ComponentFixture<ENTREGAXTIPOComponent>;
    let service: ENTREGAXTIPOService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [ENTREGAXTIPOComponent],
      })
        .overrideTemplate(ENTREGAXTIPOComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ENTREGAXTIPOComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(ENTREGAXTIPOService);

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
      expect(comp.eNTREGAXTIPOS?.[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
