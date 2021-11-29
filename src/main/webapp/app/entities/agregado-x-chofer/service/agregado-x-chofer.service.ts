import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IAgregadoXChofer, getAgregadoXChoferIdentifier } from '../agregado-x-chofer.model';

export type EntityResponseType = HttpResponse<IAgregadoXChofer>;
export type EntityArrayResponseType = HttpResponse<IAgregadoXChofer[]>;

@Injectable({ providedIn: 'root' })
export class AgregadoXChoferService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/agregado-x-chofers');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(agregadoXChofer: IAgregadoXChofer): Observable<EntityResponseType> {
    return this.http.post<IAgregadoXChofer>(this.resourceUrl, agregadoXChofer, { observe: 'response' });
  }

  update(agregadoXChofer: IAgregadoXChofer): Observable<EntityResponseType> {
    return this.http.put<IAgregadoXChofer>(
      `${this.resourceUrl}/${getAgregadoXChoferIdentifier(agregadoXChofer) as number}`,
      agregadoXChofer,
      { observe: 'response' }
    );
  }

  partialUpdate(agregadoXChofer: IAgregadoXChofer): Observable<EntityResponseType> {
    return this.http.patch<IAgregadoXChofer>(
      `${this.resourceUrl}/${getAgregadoXChoferIdentifier(agregadoXChofer) as number}`,
      agregadoXChofer,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAgregadoXChofer>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAgregadoXChofer[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addAgregadoXChoferToCollectionIfMissing(
    agregadoXChoferCollection: IAgregadoXChofer[],
    ...agregadoXChofersToCheck: (IAgregadoXChofer | null | undefined)[]
  ): IAgregadoXChofer[] {
    const agregadoXChofers: IAgregadoXChofer[] = agregadoXChofersToCheck.filter(isPresent);
    if (agregadoXChofers.length > 0) {
      const agregadoXChoferCollectionIdentifiers = agregadoXChoferCollection.map(
        agregadoXChoferItem => getAgregadoXChoferIdentifier(agregadoXChoferItem)!
      );
      const agregadoXChofersToAdd = agregadoXChofers.filter(agregadoXChoferItem => {
        const agregadoXChoferIdentifier = getAgregadoXChoferIdentifier(agregadoXChoferItem);
        if (agregadoXChoferIdentifier == null || agregadoXChoferCollectionIdentifiers.includes(agregadoXChoferIdentifier)) {
          return false;
        }
        agregadoXChoferCollectionIdentifiers.push(agregadoXChoferIdentifier);
        return true;
      });
      return [...agregadoXChofersToAdd, ...agregadoXChoferCollection];
    }
    return agregadoXChoferCollection;
  }
}
