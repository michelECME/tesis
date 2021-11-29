import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UnidadDeMedida } from 'app/entities/enumerations/unidad-de-medida.model';
import { TipoRecurso } from 'app/entities/enumerations/tipo-recurso.model';
import { IRecurso, Recurso } from '../recurso.model';

import { RecursoService } from './recurso.service';

describe('Service Tests', () => {
  describe('Recurso Service', () => {
    let service: RecursoService;
    let httpMock: HttpTestingController;
    let elemDefault: IRecurso;
    let expectedResult: IRecurso | IRecurso[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(RecursoService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        nombre: 'AAAAAAA',
        um: UnidadDeMedida.LITRO,
        tipo: TipoRecurso.PARTE,
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

      it('should create a Recurso', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new Recurso()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Recurso', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            nombre: 'BBBBBB',
            um: 'BBBBBB',
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

      it('should partial update a Recurso', () => {
        const patchObject = Object.assign(
          {
            nombre: 'BBBBBB',
            tipo: 'BBBBBB',
          },
          new Recurso()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Recurso', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            nombre: 'BBBBBB',
            um: 'BBBBBB',
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

      it('should delete a Recurso', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addRecursoToCollectionIfMissing', () => {
        it('should add a Recurso to an empty array', () => {
          const recurso: IRecurso = { id: 123 };
          expectedResult = service.addRecursoToCollectionIfMissing([], recurso);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(recurso);
        });

        it('should not add a Recurso to an array that contains it', () => {
          const recurso: IRecurso = { id: 123 };
          const recursoCollection: IRecurso[] = [
            {
              ...recurso,
            },
            { id: 456 },
          ];
          expectedResult = service.addRecursoToCollectionIfMissing(recursoCollection, recurso);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a Recurso to an array that doesn't contain it", () => {
          const recurso: IRecurso = { id: 123 };
          const recursoCollection: IRecurso[] = [{ id: 456 }];
          expectedResult = service.addRecursoToCollectionIfMissing(recursoCollection, recurso);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(recurso);
        });

        it('should add only unique Recurso to an array', () => {
          const recursoArray: IRecurso[] = [{ id: 123 }, { id: 456 }, { id: 63477 }];
          const recursoCollection: IRecurso[] = [{ id: 123 }];
          expectedResult = service.addRecursoToCollectionIfMissing(recursoCollection, ...recursoArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const recurso: IRecurso = { id: 123 };
          const recurso2: IRecurso = { id: 456 };
          expectedResult = service.addRecursoToCollectionIfMissing([], recurso, recurso2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(recurso);
          expect(expectedResult).toContain(recurso2);
        });

        it('should accept null and undefined values', () => {
          const recurso: IRecurso = { id: 123 };
          expectedResult = service.addRecursoToCollectionIfMissing([], null, recurso, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(recurso);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
