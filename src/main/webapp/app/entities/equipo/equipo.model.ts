import { IMotor } from 'app/entities/motor/motor.model';
import { IChofer } from 'app/entities/chofer/chofer.model';
import { Clase } from 'app/entities/enumerations/clase.model';
import { Estado } from 'app/entities/enumerations/estado.model';
import { UEB } from 'app/entities/enumerations/ueb.model';

export interface IEquipo {
  id?: number;
  chapilla?: string | null;
  clase?: Clase | null;
  modelo?: string | null;
  codigo?: string | null;
  chapa?: string | null;
  estado?: Estado | null;
  anno?: number | null;
  ueb?: UEB | null;
  marca?: string | null;
  motor?: IMotor | null;
  chofer?: IChofer | null;
}

export class Equipo implements IEquipo {
  constructor(
    public id?: number,
    public chapilla?: string | null,
    public clase?: Clase | null,
    public modelo?: string | null,
    public codigo?: string | null,
    public chapa?: string | null,
    public estado?: Estado | null,
    public anno?: number | null,
    public ueb?: UEB | null,
    public marca?: string | null,
    public motor?: IMotor | null,
    public chofer?: IChofer | null
  ) {}
}

export function getEquipoIdentifier(equipo: IEquipo): number | undefined {
  return equipo.id;
}
