import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CANTIDADXTIPOComponent } from '../list/cantidadxtipo.component';
import { CANTIDADXTIPODetailComponent } from '../detail/cantidadxtipo-detail.component';
import { CANTIDADXTIPOUpdateComponent } from '../update/cantidadxtipo-update.component';
import { CANTIDADXTIPORoutingResolveService } from './cantidadxtipo-routing-resolve.service';

const cANTIDADXTIPORoute: Routes = [
  {
    path: '',
    component: CANTIDADXTIPOComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CANTIDADXTIPODetailComponent,
    resolve: {
      cANTIDADXTIPO: CANTIDADXTIPORoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CANTIDADXTIPOUpdateComponent,
    resolve: {
      cANTIDADXTIPO: CANTIDADXTIPORoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CANTIDADXTIPOUpdateComponent,
    resolve: {
      cANTIDADXTIPO: CANTIDADXTIPORoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(cANTIDADXTIPORoute)],
  exports: [RouterModule],
})
export class CANTIDADXTIPORoutingModule {}
