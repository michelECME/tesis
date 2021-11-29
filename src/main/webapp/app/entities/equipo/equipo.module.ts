import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { EquipoComponent } from './list/equipo.component';
import { EquipoDetailComponent } from './detail/equipo-detail.component';
import { EquipoUpdateComponent } from './update/equipo-update.component';
import { EquipoDeleteDialogComponent } from './delete/equipo-delete-dialog.component';
import { EquipoRoutingModule } from './route/equipo-routing.module';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  imports: [SharedModule, EquipoRoutingModule,NgApexchartsModule],
  declarations: [EquipoComponent, EquipoDetailComponent, EquipoUpdateComponent, EquipoDeleteDialogComponent],
  entryComponents: [EquipoDeleteDialogComponent],
})
export class EquipoModule {}
