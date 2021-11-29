import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { RecursoComponent } from './list/recurso.component';
import { RecursoDetailComponent } from './detail/recurso-detail.component';
import { RecursoUpdateComponent } from './update/recurso-update.component';
import { RecursoDeleteDialogComponent } from './delete/recurso-delete-dialog.component';
import { RecursoRoutingModule } from './route/recurso-routing.module';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  imports: [SharedModule, RecursoRoutingModule,NgApexchartsModule],
  declarations: [RecursoComponent, RecursoDetailComponent, RecursoUpdateComponent, RecursoDeleteDialogComponent],
  entryComponents: [RecursoDeleteDialogComponent],
})
export class RecursoModule {}
