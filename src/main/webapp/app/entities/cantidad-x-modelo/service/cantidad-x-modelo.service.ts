import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICantidadXModelo, getCantidadXModeloIdentifier } from '../cantidad-x-modelo.model';

export type EntityResponseType = HttpResponse<ICantidadXModelo>;
export type EntityArrayResponseType = HttpResponse<ICantidadXModelo[]>;

@Injectable({ providedIn: 'root' })
export class CantidadXModeloService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/cantidad-x-modelos');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(cantidadXModelo: ICantidadXModelo): Observable<EntityResponseType> {
    return this.http.post<ICantidadXModelo>(this.resourceUrl, cantidadXModelo, { observe: 'response' });
  }

  update(cantidadXModelo: ICantidadXModelo): Observable<EntityResponseType> {
    return this.http.put<ICantidadXModelo>(
      `${this.resourceUrl}/${getCantidadXModeloIdentifier(cantidadXModelo) as number}`,
      cantidadXModelo,
      { observe: 'response' }
    );
  }

  partialUpdate(cantidadXModelo: ICantidadXModelo): Observable<EntityResponseType> {
    return this.http.patch<ICantidadXModelo>(
      `${this.resourceUrl}/${getCantidadXModeloIdentifier(cantidadXModelo) as number}`,
      cantidadXModelo,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICantidadXModelo>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICantidadXModelo[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addCantidadXModeloToCollectionIfMissing(
    cantidadXModeloCollection: ICantidadXModelo[],
    ...cantidadXModelosToCheck: (ICantidadXModelo | null | undefined)[]
  ): ICantidadXModelo[] {
    const cantidadXModelos: ICantidadXModelo[] = cantidadXModelosToCheck.filter(isPresent);
    if (cantidadXModelos.length > 0) {
      const cantidadXModeloCollectionIdentifiers = cantidadXModeloCollection.map(
        cantidadXModeloItem => getCantidadXModeloIdentifier(cantidadXModeloItem)!
      );
      const cantidadXModelosToAdd = cantidadXModelos.filter(cantidadXModeloItem => {
        const cantidadXModeloIdentifier = getCantidadXModeloIdentifier(cantidadXModeloItem);
        if (cantidadXModeloIdentifier == null || cantidadXModeloCollectionIdentifiers.includes(cantidadXModeloIdentifier)) {
          return false;
        }
        cantidadXModeloCollectionIdentifiers.push(cantidadXModeloIdentifier);
        return true;
      });
      return [...cantidadXModelosToAdd, ...cantidadXModeloCollection];
    }
    return cantidadXModeloCollection;
  }
}
