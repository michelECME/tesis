import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { COMBUSTIBLEXUEBComponent } from '../list/combustiblexueb.component';
import { COMBUSTIBLEXUEBDetailComponent } from '../detail/combustiblexueb-detail.component';
import { COMBUSTIBLEXUEBUpdateComponent } from '../update/combustiblexueb-update.component';
import { COMBUSTIBLEXUEBRoutingResolveService } from './combustiblexueb-routing-resolve.service';

const cOMBUSTIBLEXUEBRoute: Routes = [
  {
    path: '',
    component: COMBUSTIBLEXUEBComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: COMBUSTIBLEXUEBDetailComponent,
    resolve: {
      cOMBUSTIBLEXUEB: COMBUSTIBLEXUEBRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: COMBUSTIBLEXUEBUpdateComponent,
    resolve: {
      cOMBUSTIBLEXUEB: COMBUSTIBLEXUEBRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: COMBUSTIBLEXUEBUpdateComponent,
    resolve: {
      cOMBUSTIBLEXUEB: COMBUSTIBLEXUEBRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(cOMBUSTIBLEXUEBRoute)],
  exports: [RouterModule],
})
export class COMBUSTIBLEXUEBRoutingModule {}
