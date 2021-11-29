jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ICantidadXModelo, CantidadXModelo } from '../cantidad-x-modelo.model';
import { CantidadXModeloService } from '../service/cantidad-x-modelo.service';

import { CantidadXModeloRoutingResolveService } from './cantidad-x-modelo-routing-resolve.service';

describe('Service Tests', () => {
  describe('CantidadXModelo routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: CantidadXModeloRoutingResolveService;
    let service: CantidadXModeloService;
    let resultCantidadXModelo: ICantidadXModelo | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(CantidadXModeloRoutingResolveService);
      service = TestBed.inject(CantidadXModeloService);
      resultCantidadXModelo = undefined;
    });

    describe('resolve', () => {
      it('should return ICantidadXModelo returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCantidadXModelo = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultCantidadXModelo).toEqual({ id: 123 });
      });

      it('should return new ICantidadXModelo if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCantidadXModelo = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultCantidadXModelo).toEqual(new CantidadXModelo());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCantidadXModelo = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultCantidadXModelo).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
