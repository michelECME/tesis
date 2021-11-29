import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IENTREGAXTIPO, ENTREGAXTIPO } from '../entregaxtipo.model';
import { ENTREGAXTIPOService } from '../service/entregaxtipo.service';

@Injectable({ providedIn: 'root' })
export class ENTREGAXTIPORoutingResolveService implements Resolve<IENTREGAXTIPO> {
  constructor(protected service: ENTREGAXTIPOService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IENTREGAXTIPO> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((eNTREGAXTIPO: HttpResponse<ENTREGAXTIPO>) => {
          if (eNTREGAXTIPO.body) {
            return of(eNTREGAXTIPO.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ENTREGAXTIPO());
  }
}
