import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICantidadXMarca, CantidadXMarca } from '../cantidad-x-marca.model';

import { CantidadXMarcaService } from './cantidad-x-marca.service';

describe('Service Tests', () => {
  describe('CantidadXMarca Service', () => {
    let service: CantidadXMarcaService;
    let httpMock: HttpTestingController;
    let elemDefault: ICantidadXMarca;
    let expectedResult: ICantidadXMarca | ICantidadXMarca[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(CantidadXMarcaService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        cantidadMarca: 0,
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

      it('should create a CantidadXMarca', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new CantidadXMarca()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a CantidadXMarca', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            cantidadMarca: 1,
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

      it('should partial update a CantidadXMarca', () => {
        const patchObject = Object.assign(
          {
            cantidadMarca: 1,
            modelo: 'BBBBBB',
          },
          new CantidadXMarca()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of CantidadXMarca', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            cantidadMarca: 1,
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

      it('should delete a CantidadXMarca', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addCantidadXMarcaToCollectionIfMissing', () => {
        it('should add a CantidadXMarca to an empty array', () => {
          const cantidadXMarca: ICantidadXMarca = { id: 123 };
          expectedResult = service.addCantidadXMarcaToCollectionIfMissing([], cantidadXMarca);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(cantidadXMarca);
        });

        it('should not add a CantidadXMarca to an array that contains it', () => {
          const cantidadXMarca: ICantidadXMarca = { id: 123 };
          const cantidadXMarcaCollection: ICantidadXMarca[] = [
            {
              ...cantidadXMarca,
            },
            { id: 456 },
          ];
          expectedResult = service.addCantidadXMarcaToCollectionIfMissing(cantidadXMarcaCollection, cantidadXMarca);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a CantidadXMarca to an array that doesn't contain it", () => {
          const cantidadXMarca: ICantidadXMarca = { id: 123 };
          const cantidadXMarcaCollection: ICantidadXMarca[] = [{ id: 456 }];
          expectedResult = service.addCantidadXMarcaToCollectionIfMissing(cantidadXMarcaCollection, cantidadXMarca);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(cantidadXMarca);
        });

        it('should add only unique CantidadXMarca to an array', () => {
          const cantidadXMarcaArray: ICantidadXMarca[] = [{ id: 123 }, { id: 456 }, { id: 87314 }];
          const cantidadXMarcaCollection: ICantidadXMarca[] = [{ id: 123 }];
          expectedResult = service.addCantidadXMarcaToCollectionIfMissing(cantidadXMarcaCollection, ...cantidadXMarcaArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const cantidadXMarca: ICantidadXMarca = { id: 123 };
          const cantidadXMarca2: ICantidadXMarca = { id: 456 };
          expectedResult = service.addCantidadXMarcaToCollectionIfMissing([], cantidadXMarca, cantidadXMarca2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(cantidadXMarca);
          expect(expectedResult).toContain(cantidadXMarca2);
        });

        it('should accept null and undefined values', () => {
          const cantidadXMarca: ICantidadXMarca = { id: 123 };
          expectedResult = service.addCantidadXMarcaToCollectionIfMissing([], null, cantidadXMarca, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(cantidadXMarca);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
