import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IParametreComposition } from '../parametre-composition.model';
import { ParametreCompositionService } from '../service/parametre-composition.service';
import { ParametreCompositionDeleteDialogComponent } from '../delete/parametre-composition-delete-dialog.component';

@Component({
  selector: 'jhi-parametre-composition',
  templateUrl: './parametre-composition.component.html',
})
export class ParametreCompositionComponent implements OnInit {
  parametreCompositions?: IParametreComposition[];
  isLoading = false;

  constructor(protected parametreCompositionService: ParametreCompositionService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.parametreCompositionService.query().subscribe(
      (res: HttpResponse<IParametreComposition[]>) => {
        this.isLoading = false;
        this.parametreCompositions = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IParametreComposition): number {
    return item.id!;
  }

  delete(parametreComposition: IParametreComposition): void {
    const modalRef = this.modalService.open(ParametreCompositionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.parametreComposition = parametreComposition;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
