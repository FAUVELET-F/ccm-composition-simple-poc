jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IParametreComposition, ParametreComposition } from '../parametre-composition.model';
import { ParametreCompositionService } from '../service/parametre-composition.service';

import { ParametreCompositionRoutingResolveService } from './parametre-composition-routing-resolve.service';

describe('Service Tests', () => {
  describe('ParametreComposition routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: ParametreCompositionRoutingResolveService;
    let service: ParametreCompositionService;
    let resultParametreComposition: IParametreComposition | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(ParametreCompositionRoutingResolveService);
      service = TestBed.inject(ParametreCompositionService);
      resultParametreComposition = undefined;
    });

    describe('resolve', () => {
      it('should return IParametreComposition returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultParametreComposition = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultParametreComposition).toEqual({ id: 123 });
      });

      it('should return new IParametreComposition if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultParametreComposition = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultParametreComposition).toEqual(new ParametreComposition());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as ParametreComposition })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultParametreComposition = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultParametreComposition).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
