import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICANTIDADXTIPO, CANTIDADXTIPO } from '../cantidadxtipo.model';
import { CANTIDADXTIPOService } from '../service/cantidadxtipo.service';

@Injectable({ providedIn: 'root' })
export class CANTIDADXTIPORoutingResolveService implements Resolve<ICANTIDADXTIPO> {
  constructor(protected service: CANTIDADXTIPOService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICANTIDADXTIPO> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((cANTIDADXTIPO: HttpResponse<CANTIDADXTIPO>) => {
          if (cANTIDADXTIPO.body) {
            return of(cANTIDADXTIPO.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CANTIDADXTIPO());
  }
}
