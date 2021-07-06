import { ParametreCompositionType } from 'app/entities/enumerations/parametre-composition-type.model';

export interface IParametreComposition {
  id?: number;
  nomBaliseXml?: string | null;
  libelle?: string | null;
  type?: ParametreCompositionType | null;
  childParams?: IParametreComposition[] | null;
  parametreComposition?: IParametreComposition | null;
}

export class ParametreComposition implements IParametreComposition {
  constructor(
    public id?: number,
    public nomBaliseXml?: string | null,
    public libelle?: string | null,
    public type?: ParametreCompositionType | null,
    public childParams?: IParametreComposition[] | null,
    public parametreComposition?: IParametreComposition | null
  ) {}
}

export function getParametreCompositionIdentifier(parametreComposition: IParametreComposition): number | undefined {
  return parametreComposition.id;
}
