export interface ICANTIDADXTIPOUEB {
  id?: number;
  cantidadTipoUEB?: number | null;
  tipoCarro?: string | null;
  ueb?: string | null;
}

export class CANTIDADXTIPOUEB implements ICANTIDADXTIPOUEB {
  constructor(public id?: number, public cantidadTipoUEB?: number | null, public tipoCarro?: string | null, public ueb?: string | null) {}
}

export function getCANTIDADXTIPOUEBIdentifier(cANTIDADXTIPOUEB: ICANTIDADXTIPOUEB): number | undefined {
  return cANTIDADXTIPOUEB.id;
}
