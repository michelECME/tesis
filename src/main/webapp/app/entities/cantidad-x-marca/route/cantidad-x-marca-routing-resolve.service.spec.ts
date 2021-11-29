jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ICantidadXMarca, CantidadXMarca } from '../cantidad-x-marca.model';
import { CantidadXMarcaService } from '../service/cantidad-x-marca.service';

import { CantidadXMarcaRoutingResolveService } from './cantidad-x-marca-routing-resolve.service';

describe('Service Tests', () => {
  describe('CantidadXMarca routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: CantidadXMarcaRoutingResolveService;
    let service: CantidadXMarcaService;
    let resultCantidadXMarca: ICantidadXMarca | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(CantidadXMarcaRoutingResolveService);
      service = TestBed.inject(CantidadXMarcaService);
      resultCantidadXMarca = undefined;
    });

    describe('resolve', () => {
      it('should return ICantidadXMarca returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCantidadXMarca = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultCantidadXMarca).toEqual({ id: 123 });
      });

      it('should return new ICantidadXMarca if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCantidadXMarca = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultCantidadXMarca).toEqual(new CantidadXMarca());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCantidadXMarca = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultCantidadXMarca).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
