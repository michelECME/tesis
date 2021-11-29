jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ICantidadXUEB, CantidadXUEB } from '../cantidad-xueb.model';
import { CantidadXUEBService } from '../service/cantidad-xueb.service';

import { CantidadXUEBRoutingResolveService } from './cantidad-xueb-routing-resolve.service';

describe('Service Tests', () => {
  describe('CantidadXUEB routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: CantidadXUEBRoutingResolveService;
    let service: CantidadXUEBService;
    let resultCantidadXUEB: ICantidadXUEB | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(CantidadXUEBRoutingResolveService);
      service = TestBed.inject(CantidadXUEBService);
      resultCantidadXUEB = undefined;
    });

    describe('resolve', () => {
      it('should return ICantidadXUEB returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCantidadXUEB = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultCantidadXUEB).toEqual({ id: 123 });
      });

      it('should return new ICantidadXUEB if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCantidadXUEB = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultCantidadXUEB).toEqual(new CantidadXUEB());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCantidadXUEB = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultCantidadXUEB).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
