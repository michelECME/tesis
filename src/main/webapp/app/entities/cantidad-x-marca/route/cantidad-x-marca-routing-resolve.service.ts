import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICantidadXMarca, CantidadXMarca } from '../cantidad-x-marca.model';
import { CantidadXMarcaService } from '../service/cantidad-x-marca.service';

@Injectable({ providedIn: 'root' })
export class CantidadXMarcaRoutingResolveService implements Resolve<ICantidadXMarca> {
  constructor(protected service: CantidadXMarcaService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICantidadXMarca> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((cantidadXMarca: HttpResponse<CantidadXMarca>) => {
          if (cantidadXMarca.body) {
            return of(cantidadXMarca.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CantidadXMarca());
  }
}
