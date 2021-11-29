import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CantidadXMarcaComponent } from '../list/cantidad-x-marca.component';
import { CantidadXMarcaDetailComponent } from '../detail/cantidad-x-marca-detail.component';
import { CantidadXMarcaUpdateComponent } from '../update/cantidad-x-marca-update.component';
import { CantidadXMarcaRoutingResolveService } from './cantidad-x-marca-routing-resolve.service';

const cantidadXMarcaRoute: Routes = [
  {
    path: '',
    component: CantidadXMarcaComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CantidadXMarcaDetailComponent,
    resolve: {
      cantidadXMarca: CantidadXMarcaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CantidadXMarcaUpdateComponent,
    resolve: {
      cantidadXMarca: CantidadXMarcaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CantidadXMarcaUpdateComponent,
    resolve: {
      cantidadXMarca: CantidadXMarcaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(cantidadXMarcaRoute)],
  exports: [RouterModule],
})
export class CantidadXMarcaRoutingModule {}
