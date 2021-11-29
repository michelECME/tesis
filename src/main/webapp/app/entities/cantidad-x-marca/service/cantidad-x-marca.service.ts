import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICantidadXMarca, getCantidadXMarcaIdentifier } from '../cantidad-x-marca.model';


export type EntityResponseType = HttpResponse<ICantidadXMarca>;
export type EntityArrayResponseType = HttpResponse<ICantidadXMarca[]>;

@Injectable({ providedIn: 'root' })
export class CantidadXMarcaService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/cantidad-x-marcas');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(cantidadXMarca: ICantidadXMarca): Observable<EntityResponseType> {
    return this.http.post<ICantidadXMarca>(this.resourceUrl, cantidadXMarca, { observe: 'response' });
  }

  update(cantidadXMarca: ICantidadXMarca): Observable<EntityResponseType> {
    return this.http.put<ICantidadXMarca>(`${this.resourceUrl}/${getCantidadXMarcaIdentifier(cantidadXMarca) as number}`, cantidadXMarca, {
      observe: 'response',
    });
  }

  partialUpdate(cantidadXMarca: ICantidadXMarca): Observable<EntityResponseType> {
    return this.http.patch<ICantidadXMarca>(
      `${this.resourceUrl}/${getCantidadXMarcaIdentifier(cantidadXMarca) as number}`,
      cantidadXMarca,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICantidadXMarca>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICantidadXMarca[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addCantidadXMarcaToCollectionIfMissing(
    cantidadXMarcaCollection: ICantidadXMarca[],
    ...cantidadXMarcasToCheck: (ICantidadXMarca | null | undefined)[]
  ): ICantidadXMarca[] {
    const cantidadXMarcas: ICantidadXMarca[] = cantidadXMarcasToCheck.filter(isPresent);
    if (cantidadXMarcas.length > 0) {
      const cantidadXMarcaCollectionIdentifiers = cantidadXMarcaCollection.map(
        cantidadXMarcaItem => getCantidadXMarcaIdentifier(cantidadXMarcaItem)!
      );
      const cantidadXMarcasToAdd = cantidadXMarcas.filter(cantidadXMarcaItem => {
        const cantidadXMarcaIdentifier = getCantidadXMarcaIdentifier(cantidadXMarcaItem);
        if (cantidadXMarcaIdentifier == null || cantidadXMarcaCollectionIdentifiers.includes(cantidadXMarcaIdentifier)) {
          return false;
        }
        cantidadXMarcaCollectionIdentifiers.push(cantidadXMarcaIdentifier);
        return true;
      });
      return [...cantidadXMarcasToAdd, ...cantidadXMarcaCollection];
    }
    return cantidadXMarcaCollection;
  }
}
