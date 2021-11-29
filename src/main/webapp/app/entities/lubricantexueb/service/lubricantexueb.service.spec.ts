import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ILUBRICANTEXUEB, LUBRICANTEXUEB } from '../lubricantexueb.model';

import { LUBRICANTEXUEBService } from './lubricantexueb.service';

describe('Service Tests', () => {
  describe('LUBRICANTEXUEB Service', () => {
    let service: LUBRICANTEXUEBService;
    let httpMock: HttpTestingController;
    let elemDefault: ILUBRICANTEXUEB;
    let expectedResult: ILUBRICANTEXUEB | ILUBRICANTEXUEB[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(LUBRICANTEXUEBService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        cantidadLubricanteUEB: 0,
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

      it('should create a LUBRICANTEXUEB', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new LUBRICANTEXUEB()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a LUBRICANTEXUEB', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            cantidadLubricanteUEB: 1,
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

      it('should partial update a LUBRICANTEXUEB', () => {
        const patchObject = Object.assign({}, new LUBRICANTEXUEB());

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of LUBRICANTEXUEB', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            cantidadLubricanteUEB: 1,
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

      it('should delete a LUBRICANTEXUEB', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addLUBRICANTEXUEBToCollectionIfMissing', () => {
        it('should add a LUBRICANTEXUEB to an empty array', () => {
          const lUBRICANTEXUEB: ILUBRICANTEXUEB = { id: 123 };
          expectedResult = service.addLUBRICANTEXUEBToCollectionIfMissing([], lUBRICANTEXUEB);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(lUBRICANTEXUEB);
        });

        it('should not add a LUBRICANTEXUEB to an array that contains it', () => {
          const lUBRICANTEXUEB: ILUBRICANTEXUEB = { id: 123 };
          const lUBRICANTEXUEBCollection: ILUBRICANTEXUEB[] = [
            {
              ...lUBRICANTEXUEB,
            },
            { id: 456 },
          ];
          expectedResult = service.addLUBRICANTEXUEBToCollectionIfMissing(lUBRICANTEXUEBCollection, lUBRICANTEXUEB);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a LUBRICANTEXUEB to an array that doesn't contain it", () => {
          const lUBRICANTEXUEB: ILUBRICANTEXUEB = { id: 123 };
          const lUBRICANTEXUEBCollection: ILUBRICANTEXUEB[] = [{ id: 456 }];
          expectedResult = service.addLUBRICANTEXUEBToCollectionIfMissing(lUBRICANTEXUEBCollection, lUBRICANTEXUEB);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(lUBRICANTEXUEB);
        });

        it('should add only unique LUBRICANTEXUEB to an array', () => {
          const lUBRICANTEXUEBArray: ILUBRICANTEXUEB[] = [{ id: 123 }, { id: 456 }, { id: 58725 }];
          const lUBRICANTEXUEBCollection: ILUBRICANTEXUEB[] = [{ id: 123 }];
          expectedResult = service.addLUBRICANTEXUEBToCollectionIfMissing(lUBRICANTEXUEBCollection, ...lUBRICANTEXUEBArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const lUBRICANTEXUEB: ILUBRICANTEXUEB = { id: 123 };
          const lUBRICANTEXUEB2: ILUBRICANTEXUEB = { id: 456 };
          expectedResult = service.addLUBRICANTEXUEBToCollectionIfMissing([], lUBRICANTEXUEB, lUBRICANTEXUEB2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(lUBRICANTEXUEB);
          expect(expectedResult).toContain(lUBRICANTEXUEB2);
        });

        it('should accept null and undefined values', () => {
          const lUBRICANTEXUEB: ILUBRICANTEXUEB = { id: 123 };
          expectedResult = service.addLUBRICANTEXUEBToCollectionIfMissing([], null, lUBRICANTEXUEB, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(lUBRICANTEXUEB);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
