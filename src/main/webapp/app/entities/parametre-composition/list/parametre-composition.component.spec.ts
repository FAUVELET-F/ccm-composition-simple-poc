import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { ParametreCompositionService } from '../service/parametre-composition.service';

import { ParametreCompositionComponent } from './parametre-composition.component';

describe('Component Tests', () => {
  describe('ParametreComposition Management Component', () => {
    let comp: ParametreCompositionComponent;
    let fixture: ComponentFixture<ParametreCompositionComponent>;
    let service: ParametreCompositionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [ParametreCompositionComponent],
      })
        .overrideTemplate(ParametreCompositionComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ParametreCompositionComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(ParametreCompositionService);

      const headers = new HttpHeaders().append('link', 'link;link');
      jest.spyOn(service, 'query').mockReturnValue(
        of(
          new HttpResponse({
            body: [{ id: 123 }],
            headers,
          })
        )
      );
    });

    it('Should call load all on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.parametreCompositions?.[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
