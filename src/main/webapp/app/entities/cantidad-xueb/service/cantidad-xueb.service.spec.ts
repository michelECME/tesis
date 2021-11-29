import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICantidadXUEB, CantidadXUEB } from '../cantidad-xueb.model';

import { CantidadXUEBService } from './cantidad-xueb.service';

describe('Service Tests', () => {
  describe('CantidadXUEB Service', () => {
    let service: CantidadXUEBService;
    let httpMock: HttpTestingController;
    let elemDefault: ICantidadXUEB;
    let expectedResult: ICantidadXUEB | ICantidadXUEB[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(CantidadXUEBService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        cantidadModelo: 0,
        ueb: 'AAAAAAA',
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a CantidadXUEB', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new CantidadXUEB()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a CantidadXUEB', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            cantidadModelo: 1,
            ueb: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a CantidadXUEB', () => {
        const patchObject = Object.assign(
          {
            cantidadModelo: 1,
            ueb: 'BBBBBB',
          },
          new CantidadXUEB()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of CantidadXUEB', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            cantidadModelo: 1,
            ueb: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a CantidadXUEB', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addCantidadXUEBToCollectionIfMissing', () => {
        it('should add a CantidadXUEB to an empty array', () => {
          const cantidadXUEB: ICantidadXUEB = { id: 123 };
          expectedResult = service.addCantidadXUEBToCollectionIfMissing([], cantidadXUEB);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(cantidadXUEB);
        });

        it('should not add a CantidadXUEB to an array that contains it', () => {
          const cantidadXUEB: ICantidadXUEB = { id: 123 };
          const cantidadXUEBCollection: ICantidadXUEB[] = [
            {
              ...cantidadXUEB,
            },
            { id: 456 },
          ];
          expectedResult = service.addCantidadXUEBToCollectionIfMissing(cantidadXUEBCollection, cantidadXUEB);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a CantidadXUEB to an array that doesn't contain it", () => {
          const cantidadXUEB: ICantidadXUEB = { id: 123 };
          const cantidadXUEBCollection: ICantidadXUEB[] = [{ id: 456 }];
          expectedResult = service.addCantidadXUEBToCollectionIfMissing(cantidadXUEBCollection, cantidadXUEB);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(cantidadXUEB);
        });

        it('should add only unique CantidadXUEB to an array', () => {
          const cantidadXUEBArray: ICantidadXUEB[] = [{ id: 123 }, { id: 456 }, { id: 57660 }];
          const cantidadXUEBCollection: ICantidadXUEB[] = [{ id: 123 }];
          expectedResult = service.addCantidadXUEBToCollectionIfMissing(cantidadXUEBCollection, ...cantidadXUEBArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const cantidadXUEB: ICantidadXUEB = { id: 123 };
          const cantidadXUEB2: ICantidadXUEB = { id: 456 };
          expectedResult = service.addCantidadXUEBToCollectionIfMissing([], cantidadXUEB, cantidadXUEB2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(cantidadXUEB);
          expect(expectedResult).toContain(cantidadXUEB2);
        });

        it('should accept null and undefined values', () => {
          const cantidadXUEB: ICantidadXUEB = { id: 123 };
          expectedResult = service.addCantidadXUEBToCollectionIfMissing([], null, cantidadXUEB, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(cantidadXUEB);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
