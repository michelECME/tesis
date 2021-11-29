import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CantidadXUEBComponent } from '../list/cantidad-xueb.component';
import { CantidadXUEBDetailComponent } from '../detail/cantidad-xueb-detail.component';
import { CantidadXUEBUpdateComponent } from '../update/cantidad-xueb-update.component';
import { CantidadXUEBRoutingResolveService } from './cantidad-xueb-routing-resolve.service';

const cantidadXUEBRoute: Routes = [
  {
    path: '',
    component: CantidadXUEBComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CantidadXUEBDetailComponent,
    resolve: {
      cantidadXUEB: CantidadXUEBRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CantidadXUEBUpdateComponent,
    resolve: {
      cantidadXUEB: CantidadXUEBRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CantidadXUEBUpdateComponent,
    resolve: {
      cantidadXUEB: CantidadXUEBRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(cantidadXUEBRoute)],
  exports: [RouterModule],
})
export class CantidadXUEBRoutingModule {}
