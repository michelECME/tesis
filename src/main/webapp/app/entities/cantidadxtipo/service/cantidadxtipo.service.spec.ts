import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICANTIDADXTIPO, CANTIDADXTIPO } from '../cantidadxtipo.model';

import { CANTIDADXTIPOService } from './cantidadxtipo.service';

describe('Service Tests', () => {
  describe('CANTIDADXTIPO Service', () => {
    let service: CANTIDADXTIPOService;
    let httpMock: HttpTestingController;
    let elemDefault: ICANTIDADXTIPO;
    let expectedResult: ICANTIDADXTIPO | ICANTIDADXTIPO[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(CANTIDADXTIPOService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        cantidadTipo: 0,
        tipo: 'AAAAAAA',
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

      it('should create a CANTIDADXTIPO', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new CANTIDADXTIPO()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a CANTIDADXTIPO', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            cantidadTipo: 1,
            tipo: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a CANTIDADXTIPO', () => {
        const patchObject = Object.assign({}, new CANTIDADXTIPO());

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of CANTIDADXTIPO', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            cantidadTipo: 1,
            tipo: 'BBBBBB',
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

      it('should delete a CANTIDADXTIPO', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addCANTIDADXTIPOToCollectionIfMissing', () => {
        it('should add a CANTIDADXTIPO to an empty array', () => {
          const cANTIDADXTIPO: ICANTIDADXTIPO = { id: 123 };
          expectedResult = service.addCANTIDADXTIPOToCollectionIfMissing([], cANTIDADXTIPO);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(cANTIDADXTIPO);
        });

        it('should not add a CANTIDADXTIPO to an array that contains it', () => {
          const cANTIDADXTIPO: ICANTIDADXTIPO = { id: 123 };
          const cANTIDADXTIPOCollection: ICANTIDADXTIPO[] = [
            {
              ...cANTIDADXTIPO,
            },
            { id: 456 },
          ];
          expectedResult = service.addCANTIDADXTIPOToCollectionIfMissing(cANTIDADXTIPOCollection, cANTIDADXTIPO);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a CANTIDADXTIPO to an array that doesn't contain it", () => {
          const cANTIDADXTIPO: ICANTIDADXTIPO = { id: 123 };
          const cANTIDADXTIPOCollection: ICANTIDADXTIPO[] = [{ id: 456 }];
          expectedResult = service.addCANTIDADXTIPOToCollectionIfMissing(cANTIDADXTIPOCollection, cANTIDADXTIPO);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(cANTIDADXTIPO);
        });

        it('should add only unique CANTIDADXTIPO to an array', () => {
          const cANTIDADXTIPOArray: ICANTIDADXTIPO[] = [{ id: 123 }, { id: 456 }, { id: 11464 }];
          const cANTIDADXTIPOCollection: ICANTIDADXTIPO[] = [{ id: 123 }];
          expectedResult = service.addCANTIDADXTIPOToCollectionIfMissing(cANTIDADXTIPOCollection, ...cANTIDADXTIPOArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const cANTIDADXTIPO: ICANTIDADXTIPO = { id: 123 };
          const cANTIDADXTIPO2: ICANTIDADXTIPO = { id: 456 };
          expectedResult = service.addCANTIDADXTIPOToCollectionIfMissing([], cANTIDADXTIPO, cANTIDADXTIPO2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(cANTIDADXTIPO);
          expect(expectedResult).toContain(cANTIDADXTIPO2);
        });

        it('should accept null and undefined values', () => {
          const cANTIDADXTIPO: ICANTIDADXTIPO = { id: 123 };
          expectedResult = service.addCANTIDADXTIPOToCollectionIfMissing([], null, cANTIDADXTIPO, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(cANTIDADXTIPO);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
