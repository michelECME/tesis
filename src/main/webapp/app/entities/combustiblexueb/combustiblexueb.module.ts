import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { COMBUSTIBLEXUEBComponent } from './list/combustiblexueb.component';
import { COMBUSTIBLEXUEBDetailComponent } from './detail/combustiblexueb-detail.component';
import { COMBUSTIBLEXUEBUpdateComponent } from './update/combustiblexueb-update.component';
import { COMBUSTIBLEXUEBDeleteDialogComponent } from './delete/combustiblexueb-delete-dialog.component';
import { COMBUSTIBLEXUEBRoutingModule } from './route/combustiblexueb-routing.module';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  imports: [SharedModule, COMBUSTIBLEXUEBRoutingModule,NgApexchartsModule],
  declarations: [
    COMBUSTIBLEXUEBComponent,
    COMBUSTIBLEXUEBDetailComponent,
    COMBUSTIBLEXUEBUpdateComponent,
    COMBUSTIBLEXUEBDeleteDialogComponent,
  ],
  entryComponents: [COMBUSTIBLEXUEBDeleteDialogComponent],
})
export class COMBUSTIBLEXUEBModule {}
