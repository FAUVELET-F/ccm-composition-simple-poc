import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ParametreCompositionComponent } from './list/parametre-composition.component';
import { ParametreCompositionDetailComponent } from './detail/parametre-composition-detail.component';
import { ParametreCompositionUpdateComponent } from './update/parametre-composition-update.component';
import { ParametreCompositionDeleteDialogComponent } from './delete/parametre-composition-delete-dialog.component';
import { ParametreCompositionRoutingModule } from './route/parametre-composition-routing.module';

@NgModule({
  imports: [SharedModule, ParametreCompositionRoutingModule],
  declarations: [
    ParametreCompositionComponent,
    ParametreCompositionDetailComponent,
    ParametreCompositionUpdateComponent,
    ParametreCompositionDeleteDialogComponent,
  ],
  entryComponents: [ParametreCompositionDeleteDialogComponent],
})
export class ParametreCompositionModule {}
