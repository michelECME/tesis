import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { LUBRICANTEXTIPOComponent } from '../list/lubricantextipo.component';
import { LUBRICANTEXTIPODetailComponent } from '../detail/lubricantextipo-detail.component';
import { LUBRICANTEXTIPOUpdateComponent } from '../update/lubricantextipo-update.component';
import { LUBRICANTEXTIPORoutingResolveService } from './lubricantextipo-routing-resolve.service';

const lUBRICANTEXTIPORoute: Routes = [
  {
    path: '',
    component: LUBRICANTEXTIPOComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: LUBRICANTEXTIPODetailComponent,
    resolve: {
      lUBRICANTEXTIPO: LUBRICANTEXTIPORoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: LUBRICANTEXTIPOUpdateComponent,
    resolve: {
      lUBRICANTEXTIPO: LUBRICANTEXTIPORoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: LUBRICANTEXTIPOUpdateComponent,
    resolve: {
      lUBRICANTEXTIPO: LUBRICANTEXTIPORoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(lUBRICANTEXTIPORoute)],
  exports: [RouterModule],
})
export class LUBRICANTEXTIPORoutingModule {}
