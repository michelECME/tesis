import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { CantidadXUEBComponent } from './list/cantidad-xueb.component';
import { CantidadXUEBDetailComponent } from './detail/cantidad-xueb-detail.component';
import { CantidadXUEBUpdateComponent } from './update/cantidad-xueb-update.component';
import { CantidadXUEBDeleteDialogComponent } from './delete/cantidad-xueb-delete-dialog.component';
import { CantidadXUEBRoutingModule } from './route/cantidad-xueb-routing.module';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  imports: [SharedModule, CantidadXUEBRoutingModule,NgApexchartsModule],
  declarations: [CantidadXUEBComponent, CantidadXUEBDetailComponent, CantidadXUEBUpdateComponent, CantidadXUEBDeleteDialogComponent],
  entryComponents: [CantidadXUEBDeleteDialogComponent],
})
export class CantidadXUEBModule {}
