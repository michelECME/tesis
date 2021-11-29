export interface ICOMBUSTIBLEXUEB {
  id?: number;
  cantidadCombustibleUEB?: number | null;
  ueb?: string | null;
}

export class COMBUSTIBLEXUEB implements ICOMBUSTIBLEXUEB {
  constructor(public id?: number, public cantidadCombustibleUEB?: number | null, public ueb?: string | null) {}
}

export function getCOMBUSTIBLEXUEBIdentifier(cOMBUSTIBLEXUEB: ICOMBUSTIBLEXUEB): number | undefined {
  return cOMBUSTIBLEXUEB.id;
}
