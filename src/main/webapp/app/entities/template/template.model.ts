export interface ITemplate {
  id?: number;
  nom?: string | null;
}

export class Template implements ITemplate {
  constructor(public id?: number, public nom?: string | null) {}
}

export function getTemplateIdentifier(template: ITemplate): number | undefined {
  return template.id;
}
