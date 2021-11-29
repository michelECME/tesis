import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICOMBUSTIBLEXUEB, getCOMBUSTIBLEXUEBIdentifier } from '../combustiblexueb.model';

export type EntityResponseType = HttpResponse<ICOMBUSTIBLEXUEB>;
export type EntityArrayResponseType = HttpResponse<ICOMBUSTIBLEXUEB[]>;

@Injectable({ providedIn: 'root' })
export class COMBUSTIBLEXUEBService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/combustiblexuebs');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(cOMBUSTIBLEXUEB: ICOMBUSTIBLEXUEB): Observable<EntityResponseType> {
    return this.http.post<ICOMBUSTIBLEXUEB>(this.resourceUrl, cOMBUSTIBLEXUEB, { observe: 'response' });
  }

  update(cOMBUSTIBLEXUEB: ICOMBUSTIBLEXUEB): Observable<EntityResponseType> {
    return this.http.put<ICOMBUSTIBLEXUEB>(
      `${this.resourceUrl}/${getCOMBUSTIBLEXUEBIdentifier(cOMBUSTIBLEXUEB) as number}`,
      cOMBUSTIBLEXUEB,
      { observe: 'response' }
    );
  }

  partialUpdate(cOMBUSTIBLEXUEB: ICOMBUSTIBLEXUEB): Observable<EntityResponseType> {
    return this.http.patch<ICOMBUSTIBLEXUEB>(
      `${this.resourceUrl}/${getCOMBUSTIBLEXUEBIdentifier(cOMBUSTIBLEXUEB) as number}`,
      cOMBUSTIBLEXUEB,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICOMBUSTIBLEXUEB>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICOMBUSTIBLEXUEB[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addCOMBUSTIBLEXUEBToCollectionIfMissing(
    cOMBUSTIBLEXUEBCollection: ICOMBUSTIBLEXUEB[],
    ...cOMBUSTIBLEXUEBSToCheck: (ICOMBUSTIBLEXUEB | null | undefined)[]
  ): ICOMBUSTIBLEXUEB[] {
    const cOMBUSTIBLEXUEBS: ICOMBUSTIBLEXUEB[] = cOMBUSTIBLEXUEBSToCheck.filter(isPresent);
    if (cOMBUSTIBLEXUEBS.length > 0) {
      const cOMBUSTIBLEXUEBCollectionIdentifiers = cOMBUSTIBLEXUEBCollection.map(
        cOMBUSTIBLEXUEBItem => getCOMBUSTIBLEXUEBIdentifier(cOMBUSTIBLEXUEBItem)!
      );
      const cOMBUSTIBLEXUEBSToAdd = cOMBUSTIBLEXUEBS.filter(cOMBUSTIBLEXUEBItem => {
        const cOMBUSTIBLEXUEBIdentifier = getCOMBUSTIBLEXUEBIdentifier(cOMBUSTIBLEXUEBItem);
        if (cOMBUSTIBLEXUEBIdentifier == null || cOMBUSTIBLEXUEBCollectionIdentifiers.includes(cOMBUSTIBLEXUEBIdentifier)) {
          return false;
        }
        cOMBUSTIBLEXUEBCollectionIdentifiers.push(cOMBUSTIBLEXUEBIdentifier);
        return true;
      });
      return [...cOMBUSTIBLEXUEBSToAdd, ...cOMBUSTIBLEXUEBCollection];
    }
    return cOMBUSTIBLEXUEBCollection;
  }
}
