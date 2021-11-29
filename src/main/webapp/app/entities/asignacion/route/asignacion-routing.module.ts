import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { AsignacionComponent } from '../list/asignacion.component';
import { AsignacionDetailComponent } from '../detail/asignacion-detail.component';
import { AsignacionUpdateComponent } from '../update/asignacion-update.component';
import { AsignacionRoutingResolveService } from './asignacion-routing-resolve.service';

const asignacionRoute: Routes = [
  {
    path: '',
    component: AsignacionComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AsignacionDetailComponent,
    resolve: {
      asignacion: AsignacionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AsignacionUpdateComponent,
    resolve: {
      asignacion: AsignacionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AsignacionUpdateComponent,
    resolve: {
      asignacion: AsignacionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(asignacionRoute)],
  exports: [RouterModule],
})
export class AsignacionRoutingModule {}
