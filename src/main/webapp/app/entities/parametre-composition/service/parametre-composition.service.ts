import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IParametreComposition, getParametreCompositionIdentifier } from '../parametre-composition.model';

export type EntityResponseType = HttpResponse<IParametreComposition>;
export type EntityArrayResponseType = HttpResponse<IParametreComposition[]>;

@Injectable({ providedIn: 'root' })
export class ParametreCompositionService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/parametre-compositions');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(parametreComposition: IParametreComposition): Observable<EntityResponseType> {
    return this.http.post<IParametreComposition>(this.resourceUrl, parametreComposition, { observe: 'response' });
  }

  update(parametreComposition: IParametreComposition): Observable<EntityResponseType> {
    return this.http.put<IParametreComposition>(
      `${this.resourceUrl}/${getParametreCompositionIdentifier(parametreComposition) as number}`,
      parametreComposition,
      { observe: 'response' }
    );
  }

  partialUpdate(parametreComposition: IParametreComposition): Observable<EntityResponseType> {
    return this.http.patch<IParametreComposition>(
      `${this.resourceUrl}/${getParametreCompositionIdentifier(parametreComposition) as number}`,
      parametreComposition,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IParametreComposition>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IParametreComposition[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addParametreCompositionToCollectionIfMissing(
    parametreCompositionCollection: IParametreComposition[],
    ...parametreCompositionsToCheck: (IParametreComposition | null | undefined)[]
  ): IParametreComposition[] {
    const parametreCompositions: IParametreComposition[] = parametreCompositionsToCheck.filter(isPresent);
    if (parametreCompositions.length > 0) {
      const parametreCompositionCollectionIdentifiers = parametreCompositionCollection.map(
        parametreCompositionItem => getParametreCompositionIdentifier(parametreCompositionItem)!
      );
      const parametreCompositionsToAdd = parametreCompositions.filter(parametreCompositionItem => {
        const parametreCompositionIdentifier = getParametreCompositionIdentifier(parametreCompositionItem);
        if (parametreCompositionIdentifier == null || parametreCompositionCollectionIdentifiers.includes(parametreCompositionIdentifier)) {
          return false;
        }
        parametreCompositionCollectionIdentifiers.push(parametreCompositionIdentifier);
        return true;
      });
      return [...parametreCompositionsToAdd, ...parametreCompositionCollection];
    }
    return parametreCompositionCollection;
  }
}
