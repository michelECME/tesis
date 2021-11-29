import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IAgregadoXChofer, AgregadoXChofer } from '../agregado-x-chofer.model';
import { AgregadoXChoferService } from '../service/agregado-x-chofer.service';

@Injectable({ providedIn: 'root' })
export class AgregadoXChoferRoutingResolveService implements Resolve<IAgregadoXChofer> {
  constructor(protected service: AgregadoXChoferService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAgregadoXChofer> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((agregadoXChofer: HttpResponse<AgregadoXChofer>) => {
          if (agregadoXChofer.body) {
            return of(agregadoXChofer.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new AgregadoXChofer());
  }
}
