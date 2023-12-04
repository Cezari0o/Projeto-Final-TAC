import { Estado } from "@prisma/client";

export default interface DataProcessRepo {
  saveAll: () => Promise<void>;

  setEstadoPaciente: (estadoNome: string) => void;
  getEstadoPacienteCount: () => { [estado: string]: number };

  setVacinaNome: (nome: string) => Promise<void>;
  getVacinaNome: () => Promise<{ [vacinaNome: string]: number }>;

  setIdadeCount: (idade: number) => Promise<void>;
  getIdadeCount: () => Promise<{ [idade: number]: number }>;

  setSistemaOrigemCount: (sistema: string) => Promise<void>;
  getSistemaOrigemCount: () => Promise<{ [sistema: string]: number }>;

  setSexoCount: (sexo: string) => Promise<void>;
  getSexoCount: () => Promise<{ [sexo: string]: number }>;

  setCategoriaCount: (categoria: string) => Promise<void>;
  getCategoriaCount: () => Promise<{ [categoria: string]: number }>;

  createEstado: (estado: string) => Promise<void>;
  getEstado: (id: number) => Promise<Estado>;
}
