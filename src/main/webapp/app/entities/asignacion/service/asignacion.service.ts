import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IAsignacion, getAsignacionIdentifier } from '../asignacion.model';

export type EntityResponseType = HttpResponse<IAsignacion>;
export type EntityArrayResponseType = HttpResponse<IAsignacion[]>;

@Injectable({ providedIn: 'root' })
export class AsignacionService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/asignacions');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(asignacion: IAsignacion): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(asignacion);
    return this.http
      .post<IAsignacion>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(asignacion: IAsignacion): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(asignacion);
    return this.http
      .put<IAsignacion>(`${this.resourceUrl}/${getAsignacionIdentifier(asignacion) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(asignacion: IAsignacion): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(asignacion);
    return this.http
      .patch<IAsignacion>(`${this.resourceUrl}/${getAsignacionIdentifier(asignacion) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IAsignacion>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAsignacion[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addAsignacionToCollectionIfMissing(
    asignacionCollection: IAsignacion[],
    ...asignacionsToCheck: (IAsignacion | null | undefined)[]
  ): IAsignacion[] {
    const asignacions: IAsignacion[] = asignacionsToCheck.filter(isPresent);
    if (asignacions.length > 0) {
      const asignacionCollectionIdentifiers = asignacionCollection.map(asignacionItem => getAsignacionIdentifier(asignacionItem)!);
      const asignacionsToAdd = asignacions.filter(asignacionItem => {
        const asignacionIdentifier = getAsignacionIdentifier(asignacionItem);
        if (asignacionIdentifier == null || asignacionCollectionIdentifiers.includes(asignacionIdentifier)) {
          return false;
        }
        asignacionCollectionIdentifiers.push(asignacionIdentifier);
        return true;
      });
      return [...asignacionsToAdd, ...asignacionCollection];
    }
    return asignacionCollection;
  }

  protected convertDateFromClient(asignacion: IAsignacion): IAsignacion {
    return Object.assign({}, asignacion, {
      fecha: asignacion.fecha?.isValid() ? asignacion.fecha.toJSON() : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fecha = res.body.fecha ? dayjs(res.body.fecha) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((asignacion: IAsignacion) => {
        asignacion.fecha = asignacion.fecha ? dayjs(asignacion.fecha) : undefined;
      });
    }
    return res;
  }
}
