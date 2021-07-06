import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ParametreCompositionComponent } from '../list/parametre-composition.component';
import { ParametreCompositionDetailComponent } from '../detail/parametre-composition-detail.component';
import { ParametreCompositionUpdateComponent } from '../update/parametre-composition-update.component';
import { ParametreCompositionRoutingResolveService } from './parametre-composition-routing-resolve.service';

const parametreCompositionRoute: Routes = [
  {
    path: '',
    component: ParametreCompositionComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ParametreCompositionDetailComponent,
    resolve: {
      parametreComposition: ParametreCompositionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ParametreCompositionUpdateComponent,
    resolve: {
      parametreComposition: ParametreCompositionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ParametreCompositionUpdateComponent,
    resolve: {
      parametreComposition: ParametreCompositionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(parametreCompositionRoute)],
  exports: [RouterModule],
})
export class ParametreCompositionRoutingModule {}
