import * as dayjs from 'dayjs';
import { IChofer } from 'app/entities/chofer/chofer.model';
import { IRecurso } from 'app/entities/recurso/recurso.model';

export interface IAsignacion {
  id?: number;
  fecha?: dayjs.Dayjs | null;
  cantidad?: number | null;
  chofer?: IChofer | null;
  recurso?: IRecurso | null;
}

export class Asignacion implements IAsignacion {
  constructor(
    public id?: number,
    public fecha?: dayjs.Dayjs | null,
    public cantidad?: number | null,
    public chofer?: IChofer | null,
    public recurso?: IRecurso | null
  ) {}
}

export function getAsignacionIdentifier(asignacion: IAsignacion): number | undefined {
  return asignacion.id;
}
