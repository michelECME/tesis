import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { LUBRICANTEXUEBComponent } from './list/lubricantexueb.component';
import { LUBRICANTEXUEBDetailComponent } from './detail/lubricantexueb-detail.component';
import { LUBRICANTEXUEBUpdateComponent } from './update/lubricantexueb-update.component';
import { LUBRICANTEXUEBDeleteDialogComponent } from './delete/lubricantexueb-delete-dialog.component';
import { LUBRICANTEXUEBRoutingModule } from './route/lubricantexueb-routing.module';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  imports: [SharedModule, LUBRICANTEXUEBRoutingModule,NgApexchartsModule],
  declarations: [
    LUBRICANTEXUEBComponent,
    LUBRICANTEXUEBDetailComponent,
    LUBRICANTEXUEBUpdateComponent,
    LUBRICANTEXUEBDeleteDialogComponent,
  ],
  entryComponents: [LUBRICANTEXUEBDeleteDialogComponent],
})
export class LUBRICANTEXUEBModule {}
