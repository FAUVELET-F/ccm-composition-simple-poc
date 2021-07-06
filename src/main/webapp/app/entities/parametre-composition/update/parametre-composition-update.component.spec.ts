jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { ParametreCompositionService } from '../service/parametre-composition.service';
import { IParametreComposition, ParametreComposition } from '../parametre-composition.model';
import { ITemplate } from 'app/entities/template/template.model';
import { TemplateService } from 'app/entities/template/service/template.service';

import { ParametreCompositionUpdateComponent } from './parametre-composition-update.component';

describe('Component Tests', () => {
  describe('ParametreComposition Management Update Component', () => {
    let comp: ParametreCompositionUpdateComponent;
    let fixture: ComponentFixture<ParametreCompositionUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let parametreCompositionService: ParametreCompositionService;
    let templateService: TemplateService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [ParametreCompositionUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(ParametreCompositionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ParametreCompositionUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      parametreCompositionService = TestBed.inject(ParametreCompositionService);
      templateService = TestBed.inject(TemplateService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call ParametreComposition query and add missing value', () => {
        const parametreComposition: IParametreComposition = { id: 456 };
        const parametreComposition: IParametreComposition = { id: 31639 };
        parametreComposition.parametreComposition = parametreComposition;

        const parametreCompositionCollection: IParametreComposition[] = [{ id: 26696 }];
        jest.spyOn(parametreCompositionService, 'query').mockReturnValue(of(new HttpResponse({ body: parametreCompositionCollection })));
        const additionalParametreCompositions = [parametreComposition];
        const expectedCollection: IParametreComposition[] = [...additionalParametreCompositions, ...parametreCompositionCollection];
        jest.spyOn(parametreCompositionService, 'addParametreCompositionToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ parametreComposition });
        comp.ngOnInit();

        expect(parametreCompositionService.query).toHaveBeenCalled();
        expect(parametreCompositionService.addParametreCompositionToCollectionIfMissing).toHaveBeenCalledWith(
          parametreCompositionCollection,
          ...additionalParametreCompositions
        );
        expect(comp.parametreCompositionsSharedCollection).toEqual(expectedCollection);
      });

      it('Should call Template query and add missing value', () => {
        const parametreComposition: IParametreComposition = { id: 456 };
        const template: ITemplate = { id: 82402 };
        parametreComposition.template = template;

        const templateCollection: ITemplate[] = [{ id: 58359 }];
        jest.spyOn(templateService, 'query').mockReturnValue(of(new HttpResponse({ body: templateCollection })));
        const additionalTemplates = [template];
        const expectedCollection: ITemplate[] = [...additionalTemplates, ...templateCollection];
        jest.spyOn(templateService, 'addTemplateToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ parametreComposition });
        comp.ngOnInit();

        expect(templateService.query).toHaveBeenCalled();
        expect(templateService.addTemplateToCollectionIfMissing).toHaveBeenCalledWith(templateCollection, ...additionalTemplates);
        expect(comp.templatesSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const parametreComposition: IParametreComposition = { id: 456 };
        const parametreComposition: IParametreComposition = { id: 37707 };
        parametreComposition.parametreComposition = parametreComposition;
        const template: ITemplate = { id: 69101 };
        parametreComposition.template = template;

        activatedRoute.data = of({ parametreComposition });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(parametreComposition));
        expect(comp.parametreCompositionsSharedCollection).toContain(parametreComposition);
        expect(comp.templatesSharedCollection).toContain(template);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<ParametreComposition>>();
        const parametreComposition = { id: 123 };
        jest.spyOn(parametreCompositionService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ parametreComposition });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: parametreComposition }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(parametreCompositionService.update).toHaveBeenCalledWith(parametreComposition);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<ParametreComposition>>();
        const parametreComposition = new ParametreComposition();
        jest.spyOn(parametreCompositionService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ parametreComposition });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: parametreComposition }));
        saveSubject.complete();

        // THEN
        expect(parametreCompositionService.create).toHaveBeenCalledWith(parametreComposition);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<ParametreComposition>>();
        const parametreComposition = { id: 123 };
        jest.spyOn(parametreCompositionService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ parametreComposition });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(parametreCompositionService.update).toHaveBeenCalledWith(parametreComposition);
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

      describe('trackTemplateById', () => {
        it('Should return tracked Template primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackTemplateById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
