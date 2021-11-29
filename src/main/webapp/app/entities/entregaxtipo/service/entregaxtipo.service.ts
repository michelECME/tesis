import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IENTREGAXTIPO, getENTREGAXTIPOIdentifier } from '../entregaxtipo.model';

export type EntityResponseType = HttpResponse<IENTREGAXTIPO>;
export type EntityArrayResponseType = HttpResponse<IENTREGAXTIPO[]>;

@Injectable({ providedIn: 'root' })
export class ENTREGAXTIPOService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/entregaxtipos');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(eNTREGAXTIPO: IENTREGAXTIPO): Observable<EntityResponseType> {
    return this.http.post<IENTREGAXTIPO>(this.resourceUrl, eNTREGAXTIPO, { observe: 'response' });
  }

  update(eNTREGAXTIPO: IENTREGAXTIPO): Observable<EntityResponseType> {
    return this.http.put<IENTREGAXTIPO>(`${this.resourceUrl}/${getENTREGAXTIPOIdentifier(eNTREGAXTIPO) as number}`, eNTREGAXTIPO, {
      observe: 'response',
    });
  }

  partialUpdate(eNTREGAXTIPO: IENTREGAXTIPO): Observable<EntityResponseType> {
    return this.http.patch<IENTREGAXTIPO>(`${this.resourceUrl}/${getENTREGAXTIPOIdentifier(eNTREGAXTIPO) as number}`, eNTREGAXTIPO, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IENTREGAXTIPO>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IENTREGAXTIPO[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addENTREGAXTIPOToCollectionIfMissing(
    eNTREGAXTIPOCollection: IENTREGAXTIPO[],
    ...eNTREGAXTIPOSToCheck: (IENTREGAXTIPO | null | undefined)[]
  ): IENTREGAXTIPO[] {
    const eNTREGAXTIPOS: IENTREGAXTIPO[] = eNTREGAXTIPOSToCheck.filter(isPresent);
    if (eNTREGAXTIPOS.length > 0) {
      const eNTREGAXTIPOCollectionIdentifiers = eNTREGAXTIPOCollection.map(
        eNTREGAXTIPOItem => getENTREGAXTIPOIdentifier(eNTREGAXTIPOItem)!
      );
      const eNTREGAXTIPOSToAdd = eNTREGAXTIPOS.filter(eNTREGAXTIPOItem => {
        const eNTREGAXTIPOIdentifier = getENTREGAXTIPOIdentifier(eNTREGAXTIPOItem);
        if (eNTREGAXTIPOIdentifier == null || eNTREGAXTIPOCollectionIdentifiers.includes(eNTREGAXTIPOIdentifier)) {
          return false;
        }
        eNTREGAXTIPOCollectionIdentifiers.push(eNTREGAXTIPOIdentifier);
        return true;
      });
      return [...eNTREGAXTIPOSToAdd, ...eNTREGAXTIPOCollection];
    }
    return eNTREGAXTIPOCollection;
  }
}
