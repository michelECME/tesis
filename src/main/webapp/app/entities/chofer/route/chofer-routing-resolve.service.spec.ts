jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IChofer, Chofer } from '../chofer.model';
import { ChoferService } from '../service/chofer.service';

import { ChoferRoutingResolveService } from './chofer-routing-resolve.service';

describe('Service Tests', () => {
  describe('Chofer routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: ChoferRoutingResolveService;
    let service: ChoferService;
    let resultChofer: IChofer | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(ChoferRoutingResolveService);
      service = TestBed.inject(ChoferService);
      resultChofer = undefined;
    });

    describe('resolve', () => {
      it('should return IChofer returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultChofer = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultChofer).toEqual({ id: 123 });
      });

      it('should return new IChofer if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultChofer = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultChofer).toEqual(new Chofer());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultChofer = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultChofer).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
