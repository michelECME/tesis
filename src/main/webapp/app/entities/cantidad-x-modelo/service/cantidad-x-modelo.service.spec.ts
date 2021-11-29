import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICantidadXModelo, CantidadXModelo } from '../cantidad-x-modelo.model';

import { CantidadXModeloService } from './cantidad-x-modelo.service';

describe('Service Tests', () => {
  describe('CantidadXModelo Service', () => {
    let service: CantidadXModeloService;
    let httpMock: HttpTestingController;
    let elemDefault: ICantidadXModelo;
    let expectedResult: ICantidadXModelo | ICantidadXModelo[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(CantidadXModeloService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        cantidadModelo: 0,
        modelo: 'AAAAAAA',
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

      it('should create a CantidadXModelo', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new CantidadXModelo()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a CantidadXModelo', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            cantidadModelo: 1,
            modelo: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a CantidadXModelo', () => {
        const patchObject = Object.assign({}, new CantidadXModelo());

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of CantidadXModelo', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            cantidadModelo: 1,
            modelo: 'BBBBBB',
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

      it('should delete a CantidadXModelo', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addCantidadXModeloToCollectionIfMissing', () => {
        it('should add a CantidadXModelo to an empty array', () => {
          const cantidadXModelo: ICantidadXModelo = { id: 123 };
          expectedResult = service.addCantidadXModeloToCollectionIfMissing([], cantidadXModelo);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(cantidadXModelo);
        });

        it('should not add a CantidadXModelo to an array that contains it', () => {
          const cantidadXModelo: ICantidadXModelo = { id: 123 };
          const cantidadXModeloCollection: ICantidadXModelo[] = [
            {
              ...cantidadXModelo,
            },
            { id: 456 },
          ];
          expectedResult = service.addCantidadXModeloToCollectionIfMissing(cantidadXModeloCollection, cantidadXModelo);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a CantidadXModelo to an array that doesn't contain it", () => {
          const cantidadXModelo: ICantidadXModelo = { id: 123 };
          const cantidadXModeloCollection: ICantidadXModelo[] = [{ id: 456 }];
          expectedResult = service.addCantidadXModeloToCollectionIfMissing(cantidadXModeloCollection, cantidadXModelo);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(cantidadXModelo);
        });

        it('should add only unique CantidadXModelo to an array', () => {
          const cantidadXModeloArray: ICantidadXModelo[] = [{ id: 123 }, { id: 456 }, { id: 42252 }];
          const cantidadXModeloCollection: ICantidadXModelo[] = [{ id: 123 }];
          expectedResult = service.addCantidadXModeloToCollectionIfMissing(cantidadXModeloCollection, ...cantidadXModeloArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const cantidadXModelo: ICantidadXModelo = { id: 123 };
          const cantidadXModelo2: ICantidadXModelo = { id: 456 };
          expectedResult = service.addCantidadXModeloToCollectionIfMissing([], cantidadXModelo, cantidadXModelo2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(cantidadXModelo);
          expect(expectedResult).toContain(cantidadXModelo2);
        });

        it('should accept null and undefined values', () => {
          const cantidadXModelo: ICantidadXModelo = { id: 123 };
          expectedResult = service.addCantidadXModeloToCollectionIfMissing([], null, cantidadXModelo, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(cantidadXModelo);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
