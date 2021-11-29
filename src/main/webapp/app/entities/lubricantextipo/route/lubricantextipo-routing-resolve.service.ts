import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ILUBRICANTEXTIPO, LUBRICANTEXTIPO } from '../lubricantextipo.model';
import { LUBRICANTEXTIPOService } from '../service/lubricantextipo.service';

@Injectable({ providedIn: 'root' })
export class LUBRICANTEXTIPORoutingResolveService implements Resolve<ILUBRICANTEXTIPO> {
  constructor(protected service: LUBRICANTEXTIPOService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ILUBRICANTEXTIPO> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((lUBRICANTEXTIPO: HttpResponse<LUBRICANTEXTIPO>) => {
          if (lUBRICANTEXTIPO.body) {
            return of(lUBRICANTEXTIPO.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new LUBRICANTEXTIPO());
  }
}
