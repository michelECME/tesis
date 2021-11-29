import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as dayjs from 'dayjs';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IAsignacion, Asignacion } from '../asignacion.model';

import { AsignacionService } from './asignacion.service';

describe('Service Tests', () => {
  describe('Asignacion Service', () => {
    let service: AsignacionService;
    let httpMock: HttpTestingController;
    let elemDefault: IAsignacion;
    let expectedResult: IAsignacion | IAsignacion[] | boolean | null;
    let currentDate: dayjs.Dayjs;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(AsignacionService);
      httpMock = TestBed.inject(HttpTestingController);
      currentDate = dayjs();

      elemDefault = {
        id: 0,
        fecha: currentDate,
        cantidad: 0,
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            fecha: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Asignacion', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            fecha: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fecha: currentDate,
          },
          returnedFromService
        );

        service.create(new Asignacion()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Asignacion', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            fecha: currentDate.format(DATE_TIME_FORMAT),
            cantidad: 1,
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fecha: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a Asignacion', () => {
        const patchObject = Object.assign(
          {
            cantidad: 1,
          },
          new Asignacion()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign(
          {
            fecha: currentDate,
          },
          returnedFromService
        );

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Asignacion', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            fecha: currentDate.format(DATE_TIME_FORMAT),
            cantidad: 1,
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fecha: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Asignacion', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addAsignacionToCollectionIfMissing', () => {
        it('should add a Asignacion to an empty array', () => {
          const asignacion: IAsignacion = { id: 123 };
          expectedResult = service.addAsignacionToCollectionIfMissing([], asignacion);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(asignacion);
        });

        it('should not add a Asignacion to an array that contains it', () => {
          const asignacion: IAsignacion = { id: 123 };
          const asignacionCollection: IAsignacion[] = [
            {
              ...asignacion,
            },
            { id: 456 },
          ];
          expectedResult = service.addAsignacionToCollectionIfMissing(asignacionCollection, asignacion);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a Asignacion to an array that doesn't contain it", () => {
          const asignacion: IAsignacion = { id: 123 };
          const asignacionCollection: IAsignacion[] = [{ id: 456 }];
          expectedResult = service.addAsignacionToCollectionIfMissing(asignacionCollection, asignacion);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(asignacion);
        });

        it('should add only unique Asignacion to an array', () => {
          const asignacionArray: IAsignacion[] = [{ id: 123 }, { id: 456 }, { id: 17649 }];
          const asignacionCollection: IAsignacion[] = [{ id: 123 }];
          expectedResult = service.addAsignacionToCollectionIfMissing(asignacionCollection, ...asignacionArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const asignacion: IAsignacion = { id: 123 };
          const asignacion2: IAsignacion = { id: 456 };
          expectedResult = service.addAsignacionToCollectionIfMissing([], asignacion, asignacion2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(asignacion);
          expect(expectedResult).toContain(asignacion2);
        });

        it('should accept null and undefined values', () => {
          const asignacion: IAsignacion = { id: 123 };
          expectedResult = service.addAsignacionToCollectionIfMissing([], null, asignacion, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(asignacion);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
