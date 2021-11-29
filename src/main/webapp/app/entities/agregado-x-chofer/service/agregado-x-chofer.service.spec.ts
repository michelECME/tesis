import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IAgregadoXChofer, AgregadoXChofer } from '../agregado-x-chofer.model';

import { AgregadoXChoferService } from './agregado-x-chofer.service';

describe('Service Tests', () => {
  describe('AgregadoXChofer Service', () => {
    let service: AgregadoXChoferService;
    let httpMock: HttpTestingController;
    let elemDefault: IAgregadoXChofer;
    let expectedResult: IAgregadoXChofer | IAgregadoXChofer[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(AgregadoXChoferService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        cantidadChorfer: 0,
        chapa: 'AAAAAAA',
        nombre: 'AAAAAAA',
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

      it('should create a AgregadoXChofer', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new AgregadoXChofer()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a AgregadoXChofer', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            cantidadChorfer: 1,
            chapa: 'BBBBBB',
            nombre: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a AgregadoXChofer', () => {
        const patchObject = Object.assign(
          {
            nombre: 'BBBBBB',
          },
          new AgregadoXChofer()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of AgregadoXChofer', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            cantidadChorfer: 1,
            chapa: 'BBBBBB',
            nombre: 'BBBBBB',
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

      it('should delete a AgregadoXChofer', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addAgregadoXChoferToCollectionIfMissing', () => {
        it('should add a AgregadoXChofer to an empty array', () => {
          const agregadoXChofer: IAgregadoXChofer = { id: 123 };
          expectedResult = service.addAgregadoXChoferToCollectionIfMissing([], agregadoXChofer);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(agregadoXChofer);
        });

        it('should not add a AgregadoXChofer to an array that contains it', () => {
          const agregadoXChofer: IAgregadoXChofer = { id: 123 };
          const agregadoXChoferCollection: IAgregadoXChofer[] = [
            {
              ...agregadoXChofer,
            },
            { id: 456 },
          ];
          expectedResult = service.addAgregadoXChoferToCollectionIfMissing(agregadoXChoferCollection, agregadoXChofer);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a AgregadoXChofer to an array that doesn't contain it", () => {
          const agregadoXChofer: IAgregadoXChofer = { id: 123 };
          const agregadoXChoferCollection: IAgregadoXChofer[] = [{ id: 456 }];
          expectedResult = service.addAgregadoXChoferToCollectionIfMissing(agregadoXChoferCollection, agregadoXChofer);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(agregadoXChofer);
        });

        it('should add only unique AgregadoXChofer to an array', () => {
          const agregadoXChoferArray: IAgregadoXChofer[] = [{ id: 123 }, { id: 456 }, { id: 67283 }];
          const agregadoXChoferCollection: IAgregadoXChofer[] = [{ id: 123 }];
          expectedResult = service.addAgregadoXChoferToCollectionIfMissing(agregadoXChoferCollection, ...agregadoXChoferArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const agregadoXChofer: IAgregadoXChofer = { id: 123 };
          const agregadoXChofer2: IAgregadoXChofer = { id: 456 };
          expectedResult = service.addAgregadoXChoferToCollectionIfMissing([], agregadoXChofer, agregadoXChofer2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(agregadoXChofer);
          expect(expectedResult).toContain(agregadoXChofer2);
        });

        it('should accept null and undefined values', () => {
          const agregadoXChofer: IAgregadoXChofer = { id: 123 };
          expectedResult = service.addAgregadoXChoferToCollectionIfMissing([], null, agregadoXChofer, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(agregadoXChofer);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
