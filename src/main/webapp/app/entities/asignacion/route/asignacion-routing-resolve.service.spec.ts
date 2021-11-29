jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IAsignacion, Asignacion } from '../asignacion.model';
import { AsignacionService } from '../service/asignacion.service';

import { AsignacionRoutingResolveService } from './asignacion-routing-resolve.service';

describe('Service Tests', () => {
  describe('Asignacion routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: AsignacionRoutingResolveService;
    let service: AsignacionService;
    let resultAsignacion: IAsignacion | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(AsignacionRoutingResolveService);
      service = TestBed.inject(AsignacionService);
      resultAsignacion = undefined;
    });

    describe('resolve', () => {
      it('should return IAsignacion returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultAsignacion = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultAsignacion).toEqual({ id: 123 });
      });

      it('should return new IAsignacion if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultAsignacion = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultAsignacion).toEqual(new Asignacion());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultAsignacion = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultAsignacion).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
