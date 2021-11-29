import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { AgregadoXChoferComponent } from '../list/agregado-x-chofer.component';
import { AgregadoXChoferDetailComponent } from '../detail/agregado-x-chofer-detail.component';
import { AgregadoXChoferUpdateComponent } from '../update/agregado-x-chofer-update.component';
import { AgregadoXChoferRoutingResolveService } from './agregado-x-chofer-routing-resolve.service';

const agregadoXChoferRoute: Routes = [
  {
    path: '',
    component: AgregadoXChoferComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AgregadoXChoferDetailComponent,
    resolve: {
      agregadoXChofer: AgregadoXChoferRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AgregadoXChoferUpdateComponent,
    resolve: {
      agregadoXChofer: AgregadoXChoferRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AgregadoXChoferUpdateComponent,
    resolve: {
      agregadoXChofer: AgregadoXChoferRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(agregadoXChoferRoute)],
  exports: [RouterModule],
})
export class AgregadoXChoferRoutingModule {}
