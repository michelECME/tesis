import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICantidadXUEB, CantidadXUEB } from '../cantidad-xueb.model';
import { CantidadXUEBService } from '../service/cantidad-xueb.service';

@Injectable({ providedIn: 'root' })
export class CantidadXUEBRoutingResolveService implements Resolve<ICantidadXUEB> {
  constructor(protected service: CantidadXUEBService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICantidadXUEB> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((cantidadXUEB: HttpResponse<CantidadXUEB>) => {
          if (cantidadXUEB.body) {
            return of(cantidadXUEB.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CantidadXUEB());
  }
}
