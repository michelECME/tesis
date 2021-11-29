import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { CANTIDADXTIPOComponent } from './list/cantidadxtipo.component';
import { CANTIDADXTIPODetailComponent } from './detail/cantidadxtipo-detail.component';
import { CANTIDADXTIPOUpdateComponent } from './update/cantidadxtipo-update.component';
import { CANTIDADXTIPODeleteDialogComponent } from './delete/cantidadxtipo-delete-dialog.component';
import { CANTIDADXTIPORoutingModule } from './route/cantidadxtipo-routing.module';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  imports: [SharedModule, CANTIDADXTIPORoutingModule,NgApexchartsModule],
  declarations: [CANTIDADXTIPOComponent, CANTIDADXTIPODetailComponent, CANTIDADXTIPOUpdateComponent, CANTIDADXTIPODeleteDialogComponent],
  entryComponents: [CANTIDADXTIPODeleteDialogComponent],
})
export class CANTIDADXTIPOModule {}
