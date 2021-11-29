import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CANTIDADXTIPOUEBComponent } from '../list/cantidadxtipoueb.component';
import { CANTIDADXTIPOUEBDetailComponent } from '../detail/cantidadxtipoueb-detail.component';
import { CANTIDADXTIPOUEBUpdateComponent } from '../update/cantidadxtipoueb-update.component';
import { CANTIDADXTIPOUEBRoutingResolveService } from './cantidadxtipoueb-routing-resolve.service';

const cANTIDADXTIPOUEBRoute: Routes = [
  {
    path: '',
    component: CANTIDADXTIPOUEBComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CANTIDADXTIPOUEBDetailComponent,
    resolve: {
      cANTIDADXTIPOUEB: CANTIDADXTIPOUEBRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CANTIDADXTIPOUEBUpdateComponent,
    resolve: {
      cANTIDADXTIPOUEB: CANTIDADXTIPOUEBRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CANTIDADXTIPOUEBUpdateComponent,
    resolve: {
      cANTIDADXTIPOUEB: CANTIDADXTIPOUEBRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(cANTIDADXTIPOUEBRoute)],
  exports: [RouterModule],
})
export class CANTIDADXTIPOUEBRoutingModule {}
