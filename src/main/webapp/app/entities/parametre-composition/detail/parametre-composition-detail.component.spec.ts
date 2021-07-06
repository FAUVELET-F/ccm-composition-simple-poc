import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ParametreCompositionDetailComponent } from './parametre-composition-detail.component';

describe('Component Tests', () => {
  describe('ParametreComposition Management Detail Component', () => {
    let comp: ParametreCompositionDetailComponent;
    let fixture: ComponentFixture<ParametreCompositionDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ParametreCompositionDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ parametreComposition: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(ParametreCompositionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ParametreCompositionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load parametreComposition on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.parametreComposition).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
