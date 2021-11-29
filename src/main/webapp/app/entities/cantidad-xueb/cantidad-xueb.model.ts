export interface ICantidadXUEB {
  id?: number;
  cantidadModelo?: number | null;
  ueb?: string | null;
}

export class CantidadXUEB implements ICantidadXUEB {
  constructor(public id?: number, public cantidadModelo?: number | null, public ueb?: string | null) {}
}

export function getCantidadXUEBIdentifier(cantidadXUEB: ICantidadXUEB): number | undefined {
  return cantidadXUEB.id;
}
