import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICANTIDADXTIPOUEB, getCANTIDADXTIPOUEBIdentifier } from '../cantidadxtipoueb.model';

export type EntityResponseType = HttpResponse<ICANTIDADXTIPOUEB>;
export type EntityArrayResponseType = HttpResponse<ICANTIDADXTIPOUEB[]>;

@Injectable({ providedIn: 'root' })
export class CANTIDADXTIPOUEBService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/cantidadxtipouebs');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(cANTIDADXTIPOUEB: ICANTIDADXTIPOUEB): Observable<EntityResponseType> {
    return this.http.post<ICANTIDADXTIPOUEB>(this.resourceUrl, cANTIDADXTIPOUEB, { observe: 'response' });
  }

  update(cANTIDADXTIPOUEB: ICANTIDADXTIPOUEB): Observable<EntityResponseType> {
    return this.http.put<ICANTIDADXTIPOUEB>(
      `${this.resourceUrl}/${getCANTIDADXTIPOUEBIdentifier(cANTIDADXTIPOUEB) as number}`,
      cANTIDADXTIPOUEB,
      { observe: 'response' }
    );
  }

  partialUpdate(cANTIDADXTIPOUEB: ICANTIDADXTIPOUEB): Observable<EntityResponseType> {
    return this.http.patch<ICANTIDADXTIPOUEB>(
      `${this.resourceUrl}/${getCANTIDADXTIPOUEBIdentifier(cANTIDADXTIPOUEB) as number}`,
      cANTIDADXTIPOUEB,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICANTIDADXTIPOUEB>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICANTIDADXTIPOUEB[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addCANTIDADXTIPOUEBToCollectionIfMissing(
    cANTIDADXTIPOUEBCollection: ICANTIDADXTIPOUEB[],
    ...cANTIDADXTIPOUEBSToCheck: (ICANTIDADXTIPOUEB | null | undefined)[]
  ): ICANTIDADXTIPOUEB[] {
    const cANTIDADXTIPOUEBS: ICANTIDADXTIPOUEB[] = cANTIDADXTIPOUEBSToCheck.filter(isPresent);
    if (cANTIDADXTIPOUEBS.length > 0) {
      const cANTIDADXTIPOUEBCollectionIdentifiers = cANTIDADXTIPOUEBCollection.map(
        cANTIDADXTIPOUEBItem => getCANTIDADXTIPOUEBIdentifier(cANTIDADXTIPOUEBItem)!
      );
      const cANTIDADXTIPOUEBSToAdd = cANTIDADXTIPOUEBS.filter(cANTIDADXTIPOUEBItem => {
        const cANTIDADXTIPOUEBIdentifier = getCANTIDADXTIPOUEBIdentifier(cANTIDADXTIPOUEBItem);
        if (cANTIDADXTIPOUEBIdentifier == null || cANTIDADXTIPOUEBCollectionIdentifiers.includes(cANTIDADXTIPOUEBIdentifier)) {
          return false;
        }
        cANTIDADXTIPOUEBCollectionIdentifiers.push(cANTIDADXTIPOUEBIdentifier);
        return true;
      });
      return [...cANTIDADXTIPOUEBSToAdd, ...cANTIDADXTIPOUEBCollection];
    }
    return cANTIDADXTIPOUEBCollection;
  }
}
