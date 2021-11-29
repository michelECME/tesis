export interface IENTREGAXTIPO {
  id?: number;
  cantidad?: number | null;
  tipo?: string | null;
}

export class ENTREGAXTIPO implements IENTREGAXTIPO {
  constructor(public id?: number, public cantidad?: number | null, public tipo?: string | null) {}
}

export function getENTREGAXTIPOIdentifier(eNTREGAXTIPO: IENTREGAXTIPO): number | undefined {
  return eNTREGAXTIPO.id;
}
