import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICantidadXUEB, getCantidadXUEBIdentifier } from '../cantidad-xueb.model';

export type EntityResponseType = HttpResponse<ICantidadXUEB>;
export type EntityArrayResponseType = HttpResponse<ICantidadXUEB[]>;

@Injectable({ providedIn: 'root' })
export class CantidadXUEBService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/cantidad-xuebs');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(cantidadXUEB: ICantidadXUEB): Observable<EntityResponseType> {
    return this.http.post<ICantidadXUEB>(this.resourceUrl, cantidadXUEB, { observe: 'response' });
  }

  update(cantidadXUEB: ICantidadXUEB): Observable<EntityResponseType> {
    return this.http.put<ICantidadXUEB>(`${this.resourceUrl}/${getCantidadXUEBIdentifier(cantidadXUEB) as number}`, cantidadXUEB, {
      observe: 'response',
    });
  }

  partialUpdate(cantidadXUEB: ICantidadXUEB): Observable<EntityResponseType> {
    return this.http.patch<ICantidadXUEB>(`${this.resourceUrl}/${getCantidadXUEBIdentifier(cantidadXUEB) as number}`, cantidadXUEB, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICantidadXUEB>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICantidadXUEB[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addCantidadXUEBToCollectionIfMissing(
    cantidadXUEBCollection: ICantidadXUEB[],
    ...cantidadXUEBSToCheck: (ICantidadXUEB | null | undefined)[]
  ): ICantidadXUEB[] {
    const cantidadXUEBS: ICantidadXUEB[] = cantidadXUEBSToCheck.filter(isPresent);
    if (cantidadXUEBS.length > 0) {
      const cantidadXUEBCollectionIdentifiers = cantidadXUEBCollection.map(
        cantidadXUEBItem => getCantidadXUEBIdentifier(cantidadXUEBItem)!
      );
      const cantidadXUEBSToAdd = cantidadXUEBS.filter(cantidadXUEBItem => {
        const cantidadXUEBIdentifier = getCantidadXUEBIdentifier(cantidadXUEBItem);
        if (cantidadXUEBIdentifier == null || cantidadXUEBCollectionIdentifiers.includes(cantidadXUEBIdentifier)) {
          return false;
        }
        cantidadXUEBCollectionIdentifiers.push(cantidadXUEBIdentifier);
        return true;
      });
      return [...cantidadXUEBSToAdd, ...cantidadXUEBCollection];
    }
    return cantidadXUEBCollection;
  }
}
