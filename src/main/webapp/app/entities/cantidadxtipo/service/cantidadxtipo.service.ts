import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICANTIDADXTIPO, getCANTIDADXTIPOIdentifier } from '../cantidadxtipo.model';

export type EntityResponseType = HttpResponse<ICANTIDADXTIPO>;
export type EntityArrayResponseType = HttpResponse<ICANTIDADXTIPO[]>;

@Injectable({ providedIn: 'root' })
export class CANTIDADXTIPOService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/cantidadxtipos');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(cANTIDADXTIPO: ICANTIDADXTIPO): Observable<EntityResponseType> {
    return this.http.post<ICANTIDADXTIPO>(this.resourceUrl, cANTIDADXTIPO, { observe: 'response' });
  }

  update(cANTIDADXTIPO: ICANTIDADXTIPO): Observable<EntityResponseType> {
    return this.http.put<ICANTIDADXTIPO>(`${this.resourceUrl}/${getCANTIDADXTIPOIdentifier(cANTIDADXTIPO) as number}`, cANTIDADXTIPO, {
      observe: 'response',
    });
  }

  partialUpdate(cANTIDADXTIPO: ICANTIDADXTIPO): Observable<EntityResponseType> {
    return this.http.patch<ICANTIDADXTIPO>(`${this.resourceUrl}/${getCANTIDADXTIPOIdentifier(cANTIDADXTIPO) as number}`, cANTIDADXTIPO, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICANTIDADXTIPO>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICANTIDADXTIPO[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addCANTIDADXTIPOToCollectionIfMissing(
    cANTIDADXTIPOCollection: ICANTIDADXTIPO[],
    ...cANTIDADXTIPOSToCheck: (ICANTIDADXTIPO | null | undefined)[]
  ): ICANTIDADXTIPO[] {
    const cANTIDADXTIPOS: ICANTIDADXTIPO[] = cANTIDADXTIPOSToCheck.filter(isPresent);
    if (cANTIDADXTIPOS.length > 0) {
      const cANTIDADXTIPOCollectionIdentifiers = cANTIDADXTIPOCollection.map(
        cANTIDADXTIPOItem => getCANTIDADXTIPOIdentifier(cANTIDADXTIPOItem)!
      );
      const cANTIDADXTIPOSToAdd = cANTIDADXTIPOS.filter(cANTIDADXTIPOItem => {
        const cANTIDADXTIPOIdentifier = getCANTIDADXTIPOIdentifier(cANTIDADXTIPOItem);
        if (cANTIDADXTIPOIdentifier == null || cANTIDADXTIPOCollectionIdentifiers.includes(cANTIDADXTIPOIdentifier)) {
          return false;
        }
        cANTIDADXTIPOCollectionIdentifiers.push(cANTIDADXTIPOIdentifier);
        return true;
      });
      return [...cANTIDADXTIPOSToAdd, ...cANTIDADXTIPOCollection];
    }
    return cANTIDADXTIPOCollection;
  }
}
