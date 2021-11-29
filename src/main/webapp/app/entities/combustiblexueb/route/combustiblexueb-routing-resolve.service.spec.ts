jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ICOMBUSTIBLEXUEB, COMBUSTIBLEXUEB } from '../combustiblexueb.model';
import { COMBUSTIBLEXUEBService } from '../service/combustiblexueb.service';

import { COMBUSTIBLEXUEBRoutingResolveService } from './combustiblexueb-routing-resolve.service';

describe('Service Tests', () => {
  describe('COMBUSTIBLEXUEB routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: COMBUSTIBLEXUEBRoutingResolveService;
    let service: COMBUSTIBLEXUEBService;
    let resultCOMBUSTIBLEXUEB: ICOMBUSTIBLEXUEB | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(COMBUSTIBLEXUEBRoutingResolveService);
      service = TestBed.inject(COMBUSTIBLEXUEBService);
      resultCOMBUSTIBLEXUEB = undefined;
    });

    describe('resolve', () => {
      it('should return ICOMBUSTIBLEXUEB returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCOMBUSTIBLEXUEB = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultCOMBUSTIBLEXUEB).toEqual({ id: 123 });
      });

      it('should return new ICOMBUSTIBLEXUEB if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCOMBUSTIBLEXUEB = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultCOMBUSTIBLEXUEB).toEqual(new COMBUSTIBLEXUEB());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCOMBUSTIBLEXUEB = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultCOMBUSTIBLEXUEB).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
