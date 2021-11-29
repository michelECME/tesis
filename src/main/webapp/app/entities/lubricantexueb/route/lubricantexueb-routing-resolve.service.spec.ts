jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ILUBRICANTEXUEB, LUBRICANTEXUEB } from '../lubricantexueb.model';
import { LUBRICANTEXUEBService } from '../service/lubricantexueb.service';

import { LUBRICANTEXUEBRoutingResolveService } from './lubricantexueb-routing-resolve.service';

describe('Service Tests', () => {
  describe('LUBRICANTEXUEB routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: LUBRICANTEXUEBRoutingResolveService;
    let service: LUBRICANTEXUEBService;
    let resultLUBRICANTEXUEB: ILUBRICANTEXUEB | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(LUBRICANTEXUEBRoutingResolveService);
      service = TestBed.inject(LUBRICANTEXUEBService);
      resultLUBRICANTEXUEB = undefined;
    });

    describe('resolve', () => {
      it('should return ILUBRICANTEXUEB returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultLUBRICANTEXUEB = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultLUBRICANTEXUEB).toEqual({ id: 123 });
      });

      it('should return new ILUBRICANTEXUEB if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultLUBRICANTEXUEB = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultLUBRICANTEXUEB).toEqual(new LUBRICANTEXUEB());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultLUBRICANTEXUEB = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultLUBRICANTEXUEB).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
