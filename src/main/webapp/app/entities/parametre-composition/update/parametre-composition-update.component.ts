import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IParametreComposition, ParametreComposition } from '../parametre-composition.model';
import { ParametreCompositionService } from '../service/parametre-composition.service';
import { ITemplate } from 'app/entities/template/template.model';
import { TemplateService } from 'app/entities/template/service/template.service';

@Component({
  selector: 'jhi-parametre-composition-update',
  templateUrl: './parametre-composition-update.component.html',
})
export class ParametreCompositionUpdateComponent implements OnInit {
  isSaving = false;

  parametreCompositionsSharedCollection: IParametreComposition[] = [];
  templatesSharedCollection: ITemplate[] = [];

  editForm = this.fb.group({
    id: [],
    nomBaliseXml: [],
    libelle: [],
    type: [],
    template: [],
    parametreComposition: [],
  });

  constructor(
    protected parametreCompositionService: ParametreCompositionService,
    protected templateService: TemplateService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ parametreComposition }) => {
      this.updateForm(parametreComposition);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const parametreComposition = this.createFromForm();
    if (parametreComposition.id !== undefined) {
      this.subscribeToSaveResponse(this.parametreCompositionService.update(parametreComposition));
    } else {
      this.subscribeToSaveResponse(this.parametreCompositionService.create(parametreComposition));
    }
  }

  trackParametreCompositionById(index: number, item: IParametreComposition): number {
    return item.id!;
  }

  trackTemplateById(index: number, item: ITemplate): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IParametreComposition>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(parametreComposition: IParametreComposition): void {
    this.editForm.patchValue({
      id: parametreComposition.id,
      nomBaliseXml: parametreComposition.nomBaliseXml,
      libelle: parametreComposition.libelle,
      type: parametreComposition.type,
      template: parametreComposition.template,
      parametreComposition: parametreComposition.parametreComposition,
    });

    this.parametreCompositionsSharedCollection = this.parametreCompositionService.addParametreCompositionToCollectionIfMissing(
      this.parametreCompositionsSharedCollection,
      parametreComposition.parametreComposition
    );
    this.templatesSharedCollection = this.templateService.addTemplateToCollectionIfMissing(
      this.templatesSharedCollection,
      parametreComposition.template
    );
  }

  protected loadRelationshipsOptions(): void {
    this.parametreCompositionService
      .query()
      .pipe(map((res: HttpResponse<IParametreComposition[]>) => res.body ?? []))
      .pipe(
        map((parametreCompositions: IParametreComposition[]) =>
          this.parametreCompositionService.addParametreCompositionToCollectionIfMissing(
            parametreCompositions,
            this.editForm.get('parametreComposition')!.value
          )
        )
      )
      .subscribe((parametreCompositions: IParametreComposition[]) => (this.parametreCompositionsSharedCollection = parametreCompositions));

    this.templateService
      .query()
      .pipe(map((res: HttpResponse<ITemplate[]>) => res.body ?? []))
      .pipe(
        map((templates: ITemplate[]) =>
          this.templateService.addTemplateToCollectionIfMissing(templates, this.editForm.get('template')!.value)
        )
      )
      .subscribe((templates: ITemplate[]) => (this.templatesSharedCollection = templates));
  }

  protected createFromForm(): IParametreComposition {
    return {
      ...new ParametreComposition(),
      id: this.editForm.get(['id'])!.value,
      nomBaliseXml: this.editForm.get(['nomBaliseXml'])!.value,
      libelle: this.editForm.get(['libelle'])!.value,
      type: this.editForm.get(['type'])!.value,
      template: this.editForm.get(['template'])!.value,
      parametreComposition: this.editForm.get(['parametreComposition'])!.value,
    };
  }
}
