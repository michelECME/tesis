import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ILUBRICANTEXTIPO, LUBRICANTEXTIPO } from '../lubricantextipo.model';

import { LUBRICANTEXTIPOService } from './lubricantextipo.service';

describe('Service Tests', () => {
  describe('LUBRICANTEXTIPO Service', () => {
    let service: LUBRICANTEXTIPOService;
    let httpMock: HttpTestingController;
    let elemDefault: ILUBRICANTEXTIPO;
    let expectedResult: ILUBRICANTEXTIPO | ILUBRICANTEXTIPO[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(LUBRICANTEXTIPOService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        cantidadLubricante: 0,
        lubricante: 'AAAAAAA',
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

      it('should create a LUBRICANTEXTIPO', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new LUBRICANTEXTIPO()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a LUBRICANTEXTIPO', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            cantidadLubricante: 1,
            lubricante: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a LUBRICANTEXTIPO', () => {
        const patchObject = Object.assign({}, new LUBRICANTEXTIPO());

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of LUBRICANTEXTIPO', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            cantidadLubricante: 1,
            lubricante: 'BBBBBB',
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

      it('should delete a LUBRICANTEXTIPO', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addLUBRICANTEXTIPOToCollectionIfMissing', () => {
        it('should add a LUBRICANTEXTIPO to an empty array', () => {
          const lUBRICANTEXTIPO: ILUBRICANTEXTIPO = { id: 123 };
          expectedResult = service.addLUBRICANTEXTIPOToCollectionIfMissing([], lUBRICANTEXTIPO);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(lUBRICANTEXTIPO);
        });

        it('should not add a LUBRICANTEXTIPO to an array that contains it', () => {
          const lUBRICANTEXTIPO: ILUBRICANTEXTIPO = { id: 123 };
          const lUBRICANTEXTIPOCollection: ILUBRICANTEXTIPO[] = [
            {
              ...lUBRICANTEXTIPO,
            },
            { id: 456 },
          ];
          expectedResult = service.addLUBRICANTEXTIPOToCollectionIfMissing(lUBRICANTEXTIPOCollection, lUBRICANTEXTIPO);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a LUBRICANTEXTIPO to an array that doesn't contain it", () => {
          const lUBRICANTEXTIPO: ILUBRICANTEXTIPO = { id: 123 };
          const lUBRICANTEXTIPOCollection: ILUBRICANTEXTIPO[] = [{ id: 456 }];
          expectedResult = service.addLUBRICANTEXTIPOToCollectionIfMissing(lUBRICANTEXTIPOCollection, lUBRICANTEXTIPO);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(lUBRICANTEXTIPO);
        });

        it('should add only unique LUBRICANTEXTIPO to an array', () => {
          const lUBRICANTEXTIPOArray: ILUBRICANTEXTIPO[] = [{ id: 123 }, { id: 456 }, { id: 46042 }];
          const lUBRICANTEXTIPOCollection: ILUBRICANTEXTIPO[] = [{ id: 123 }];
          expectedResult = service.addLUBRICANTEXTIPOToCollectionIfMissing(lUBRICANTEXTIPOCollection, ...lUBRICANTEXTIPOArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const lUBRICANTEXTIPO: ILUBRICANTEXTIPO = { id: 123 };
          const lUBRICANTEXTIPO2: ILUBRICANTEXTIPO = { id: 456 };
          expectedResult = service.addLUBRICANTEXTIPOToCollectionIfMissing([], lUBRICANTEXTIPO, lUBRICANTEXTIPO2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(lUBRICANTEXTIPO);
          expect(expectedResult).toContain(lUBRICANTEXTIPO2);
        });

        it('should accept null and undefined values', () => {
          const lUBRICANTEXTIPO: ILUBRICANTEXTIPO = { id: 123 };
          expectedResult = service.addLUBRICANTEXTIPOToCollectionIfMissing([], null, lUBRICANTEXTIPO, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(lUBRICANTEXTIPO);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
