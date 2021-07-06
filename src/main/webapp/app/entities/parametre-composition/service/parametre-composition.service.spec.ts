import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ParametreCompositionType } from 'app/entities/enumerations/parametre-composition-type.model';
import { IParametreComposition, ParametreComposition } from '../parametre-composition.model';

import { ParametreCompositionService } from './parametre-composition.service';

describe('Service Tests', () => {
  describe('ParametreComposition Service', () => {
    let service: ParametreCompositionService;
    let httpMock: HttpTestingController;
    let elemDefault: IParametreComposition;
    let expectedResult: IParametreComposition | IParametreComposition[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(ParametreCompositionService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        nomBaliseXml: 'AAAAAAA',
        libelle: 'AAAAAAA',
        type: ParametreCompositionType.STRING,
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a ParametreComposition', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new ParametreComposition()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a ParametreComposition', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            nomBaliseXml: 'BBBBBB',
            libelle: 'BBBBBB',
            type: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a ParametreComposition', () => {
        const patchObject = Object.assign(
          {
            type: 'BBBBBB',
          },
          new ParametreComposition()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of ParametreComposition', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            nomBaliseXml: 'BBBBBB',
            libelle: 'BBBBBB',
            type: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a ParametreComposition', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addParametreCompositionToCollectionIfMissing', () => {
        it('should add a ParametreComposition to an empty array', () => {
          const parametreComposition: IParametreComposition = { id: 123 };
          expectedResult = service.addParametreCompositionToCollectionIfMissing([], parametreComposition);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(parametreComposition);
        });

        it('should not add a ParametreComposition to an array that contains it', () => {
          const parametreComposition: IParametreComposition = { id: 123 };
          const parametreCompositionCollection: IParametreComposition[] = [
            {
              ...parametreComposition,
            },
            { id: 456 },
          ];
          expectedResult = service.addParametreCompositionToCollectionIfMissing(parametreCompositionCollection, parametreComposition);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a ParametreComposition to an array that doesn't contain it", () => {
          const parametreComposition: IParametreComposition = { id: 123 };
          const parametreCompositionCollection: IParametreComposition[] = [{ id: 456 }];
          expectedResult = service.addParametreCompositionToCollectionIfMissing(parametreCompositionCollection, parametreComposition);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(parametreComposition);
        });

        it('should add only unique ParametreComposition to an array', () => {
          const parametreCompositionArray: IParametreComposition[] = [{ id: 123 }, { id: 456 }, { id: 36949 }];
          const parametreCompositionCollection: IParametreComposition[] = [{ id: 123 }];
          expectedResult = service.addParametreCompositionToCollectionIfMissing(
            parametreCompositionCollection,
            ...parametreCompositionArray
          );
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const parametreComposition: IParametreComposition = { id: 123 };
          const parametreComposition2: IParametreComposition = { id: 456 };
          expectedResult = service.addParametreCompositionToCollectionIfMissing([], parametreComposition, parametreComposition2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(parametreComposition);
          expect(expectedResult).toContain(parametreComposition2);
        });

        it('should accept null and undefined values', () => {
          const parametreComposition: IParametreComposition = { id: 123 };
          expectedResult = service.addParametreCompositionToCollectionIfMissing([], null, parametreComposition, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(parametreComposition);
        });

        it('should return initial array if no ParametreComposition is added', () => {
          const parametreCompositionCollection: IParametreComposition[] = [{ id: 123 }];
          expectedResult = service.addParametreCompositionToCollectionIfMissing(parametreCompositionCollection, undefined, null);
          expect(expectedResult).toEqual(parametreCompositionCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
