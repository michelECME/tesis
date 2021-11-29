export interface IAgregadoXChofer {
  id?: number;
  cantidadChorfer?: number | null;
  chapa?: string | null;
  nombre?: string | null;
}

export class AgregadoXChofer implements IAgregadoXChofer {
  constructor(public id?: number, public cantidadChorfer?: number | null, public chapa?: string | null, public nombre?: string | null) {}
}

export function getAgregadoXChoferIdentifier(agregadoXChofer: IAgregadoXChofer): number | undefined {
  return agregadoXChofer.id;
}
