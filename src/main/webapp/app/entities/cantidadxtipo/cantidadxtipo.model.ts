export interface ICANTIDADXTIPO {
  id?: number;
  cantidadTipo?: number | null;
  tipo?: string | null;
}

export class CANTIDADXTIPO implements ICANTIDADXTIPO {
  constructor(public id?: number, public cantidadTipo?: number | null, public tipo?: string | null) {}
}

export function getCANTIDADXTIPOIdentifier(cANTIDADXTIPO: ICANTIDADXTIPO): number | undefined {
  return cANTIDADXTIPO.id;
}
