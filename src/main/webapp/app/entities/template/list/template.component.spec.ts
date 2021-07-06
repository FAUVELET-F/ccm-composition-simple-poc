import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { TemplateService } from '../service/template.service';

import { TemplateComponent } from './template.component';

describe('Component Tests', () => {
  describe('Template Management Component', () => {
    let comp: TemplateComponent;
    let fixture: ComponentFixture<TemplateComponent>;
    let service: TemplateService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [TemplateComponent],
      })
        .overrideTemplate(TemplateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TemplateComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(TemplateService);

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
      expect(comp.templates?.[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
