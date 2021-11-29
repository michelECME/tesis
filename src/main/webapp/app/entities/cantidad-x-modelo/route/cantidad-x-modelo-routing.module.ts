import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CantidadXModeloComponent } from '../list/cantidad-x-modelo.component';
import { CantidadXModeloDetailComponent } from '../detail/cantidad-x-modelo-detail.component';
import { CantidadXModeloUpdateComponent } from '../update/cantidad-x-modelo-update.component';
import { CantidadXModeloRoutingResolveService } from './cantidad-x-modelo-routing-resolve.service';

const cantidadXModeloRoute: Routes = [
  {
    path: '',
    component: CantidadXModeloComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CantidadXModeloDetailComponent,
    resolve: {
      cantidadXModelo: CantidadXModeloRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CantidadXModeloUpdateComponent,
    resolve: {
      cantidadXModelo: CantidadXModeloRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CantidadXModeloUpdateComponent,
    resolve: {
      cantidadXModelo: CantidadXModeloRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(cantidadXModeloRoute)],
  exports: [RouterModule],
})
export class CantidadXModeloRoutingModule {}
