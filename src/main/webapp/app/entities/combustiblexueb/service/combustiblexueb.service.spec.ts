import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICOMBUSTIBLEXUEB, COMBUSTIBLEXUEB } from '../combustiblexueb.model';

import { COMBUSTIBLEXUEBService } from './combustiblexueb.service';

describe('Service Tests', () => {
  describe('COMBUSTIBLEXUEB Service', () => {
    let service: COMBUSTIBLEXUEBService;
    let httpMock: HttpTestingController;
    let elemDefault: ICOMBUSTIBLEXUEB;
    let expectedResult: ICOMBUSTIBLEXUEB | ICOMBUSTIBLEXUEB[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(COMBUSTIBLEXUEBService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        cantidadCombustibleUEB: 0,
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

      it('should create a COMBUSTIBLEXUEB', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new COMBUSTIBLEXUEB()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a COMBUSTIBLEXUEB', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            cantidadCombustibleUEB: 1,
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

      it('should partial update a COMBUSTIBLEXUEB', () => {
        const patchObject = Object.assign(
          {
            ueb: 'BBBBBB',
          },
          new COMBUSTIBLEXUEB()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of COMBUSTIBLEXUEB', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            cantidadCombustibleUEB: 1,
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

      it('should delete a COMBUSTIBLEXUEB', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addCOMBUSTIBLEXUEBToCollectionIfMissing', () => {
        it('should add a COMBUSTIBLEXUEB to an empty array', () => {
          const cOMBUSTIBLEXUEB: ICOMBUSTIBLEXUEB = { id: 123 };
          expectedResult = service.addCOMBUSTIBLEXUEBToCollectionIfMissing([], cOMBUSTIBLEXUEB);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(cOMBUSTIBLEXUEB);
        });

        it('should not add a COMBUSTIBLEXUEB to an array that contains it', () => {
          const cOMBUSTIBLEXUEB: ICOMBUSTIBLEXUEB = { id: 123 };
          const cOMBUSTIBLEXUEBCollection: ICOMBUSTIBLEXUEB[] = [
            {
              ...cOMBUSTIBLEXUEB,
            },
            { id: 456 },
          ];
          expectedResult = service.addCOMBUSTIBLEXUEBToCollectionIfMissing(cOMBUSTIBLEXUEBCollection, cOMBUSTIBLEXUEB);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a COMBUSTIBLEXUEB to an array that doesn't contain it", () => {
          const cOMBUSTIBLEXUEB: ICOMBUSTIBLEXUEB = { id: 123 };
          const cOMBUSTIBLEXUEBCollection: ICOMBUSTIBLEXUEB[] = [{ id: 456 }];
          expectedResult = service.addCOMBUSTIBLEXUEBToCollectionIfMissing(cOMBUSTIBLEXUEBCollection, cOMBUSTIBLEXUEB);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(cOMBUSTIBLEXUEB);
        });

        it('should add only unique COMBUSTIBLEXUEB to an array', () => {
          const cOMBUSTIBLEXUEBArray: ICOMBUSTIBLEXUEB[] = [{ id: 123 }, { id: 456 }, { id: 48650 }];
          const cOMBUSTIBLEXUEBCollection: ICOMBUSTIBLEXUEB[] = [{ id: 123 }];
          expectedResult = service.addCOMBUSTIBLEXUEBToCollectionIfMissing(cOMBUSTIBLEXUEBCollection, ...cOMBUSTIBLEXUEBArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const cOMBUSTIBLEXUEB: ICOMBUSTIBLEXUEB = { id: 123 };
          const cOMBUSTIBLEXUEB2: ICOMBUSTIBLEXUEB = { id: 456 };
          expectedResult = service.addCOMBUSTIBLEXUEBToCollectionIfMissing([], cOMBUSTIBLEXUEB, cOMBUSTIBLEXUEB2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(cOMBUSTIBLEXUEB);
          expect(expectedResult).toContain(cOMBUSTIBLEXUEB2);
        });

        it('should accept null and undefined values', () => {
          const cOMBUSTIBLEXUEB: ICOMBUSTIBLEXUEB = { id: 123 };
          expectedResult = service.addCOMBUSTIBLEXUEBToCollectionIfMissing([], null, cOMBUSTIBLEXUEB, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(cOMBUSTIBLEXUEB);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
