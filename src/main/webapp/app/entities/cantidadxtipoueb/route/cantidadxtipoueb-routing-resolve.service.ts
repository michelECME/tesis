import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICANTIDADXTIPOUEB, CANTIDADXTIPOUEB } from '../cantidadxtipoueb.model';
import { CANTIDADXTIPOUEBService } from '../service/cantidadxtipoueb.service';

@Injectable({ providedIn: 'root' })
export class CANTIDADXTIPOUEBRoutingResolveService implements Resolve<ICANTIDADXTIPOUEB> {
  constructor(protected service: CANTIDADXTIPOUEBService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICANTIDADXTIPOUEB> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((cANTIDADXTIPOUEB: HttpResponse<CANTIDADXTIPOUEB>) => {
          if (cANTIDADXTIPOUEB.body) {
            return of(cANTIDADXTIPOUEB.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CANTIDADXTIPOUEB());
  }
}
