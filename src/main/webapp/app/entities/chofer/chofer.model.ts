import { IAsignacion } from 'app/entities/asignacion/asignacion.model';
import { Licencia } from 'app/entities/enumerations/licencia.model';

export interface IChofer {
  id?: number;
  nombre?: string | null;
  licencia?: Licencia | null;
  no_licencia?: string;
  asignacions?: IAsignacion[] | null;
}

export class Chofer implements IChofer {
  constructor(
    public id?: number,
    public nombre?: string | null,
    public licencia?: Licencia | null,
    public no_licencia?: string,
    public asignacions?: IAsignacion[] | null
  ) {}
}

export function getChoferIdentifier(chofer: IChofer): number | undefined {
  return chofer.id;
}
