import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TemplateDetailComponent } from './template-detail.component';

describe('Component Tests', () => {
  describe('Template Management Detail Component', () => {
    let comp: TemplateDetailComponent;
    let fixture: ComponentFixture<TemplateDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TemplateDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ template: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(TemplateDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TemplateDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load template on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.template).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
