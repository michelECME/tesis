export interface ICantidadXMarca {
  id?: number;
  cantidadMarca?: number | null;
  modelo?: string | null;
}

export class CantidadXMarca implements ICantidadXMarca {
  constructor(public id?: number, public cantidadMarca?: number | null, public modelo?: string | null) {}
}

export function getCantidadXMarcaIdentifier(cantidadXMarca: ICantidadXMarca): number | undefined {
  return cantidadXMarca.id;
}
