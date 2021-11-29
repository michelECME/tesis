jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ICANTIDADXTIPOUEB, CANTIDADXTIPOUEB } from '../cantidadxtipoueb.model';
import { CANTIDADXTIPOUEBService } from '../service/cantidadxtipoueb.service';

import { CANTIDADXTIPOUEBRoutingResolveService } from './cantidadxtipoueb-routing-resolve.service';

describe('Service Tests', () => {
  describe('CANTIDADXTIPOUEB routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: CANTIDADXTIPOUEBRoutingResolveService;
    let service: CANTIDADXTIPOUEBService;
    let resultCANTIDADXTIPOUEB: ICANTIDADXTIPOUEB | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(CANTIDADXTIPOUEBRoutingResolveService);
      service = TestBed.inject(CANTIDADXTIPOUEBService);
      resultCANTIDADXTIPOUEB = undefined;
    });

    describe('resolve', () => {
      it('should return ICANTIDADXTIPOUEB returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCANTIDADXTIPOUEB = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultCANTIDADXTIPOUEB).toEqual({ id: 123 });
      });

      it('should return new ICANTIDADXTIPOUEB if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCANTIDADXTIPOUEB = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultCANTIDADXTIPOUEB).toEqual(new CANTIDADXTIPOUEB());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCANTIDADXTIPOUEB = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultCANTIDADXTIPOUEB).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
