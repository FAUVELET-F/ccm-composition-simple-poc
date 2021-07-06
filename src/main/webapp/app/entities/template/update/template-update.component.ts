import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ITemplate, Template } from '../template.model';
import { TemplateService } from '../service/template.service';
import { IParametreComposition } from 'app/entities/parametre-composition/parametre-composition.model';
import { ParametreCompositionService } from 'app/entities/parametre-composition/service/parametre-composition.service';

@Component({
  selector: 'jhi-template-update',
  templateUrl: './template-update.component.html',
})
export class TemplateUpdateComponent implements OnInit {
  isSaving = false;

  parametreCompositionsSharedCollection: IParametreComposition[] = [];

  editForm = this.fb.group({
    id: [],
    nom: [],
    template: [],
  });

  constructor(
    protected templateService: TemplateService,
    protected parametreCompositionService: ParametreCompositionService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ template }) => {
      this.updateForm(template);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const template = this.createFromForm();
    if (template.id !== undefined) {
      this.subscribeToSaveResponse(this.templateService.update(template));
    } else {
      this.subscribeToSaveResponse(this.templateService.create(template));
    }
  }

  trackParametreCompositionById(index: number, item: IParametreComposition): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITemplate>>): void {
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

  protected updateForm(template: ITemplate): void {
    this.editForm.patchValue({
      id: template.id,
      nom: template.nom,
      template: template.template,
    });

    this.parametreCompositionsSharedCollection = this.parametreCompositionService.addParametreCompositionToCollectionIfMissing(
      this.parametreCompositionsSharedCollection,
      template.template
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
            this.editForm.get('template')!.value
          )
        )
      )
      .subscribe((parametreCompositions: IParametreComposition[]) => (this.parametreCompositionsSharedCollection = parametreCompositions));
  }

  protected createFromForm(): ITemplate {
    return {
      ...new Template(),
      id: this.editForm.get(['id'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      template: this.editForm.get(['template'])!.value,
    };
  }
}
