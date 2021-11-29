jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ILUBRICANTEXTIPO, LUBRICANTEXTIPO } from '../lubricantextipo.model';
import { LUBRICANTEXTIPOService } from '../service/lubricantextipo.service';

import { LUBRICANTEXTIPORoutingResolveService } from './lubricantextipo-routing-resolve.service';

describe('Service Tests', () => {
  describe('LUBRICANTEXTIPO routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: LUBRICANTEXTIPORoutingResolveService;
    let service: LUBRICANTEXTIPOService;
    let resultLUBRICANTEXTIPO: ILUBRICANTEXTIPO | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(LUBRICANTEXTIPORoutingResolveService);
      service = TestBed.inject(LUBRICANTEXTIPOService);
      resultLUBRICANTEXTIPO = undefined;
    });

    describe('resolve', () => {
      it('should return ILUBRICANTEXTIPO returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultLUBRICANTEXTIPO = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultLUBRICANTEXTIPO).toEqual({ id: 123 });
      });

      it('should return new ILUBRICANTEXTIPO if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultLUBRICANTEXTIPO = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultLUBRICANTEXTIPO).toEqual(new LUBRICANTEXTIPO());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultLUBRICANTEXTIPO = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultLUBRICANTEXTIPO).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
