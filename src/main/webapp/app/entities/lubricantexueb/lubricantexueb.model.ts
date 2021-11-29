export interface ILUBRICANTEXUEB {
  id?: number;
  cantidadLubricanteUEB?: number | null;
  ueb?: string | null;
}

export class LUBRICANTEXUEB implements ILUBRICANTEXUEB {
  constructor(public id?: number, public cantidadLubricanteUEB?: number | null, public ueb?: string | null) {}
}

export function getLUBRICANTEXUEBIdentifier(lUBRICANTEXUEB: ILUBRICANTEXUEB): number | undefined {
  return lUBRICANTEXUEB.id;
}
