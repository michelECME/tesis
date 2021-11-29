import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { CantidadXModeloComponent } from './list/cantidad-x-modelo.component';
import { CantidadXModeloDetailComponent } from './detail/cantidad-x-modelo-detail.component';
import { CantidadXModeloUpdateComponent } from './update/cantidad-x-modelo-update.component';
import { CantidadXModeloDeleteDialogComponent } from './delete/cantidad-x-modelo-delete-dialog.component';
import { CantidadXModeloRoutingModule } from './route/cantidad-x-modelo-routing.module';
import { NgApexchartsModule } from 'ng-apexcharts';


@NgModule({
  imports: [SharedModule, CantidadXModeloRoutingModule,NgApexchartsModule],
  declarations: [
    CantidadXModeloComponent,
    CantidadXModeloDetailComponent,
    CantidadXModeloUpdateComponent,
    CantidadXModeloDeleteDialogComponent,
  ],
  entryComponents: [CantidadXModeloDeleteDialogComponent],
})
export class CantidadXModeloModule {}
