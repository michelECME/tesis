import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IENTREGAXTIPO, ENTREGAXTIPO } from '../entregaxtipo.model';

import { ENTREGAXTIPOService } from './entregaxtipo.service';

describe('Service Tests', () => {
  describe('ENTREGAXTIPO Service', () => {
    let service: ENTREGAXTIPOService;
    let httpMock: HttpTestingController;
    let elemDefault: IENTREGAXTIPO;
    let expectedResult: IENTREGAXTIPO | IENTREGAXTIPO[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(ENTREGAXTIPOService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        cantidad: 0,
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

      it('should create a ENTREGAXTIPO', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new ENTREGAXTIPO()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a ENTREGAXTIPO', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            cantidad: 1,
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

      it('should partial update a ENTREGAXTIPO', () => {
        const patchObject = Object.assign({}, new ENTREGAXTIPO());

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of ENTREGAXTIPO', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            cantidad: 1,
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

      it('should delete a ENTREGAXTIPO', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addENTREGAXTIPOToCollectionIfMissing', () => {
        it('should add a ENTREGAXTIPO to an empty array', () => {
          const eNTREGAXTIPO: IENTREGAXTIPO = { id: 123 };
          expectedResult = service.addENTREGAXTIPOToCollectionIfMissing([], eNTREGAXTIPO);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(eNTREGAXTIPO);
        });

        it('should not add a ENTREGAXTIPO to an array that contains it', () => {
          const eNTREGAXTIPO: IENTREGAXTIPO = { id: 123 };
          const eNTREGAXTIPOCollection: IENTREGAXTIPO[] = [
            {
              ...eNTREGAXTIPO,
            },
            { id: 456 },
          ];
          expectedResult = service.addENTREGAXTIPOToCollectionIfMissing(eNTREGAXTIPOCollection, eNTREGAXTIPO);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a ENTREGAXTIPO to an array that doesn't contain it", () => {
          const eNTREGAXTIPO: IENTREGAXTIPO = { id: 123 };
          const eNTREGAXTIPOCollection: IENTREGAXTIPO[] = [{ id: 456 }];
          expectedResult = service.addENTREGAXTIPOToCollectionIfMissing(eNTREGAXTIPOCollection, eNTREGAXTIPO);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(eNTREGAXTIPO);
        });

        it('should add only unique ENTREGAXTIPO to an array', () => {
          const eNTREGAXTIPOArray: IENTREGAXTIPO[] = [{ id: 123 }, { id: 456 }, { id: 33968 }];
          const eNTREGAXTIPOCollection: IENTREGAXTIPO[] = [{ id: 123 }];
          expectedResult = service.addENTREGAXTIPOToCollectionIfMissing(eNTREGAXTIPOCollection, ...eNTREGAXTIPOArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const eNTREGAXTIPO: IENTREGAXTIPO = { id: 123 };
          const eNTREGAXTIPO2: IENTREGAXTIPO = { id: 456 };
          expectedResult = service.addENTREGAXTIPOToCollectionIfMissing([], eNTREGAXTIPO, eNTREGAXTIPO2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(eNTREGAXTIPO);
          expect(expectedResult).toContain(eNTREGAXTIPO2);
        });

        it('should accept null and undefined values', () => {
          const eNTREGAXTIPO: IENTREGAXTIPO = { id: 123 };
          expectedResult = service.addENTREGAXTIPOToCollectionIfMissing([], null, eNTREGAXTIPO, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(eNTREGAXTIPO);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
