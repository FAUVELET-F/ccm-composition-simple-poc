import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IParametreComposition } from '../parametre-composition.model';

@Component({
  selector: 'jhi-parametre-composition-detail',
  templateUrl: './parametre-composition-detail.component.html',
})
export class ParametreCompositionDetailComponent implements OnInit {
  parametreComposition: IParametreComposition | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ parametreComposition }) => {
      this.parametreComposition = parametreComposition;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
