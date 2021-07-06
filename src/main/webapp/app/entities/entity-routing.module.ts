import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'parametre-composition',
        data: { pageTitle: 'ParametreCompositions' },
        loadChildren: () => import('./parametre-composition/parametre-composition.module').then(m => m.ParametreCompositionModule),
      },
      {
        path: 'template',
        data: { pageTitle: 'Templates' },
        loadChildren: () => import('./template/template.module').then(m => m.TemplateModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
