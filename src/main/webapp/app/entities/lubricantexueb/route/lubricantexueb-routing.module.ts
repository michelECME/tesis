import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { LUBRICANTEXUEBComponent } from '../list/lubricantexueb.component';
import { LUBRICANTEXUEBDetailComponent } from '../detail/lubricantexueb-detail.component';
import { LUBRICANTEXUEBUpdateComponent } from '../update/lubricantexueb-update.component';
import { LUBRICANTEXUEBRoutingResolveService } from './lubricantexueb-routing-resolve.service';

const lUBRICANTEXUEBRoute: Routes = [
  {
    path: '',
    component: LUBRICANTEXUEBComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: LUBRICANTEXUEBDetailComponent,
    resolve: {
      lUBRICANTEXUEB: LUBRICANTEXUEBRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: LUBRICANTEXUEBUpdateComponent,
    resolve: {
      lUBRICANTEXUEB: LUBRICANTEXUEBRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: LUBRICANTEXUEBUpdateComponent,
    resolve: {
      lUBRICANTEXUEB: LUBRICANTEXUEBRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(lUBRICANTEXUEBRoute)],
  exports: [RouterModule],
})
export class LUBRICANTEXUEBRoutingModule {}
