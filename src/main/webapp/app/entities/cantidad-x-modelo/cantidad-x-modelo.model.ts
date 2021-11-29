export interface ICantidadXModelo {
  id?: number;
  cantidadModelo?: number | null;
  modelo?: string | null;
}

export class CantidadXModelo implements ICantidadXModelo {
  constructor(public id?: number, public cantidadModelo?: number | null, public modelo?: string | null) {}
}

export function getCantidadXModeloIdentifier(cantidadXModelo: ICantidadXModelo): number | undefined {
  return cantidadXModelo.id;
}
