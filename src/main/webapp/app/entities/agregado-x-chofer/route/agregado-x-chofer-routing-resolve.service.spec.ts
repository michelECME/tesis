jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IAgregadoXChofer, AgregadoXChofer } from '../agregado-x-chofer.model';
import { AgregadoXChoferService } from '../service/agregado-x-chofer.service';

import { AgregadoXChoferRoutingResolveService } from './agregado-x-chofer-routing-resolve.service';

describe('Service Tests', () => {
  describe('AgregadoXChofer routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: AgregadoXChoferRoutingResolveService;
    let service: AgregadoXChoferService;
    let resultAgregadoXChofer: IAgregadoXChofer | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(AgregadoXChoferRoutingResolveService);
      service = TestBed.inject(AgregadoXChoferService);
      resultAgregadoXChofer = undefined;
    });

    describe('resolve', () => {
      it('should return IAgregadoXChofer returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultAgregadoXChofer = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultAgregadoXChofer).toEqual({ id: 123 });
      });

      it('should return new IAgregadoXChofer if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultAgregadoXChofer = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultAgregadoXChofer).toEqual(new AgregadoXChofer());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultAgregadoXChofer = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultAgregadoXChofer).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
