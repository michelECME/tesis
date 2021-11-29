export interface ILUBRICANTEXTIPO {
  id?: number;
  cantidadLubricante?: number | null;
  lubricante?: string | null;
}

export class LUBRICANTEXTIPO implements ILUBRICANTEXTIPO {
  constructor(public id?: number, public cantidadLubricante?: number | null, public lubricante?: string | null) {}
}

export function getLUBRICANTEXTIPOIdentifier(lUBRICANTEXTIPO: ILUBRICANTEXTIPO): number | undefined {
  return lUBRICANTEXTIPO.id;
}
