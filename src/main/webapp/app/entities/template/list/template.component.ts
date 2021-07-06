import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITemplate } from '../template.model';
import { TemplateService } from '../service/template.service';
import { TemplateDeleteDialogComponent } from '../delete/template-delete-dialog.component';

@Component({
  selector: 'jhi-template',
  templateUrl: './template.component.html',
})
export class TemplateComponent implements OnInit {
  templates?: ITemplate[];
  isLoading = false;

  constructor(protected templateService: TemplateService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.templateService.query().subscribe(
      (res: HttpResponse<ITemplate[]>) => {
        this.isLoading = false;
        this.templates = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ITemplate): number {
    return item.id!;
  }

  delete(template: ITemplate): void {
    const modalRef = this.modalService.open(TemplateDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.template = template;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
