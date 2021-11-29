import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ENTREGAXTIPOComponent } from '../list/entregaxtipo.component';
import { ENTREGAXTIPODetailComponent } from '../detail/entregaxtipo-detail.component';
import { ENTREGAXTIPOUpdateComponent } from '../update/entregaxtipo-update.component';
import { ENTREGAXTIPORoutingResolveService } from './entregaxtipo-routing-resolve.service';

const eNTREGAXTIPORoute: Routes = [
  {
    path: '',
    component: ENTREGAXTIPOComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ENTREGAXTIPODetailComponent,
    resolve: {
      eNTREGAXTIPO: ENTREGAXTIPORoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ENTREGAXTIPOUpdateComponent,
    resolve: {
      eNTREGAXTIPO: ENTREGAXTIPORoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ENTREGAXTIPOUpdateComponent,
    resolve: {
      eNTREGAXTIPO: ENTREGAXTIPORoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(eNTREGAXTIPORoute)],
  exports: [RouterModule],
})
export class ENTREGAXTIPORoutingModule {}
