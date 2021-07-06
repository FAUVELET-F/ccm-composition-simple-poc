import { IParametreComposition } from 'app/entities/parametre-composition/parametre-composition.model';

export interface ITemplate {
  id?: number;
  nom?: string | null;
  template?: IParametreComposition | null;
}

export class Template implements ITemplate {
  constructor(public id?: number, public nom?: string | null, public template?: IParametreComposition | null) {}
}

export function getTemplateIdentifier(template: ITemplate): number | undefined {
  return template.id;
}
