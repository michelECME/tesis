import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ILUBRICANTEXTIPO, getLUBRICANTEXTIPOIdentifier } from '../lubricantextipo.model';

export type EntityResponseType = HttpResponse<ILUBRICANTEXTIPO>;
export type EntityArrayResponseType = HttpResponse<ILUBRICANTEXTIPO[]>;

@Injectable({ providedIn: 'root' })
export class LUBRICANTEXTIPOService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/lubricantextipos');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(lUBRICANTEXTIPO: ILUBRICANTEXTIPO): Observable<EntityResponseType> {
    return this.http.post<ILUBRICANTEXTIPO>(this.resourceUrl, lUBRICANTEXTIPO, { observe: 'response' });
  }

  update(lUBRICANTEXTIPO: ILUBRICANTEXTIPO): Observable<EntityResponseType> {
    return this.http.put<ILUBRICANTEXTIPO>(
      `${this.resourceUrl}/${getLUBRICANTEXTIPOIdentifier(lUBRICANTEXTIPO) as number}`,
      lUBRICANTEXTIPO,
      { observe: 'response' }
    );
  }

  partialUpdate(lUBRICANTEXTIPO: ILUBRICANTEXTIPO): Observable<EntityResponseType> {
    return this.http.patch<ILUBRICANTEXTIPO>(
      `${this.resourceUrl}/${getLUBRICANTEXTIPOIdentifier(lUBRICANTEXTIPO) as number}`,
      lUBRICANTEXTIPO,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ILUBRICANTEXTIPO>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILUBRICANTEXTIPO[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addLUBRICANTEXTIPOToCollectionIfMissing(
    lUBRICANTEXTIPOCollection: ILUBRICANTEXTIPO[],
    ...lUBRICANTEXTIPOSToCheck: (ILUBRICANTEXTIPO | null | undefined)[]
  ): ILUBRICANTEXTIPO[] {
    const lUBRICANTEXTIPOS: ILUBRICANTEXTIPO[] = lUBRICANTEXTIPOSToCheck.filter(isPresent);
    if (lUBRICANTEXTIPOS.length > 0) {
      const lUBRICANTEXTIPOCollectionIdentifiers = lUBRICANTEXTIPOCollection.map(
        lUBRICANTEXTIPOItem => getLUBRICANTEXTIPOIdentifier(lUBRICANTEXTIPOItem)!
      );
      const lUBRICANTEXTIPOSToAdd = lUBRICANTEXTIPOS.filter(lUBRICANTEXTIPOItem => {
        const lUBRICANTEXTIPOIdentifier = getLUBRICANTEXTIPOIdentifier(lUBRICANTEXTIPOItem);
        if (lUBRICANTEXTIPOIdentifier == null || lUBRICANTEXTIPOCollectionIdentifiers.includes(lUBRICANTEXTIPOIdentifier)) {
          return false;
        }
        lUBRICANTEXTIPOCollectionIdentifiers.push(lUBRICANTEXTIPOIdentifier);
        return true;
      });
      return [...lUBRICANTEXTIPOSToAdd, ...lUBRICANTEXTIPOCollection];
    }
    return lUBRICANTEXTIPOCollection;
  }
}
