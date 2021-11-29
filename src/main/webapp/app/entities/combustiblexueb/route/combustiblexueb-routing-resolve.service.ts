import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICOMBUSTIBLEXUEB, COMBUSTIBLEXUEB } from '../combustiblexueb.model';
import { COMBUSTIBLEXUEBService } from '../service/combustiblexueb.service';

@Injectable({ providedIn: 'root' })
export class COMBUSTIBLEXUEBRoutingResolveService implements Resolve<ICOMBUSTIBLEXUEB> {
  constructor(protected service: COMBUSTIBLEXUEBService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICOMBUSTIBLEXUEB> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((cOMBUSTIBLEXUEB: HttpResponse<COMBUSTIBLEXUEB>) => {
          if (cOMBUSTIBLEXUEB.body) {
            return of(cOMBUSTIBLEXUEB.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new COMBUSTIBLEXUEB());
  }
}
