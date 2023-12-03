export default interface DataProcessRepo {
  saveEstadoPaciente: () => Promise<void>;
  saveTempEstadoPaciente: (endereco: string) => void;
  getEstadoPacienteCount: () => { [estado: string]: number };
}
