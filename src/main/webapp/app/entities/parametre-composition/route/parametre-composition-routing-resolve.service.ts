import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IParametreComposition, ParametreComposition } from '../parametre-composition.model';
import { ParametreCompositionService } from '../service/parametre-composition.service';

@Injectable({ providedIn: 'root' })
export class ParametreCompositionRoutingResolveService implements Resolve<IParametreComposition> {
  constructor(protected service: ParametreCompositionService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IParametreComposition> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((parametreComposition: HttpResponse<ParametreComposition>) => {
          if (parametreComposition.body) {
            return of(parametreComposition.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ParametreComposition());
  }
}
