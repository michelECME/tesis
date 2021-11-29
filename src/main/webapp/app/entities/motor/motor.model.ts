import { Estado } from 'app/entities/enumerations/estado.model';

export interface IMotor {
  id?: number;
  codigo?: string | null;
  estado?: Estado | null;
  marca?: string | null;
}

export class Motor implements IMotor {
  constructor(public id?: number, public codigo?: string | null, public estado?: Estado | null, public marca?: string | null) {}
}

export function getMotorIdentifier(motor: IMotor): number | undefined {
  return motor.id;
}
