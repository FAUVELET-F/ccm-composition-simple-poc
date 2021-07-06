jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { TemplateService } from '../service/template.service';
import { ITemplate, Template } from '../template.model';
import { IParametreComposition } from 'app/entities/parametre-composition/parametre-composition.model';
import { ParametreCompositionService } from 'app/entities/parametre-composition/service/parametre-composition.service';

import { TemplateUpdateComponent } from './template-update.component';

describe('Component Tests', () => {
  describe('Template Management Update Component', () => {
    let comp: TemplateUpdateComponent;
    let fixture: ComponentFixture<TemplateUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let templateService: TemplateService;
    let parametreCompositionService: ParametreCompositionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [TemplateUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(TemplateUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TemplateUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      templateService = TestBed.inject(TemplateService);
      parametreCompositionService = TestBed.inject(ParametreCompositionService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call ParametreComposition query and add missing value', () => {
        const template: ITemplate = { id: 456 };
        const template: IParametreComposition = { id: 96994 };
        template.template = template;

        const parametreCompositionCollection: IParametreComposition[] = [{ id: 29967 }];
        jest.spyOn(parametreCompositionService, 'query').mockReturnValue(of(new HttpResponse({ body: parametreCompositionCollection })));
        const additionalParametreCompositions = [template];
        const expectedCollection: IParametreComposition[] = [...additionalParametreCompositions, ...parametreCompositionCollection];
        jest.spyOn(parametreCompositionService, 'addParametreCompositionToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ template });
        comp.ngOnInit();

        expect(parametreCompositionService.query).toHaveBeenCalled();
        expect(parametreCompositionService.addParametreCompositionToCollectionIfMissing).toHaveBeenCalledWith(
          parametreCompositionCollection,
          ...additionalParametreCompositions
        );
        expect(comp.parametreCompositionsSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const template: ITemplate = { id: 456 };
        const template: IParametreComposition = { id: 76274 };
        template.template = template;

        activatedRoute.data = of({ template });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(template));
        expect(comp.parametreCompositionsSharedCollection).toContain(template);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Template>>();
        const template = { id: 123 };
        jest.spyOn(templateService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ template });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: template }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(templateService.update).toHaveBeenCalledWith(template);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Template>>();
        const template = new Template();
        jest.spyOn(templateService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ template });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: template }));
        saveSubject.complete();

        // THEN
        expect(templateService.create).toHaveBeenCalledWith(template);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Template>>();
        const template = { id: 123 };
        jest.spyOn(templateService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ template });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(templateService.update).toHaveBeenCalledWith(template);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackParametreCompositionById', () => {
        it('Should return tracked ParametreComposition primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackParametreCompositionById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
