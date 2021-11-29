import { IAsignacion } from 'app/entities/asignacion/asignacion.model';
import { UnidadDeMedida } from 'app/entities/enumerations/unidad-de-medida.model';
import { TipoRecurso } from 'app/entities/enumerations/tipo-recurso.model';

export interface IRecurso {
  id?: number;
  nombre?: string | null;
  um?: UnidadDeMedida | null;
  tipo?: TipoRecurso | null;
  asignacions?: IAsignacion[] | null;
}

export class Recurso implements IRecurso {
  constructor(
    public id?: number,
    public nombre?: string | null,
    public um?: UnidadDeMedida | null,
    public tipo?: TipoRecurso | null,
    public asignacions?: IAsignacion[] | null
  ) {}
}

export function getRecursoIdentifier(recurso: IRecurso): number | undefined {
  return recurso.id;
}
