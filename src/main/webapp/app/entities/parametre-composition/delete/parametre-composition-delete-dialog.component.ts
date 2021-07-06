import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IParametreComposition } from '../parametre-composition.model';
import { ParametreCompositionService } from '../service/parametre-composition.service';

@Component({
  templateUrl: './parametre-composition-delete-dialog.component.html',
})
export class ParametreCompositionDeleteDialogComponent {
  parametreComposition?: IParametreComposition;

  constructor(protected parametreCompositionService: ParametreCompositionService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.parametreCompositionService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
