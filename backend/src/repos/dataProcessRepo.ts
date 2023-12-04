export const countProps = [
  "pacienteEstado",
  "vacinaNome",
  "pacienteIdade",
  "sistemaOrigem",
  "pacienteSexo",
  "categoriaNome",
  "racaCor",
  "vacinaDose",
  "paisPaciente",
  "fabricanteNome",
  "grupoAtendimento",
  // "municipioNome",
] as const;

export type CategoriaCountType = (typeof countProps)[number];

export default interface DataProcessRepo {
  saveAll: () => Promise<void>;

  setState: (categoria: CategoriaCountType, itemName: string) => Promise<void>;
  getState: (categoria: CategoriaCountType) => Promise<{ [relation: string]: number }>;
}
