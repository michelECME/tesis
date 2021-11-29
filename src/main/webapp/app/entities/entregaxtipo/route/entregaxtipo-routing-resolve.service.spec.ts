jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IENTREGAXTIPO, ENTREGAXTIPO } from '../entregaxtipo.model';
import { ENTREGAXTIPOService } from '../service/entregaxtipo.service';

import { ENTREGAXTIPORoutingResolveService } from './entregaxtipo-routing-resolve.service';

describe('Service Tests', () => {
  describe('ENTREGAXTIPO routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: ENTREGAXTIPORoutingResolveService;
    let service: ENTREGAXTIPOService;
    let resultENTREGAXTIPO: IENTREGAXTIPO | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(ENTREGAXTIPORoutingResolveService);
      service = TestBed.inject(ENTREGAXTIPOService);
      resultENTREGAXTIPO = undefined;
    });

    describe('resolve', () => {
      it('should return IENTREGAXTIPO returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultENTREGAXTIPO = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultENTREGAXTIPO).toEqual({ id: 123 });
      });

      it('should return new IENTREGAXTIPO if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultENTREGAXTIPO = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultENTREGAXTIPO).toEqual(new ENTREGAXTIPO());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultENTREGAXTIPO = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultENTREGAXTIPO).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
