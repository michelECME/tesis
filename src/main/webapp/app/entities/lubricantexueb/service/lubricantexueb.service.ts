import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ILUBRICANTEXUEB, getLUBRICANTEXUEBIdentifier } from '../lubricantexueb.model';

export type EntityResponseType = HttpResponse<ILUBRICANTEXUEB>;
export type EntityArrayResponseType = HttpResponse<ILUBRICANTEXUEB[]>;

@Injectable({ providedIn: 'root' })
export class LUBRICANTEXUEBService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/lubricantexuebs');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(lUBRICANTEXUEB: ILUBRICANTEXUEB): Observable<EntityResponseType> {
    return this.http.post<ILUBRICANTEXUEB>(this.resourceUrl, lUBRICANTEXUEB, { observe: 'response' });
  }

  update(lUBRICANTEXUEB: ILUBRICANTEXUEB): Observable<EntityResponseType> {
    return this.http.put<ILUBRICANTEXUEB>(`${this.resourceUrl}/${getLUBRICANTEXUEBIdentifier(lUBRICANTEXUEB) as number}`, lUBRICANTEXUEB, {
      observe: 'response',
    });
  }

  partialUpdate(lUBRICANTEXUEB: ILUBRICANTEXUEB): Observable<EntityResponseType> {
    return this.http.patch<ILUBRICANTEXUEB>(
      `${this.resourceUrl}/${getLUBRICANTEXUEBIdentifier(lUBRICANTEXUEB) as number}`,
      lUBRICANTEXUEB,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ILUBRICANTEXUEB>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILUBRICANTEXUEB[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addLUBRICANTEXUEBToCollectionIfMissing(
    lUBRICANTEXUEBCollection: ILUBRICANTEXUEB[],
    ...lUBRICANTEXUEBSToCheck: (ILUBRICANTEXUEB | null | undefined)[]
  ): ILUBRICANTEXUEB[] {
    const lUBRICANTEXUEBS: ILUBRICANTEXUEB[] = lUBRICANTEXUEBSToCheck.filter(isPresent);
    if (lUBRICANTEXUEBS.length > 0) {
      const lUBRICANTEXUEBCollectionIdentifiers = lUBRICANTEXUEBCollection.map(
        lUBRICANTEXUEBItem => getLUBRICANTEXUEBIdentifier(lUBRICANTEXUEBItem)!
      );
      const lUBRICANTEXUEBSToAdd = lUBRICANTEXUEBS.filter(lUBRICANTEXUEBItem => {
        const lUBRICANTEXUEBIdentifier = getLUBRICANTEXUEBIdentifier(lUBRICANTEXUEBItem);
        if (lUBRICANTEXUEBIdentifier == null || lUBRICANTEXUEBCollectionIdentifiers.includes(lUBRICANTEXUEBIdentifier)) {
          return false;
        }
        lUBRICANTEXUEBCollectionIdentifiers.push(lUBRICANTEXUEBIdentifier);
        return true;
      });
      return [...lUBRICANTEXUEBSToAdd, ...lUBRICANTEXUEBCollection];
    }
    return lUBRICANTEXUEBCollection;
  }
}
