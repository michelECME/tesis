import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICantidadXModelo, CantidadXModelo } from '../cantidad-x-modelo.model';
import { CantidadXModeloService } from '../service/cantidad-x-modelo.service';

@Injectable({ providedIn: 'root' })
export class CantidadXModeloRoutingResolveService implements Resolve<ICantidadXModelo> {
  constructor(protected service: CantidadXModeloService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICantidadXModelo> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((cantidadXModelo: HttpResponse<CantidadXModelo>) => {
          if (cantidadXModelo.body) {
            return of(cantidadXModelo.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CantidadXModelo());
  }
}
