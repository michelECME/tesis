import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { MotorComponent } from './list/motor.component';
import { MotorDetailComponent } from './detail/motor-detail.component';
import { MotorUpdateComponent } from './update/motor-update.component';
import { MotorDeleteDialogComponent } from './delete/motor-delete-dialog.component';
import { MotorRoutingModule } from './route/motor-routing.module';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  imports: [SharedModule, MotorRoutingModule,NgApexchartsModule],
  declarations: [MotorComponent, MotorDetailComponent, MotorUpdateComponent, MotorDeleteDialogComponent],
  entryComponents: [MotorDeleteDialogComponent],
})
export class MotorModule {}
