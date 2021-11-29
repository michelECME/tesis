import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICANTIDADXTIPOUEB, CANTIDADXTIPOUEB } from '../cantidadxtipoueb.model';

import { CANTIDADXTIPOUEBService } from './cantidadxtipoueb.service';

describe('Service Tests', () => {
  describe('CANTIDADXTIPOUEB Service', () => {
    let service: CANTIDADXTIPOUEBService;
    let httpMock: HttpTestingController;
    let elemDefault: ICANTIDADXTIPOUEB;
    let expectedResult: ICANTIDADXTIPOUEB | ICANTIDADXTIPOUEB[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(CANTIDADXTIPOUEBService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        cantidadTipoUEB: 0,
        tipoCarro: 'AAAAAAA',
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

      it('should create a CANTIDADXTIPOUEB', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new CANTIDADXTIPOUEB()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a CANTIDADXTIPOUEB', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            cantidadTipoUEB: 1,
            tipoCarro: 'BBBBBB',
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

      it('should partial update a CANTIDADXTIPOUEB', () => {
        const patchObject = Object.assign(
          {
            cantidadTipoUEB: 1,
            tipoCarro: 'BBBBBB',
            ueb: 'BBBBBB',
          },
          new CANTIDADXTIPOUEB()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of CANTIDADXTIPOUEB', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            cantidadTipoUEB: 1,
            tipoCarro: 'BBBBBB',
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

      it('should delete a CANTIDADXTIPOUEB', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addCANTIDADXTIPOUEBToCollectionIfMissing', () => {
        it('should add a CANTIDADXTIPOUEB to an empty array', () => {
          const cANTIDADXTIPOUEB: ICANTIDADXTIPOUEB = { id: 123 };
          expectedResult = service.addCANTIDADXTIPOUEBToCollectionIfMissing([], cANTIDADXTIPOUEB);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(cANTIDADXTIPOUEB);
        });

        it('should not add a CANTIDADXTIPOUEB to an array that contains it', () => {
          const cANTIDADXTIPOUEB: ICANTIDADXTIPOUEB = { id: 123 };
          const cANTIDADXTIPOUEBCollection: ICANTIDADXTIPOUEB[] = [
            {
              ...cANTIDADXTIPOUEB,
            },
            { id: 456 },
          ];
          expectedResult = service.addCANTIDADXTIPOUEBToCollectionIfMissing(cANTIDADXTIPOUEBCollection, cANTIDADXTIPOUEB);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a CANTIDADXTIPOUEB to an array that doesn't contain it", () => {
          const cANTIDADXTIPOUEB: ICANTIDADXTIPOUEB = { id: 123 };
          const cANTIDADXTIPOUEBCollection: ICANTIDADXTIPOUEB[] = [{ id: 456 }];
          expectedResult = service.addCANTIDADXTIPOUEBToCollectionIfMissing(cANTIDADXTIPOUEBCollection, cANTIDADXTIPOUEB);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(cANTIDADXTIPOUEB);
        });

        it('should add only unique CANTIDADXTIPOUEB to an array', () => {
          const cANTIDADXTIPOUEBArray: ICANTIDADXTIPOUEB[] = [{ id: 123 }, { id: 456 }, { id: 38952 }];
          const cANTIDADXTIPOUEBCollection: ICANTIDADXTIPOUEB[] = [{ id: 123 }];
          expectedResult = service.addCANTIDADXTIPOUEBToCollectionIfMissing(cANTIDADXTIPOUEBCollection, ...cANTIDADXTIPOUEBArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const cANTIDADXTIPOUEB: ICANTIDADXTIPOUEB = { id: 123 };
          const cANTIDADXTIPOUEB2: ICANTIDADXTIPOUEB = { id: 456 };
          expectedResult = service.addCANTIDADXTIPOUEBToCollectionIfMissing([], cANTIDADXTIPOUEB, cANTIDADXTIPOUEB2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(cANTIDADXTIPOUEB);
          expect(expectedResult).toContain(cANTIDADXTIPOUEB2);
        });

        it('should accept null and undefined values', () => {
          const cANTIDADXTIPOUEB: ICANTIDADXTIPOUEB = { id: 123 };
          expectedResult = service.addCANTIDADXTIPOUEBToCollectionIfMissing([], null, cANTIDADXTIPOUEB, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(cANTIDADXTIPOUEB);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
