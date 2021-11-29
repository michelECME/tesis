import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IRecurso, getRecursoIdentifier } from '../recurso.model';

export type EntityResponseType = HttpResponse<IRecurso>;
export type EntityArrayResponseType = HttpResponse<IRecurso[]>;

@Injectable({ providedIn: 'root' })
export class RecursoService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/recursos');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(recurso: IRecurso): Observable<EntityResponseType> {
    return this.http.post<IRecurso>(this.resourceUrl, recurso, { observe: 'response' });
  }

  update(recurso: IRecurso): Observable<EntityResponseType> {
    return this.http.put<IRecurso>(`${this.resourceUrl}/${getRecursoIdentifier(recurso) as number}`, recurso, { observe: 'response' });
  }

  partialUpdate(recurso: IRecurso): Observable<EntityResponseType> {
    return this.http.patch<IRecurso>(`${this.resourceUrl}/${getRecursoIdentifier(recurso) as number}`, recurso, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRecurso>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRecurso[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addRecursoToCollectionIfMissing(recursoCollection: IRecurso[], ...recursosToCheck: (IRecurso | null | undefined)[]): IRecurso[] {
    const recursos: IRecurso[] = recursosToCheck.filter(isPresent);
    if (recursos.length > 0) {
      const recursoCollectionIdentifiers = recursoCollection.map(recursoItem => getRecursoIdentifier(recursoItem)!);
      const recursosToAdd = recursos.filter(recursoItem => {
        const recursoIdentifier = getRecursoIdentifier(recursoItem);
        if (recursoIdentifier == null || recursoCollectionIdentifiers.includes(recursoIdentifier)) {
          return false;
        }
        recursoCollectionIdentifiers.push(recursoIdentifier);
        return true;
      });
      return [...recursosToAdd, ...recursoCollection];
    }
    return recursoCollection;
  }
}
