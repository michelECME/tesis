import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ILUBRICANTEXUEB, LUBRICANTEXUEB } from '../lubricantexueb.model';
import { LUBRICANTEXUEBService } from '../service/lubricantexueb.service';

@Injectable({ providedIn: 'root' })
export class LUBRICANTEXUEBRoutingResolveService implements Resolve<ILUBRICANTEXUEB> {
  constructor(protected service: LUBRICANTEXUEBService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ILUBRICANTEXUEB> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((lUBRICANTEXUEB: HttpResponse<LUBRICANTEXUEB>) => {
          if (lUBRICANTEXUEB.body) {
            return of(lUBRICANTEXUEB.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new LUBRICANTEXUEB());
  }
}
