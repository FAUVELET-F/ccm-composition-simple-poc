import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITemplate } from '../template.model';

@Component({
  selector: 'jhi-template-detail',
  templateUrl: './template-detail.component.html',
})
export class TemplateDetailComponent implements OnInit {
  template: ITemplate | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ template }) => {
      this.template = template;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
