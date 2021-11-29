import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IAsignacion, Asignacion } from '../asignacion.model';
import { AsignacionService } from '../service/asignacion.service';

@Injectable({ providedIn: 'root' })
export class AsignacionRoutingResolveService implements Resolve<IAsignacion> {
  constructor(protected service: AsignacionService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAsignacion> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((asignacion: HttpResponse<Asignacion>) => {
          if (asignacion.body) {
            return of(asignacion.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Asignacion());
  }
}
