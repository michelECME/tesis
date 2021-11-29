import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IRecurso, Recurso } from '../recurso.model';
import { RecursoService } from '../service/recurso.service';

@Injectable({ providedIn: 'root' })
export class RecursoRoutingResolveService implements Resolve<IRecurso> {
  constructor(protected service: RecursoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRecurso> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((recurso: HttpResponse<Recurso>) => {
          if (recurso.body) {
            return of(recurso.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Recurso());
  }
}
