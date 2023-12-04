export interface VacinaData {
  _index: string;
  _type: string;
  _id: string;
  _score: number;

  _source: {
    paciente_endereco_coPais: string;
    paciente_nacionalidade_enumNacionalidade: string;
    vacina_fabricante_referencia: string;
    vacina_nome: string;
    paciente_idade: number;
    ds_condicao_maternal: string;
    vacina_codigo: string;
    sistema_origem: string;
    paciente_endereco_coIbgeMunicipio: string;
    vacina_lote: string;
    paciente_enumSexoBiologico: string;
    vacina_categoria_nome: string;
    dt_deleted: null;
    vacina_grupoAtendimento_codigo: string;
    paciente_endereco_uf: string;
    estabelecimento_razaoSocial: string;
    paciente_racaCor_valor: string;
    data_importacao_rnds: string;
    vacina_numDose: string;
    vacina_dataAplicacao: string;
    estabelecimento_municipio_nome: string;
    paciente_id: string;
    paciente_endereco_nmMunicipio: string;
    paciente_dataNascimento: string;
    id_sistema_origem: string;
    vacina_grupoAtendimento_nome: string;
    vacina_fabricante_nome: string;
    paciente_endereco_cep: string;
    data_importacao_datalake: string;
    estabelecimento_valor: string;
    paciente_racaCor_codigo: string;
    estalecimento_noFantasia: string;
    estabelecimento_uf: string;
    vacina_categoria_codigo: string;
    vacina_descricao_dose: string;
    status: string;
    document_id: string;
    estabelecimento_municipio_codigo: string;
    co_condicao_maternal: string;
    paciente_endereco_nmPais: string;
    "@timestamp": string | Date;
    "@version": string;
  };
}

export interface Category {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

// {
//   "_index": "desc-imunizacao-v5",
//   "_type": "_doc",
//   "_id": "1934a482-df30-4fc0-b55b-50cda621918d-i0b0",
//   "_score": 1.0,
//   "_source": {
//       "paciente_endereco_coPais": "10",
//       "paciente_nacionalidade_enumNacionalidade": "B",
//       "vacina_fabricante_referencia": "28290",
//       "vacina_nome": "COVID-19 PFIZER - COMIRNATY PEDIÁTRICA",
//       "paciente_idade": 11,
//       "ds_condicao_maternal": "Nenhuma",
//       "vacina_codigo": "99",
//       "sistema_origem": "Novo PNI",
//       "paciente_endereco_coIbgeMunicipio": "292225",
//       "vacina_lote": "GN0764",
//       "paciente_enumSexoBiologico": "M",
//       "vacina_categoria_nome": "Faixa Etária",
//       "dt_deleted": null,
//       "vacina_grupoAtendimento_codigo": "000210",
//       "paciente_endereco_uf": "BA",
//       "estabelecimento_razaoSocial": "PREFEITURA MUNICIPAL DE IBOTIRAMA",
//       "paciente_racaCor_valor": "INDIGENA",
//       "data_importacao_rnds": "2023-12-01T16:13:55.000Z",
//       "vacina_numDose": "3",
//       "vacina_dataAplicacao": "2023-10-31T00:00:00.000Z",
//       "estabelecimento_municipio_nome": "IBOTIRAMA",
//       "paciente_id": "261120459cd0acbf020c720557a15057c443e6e1a47d12d56fa9963a9914f4d7",
//       "paciente_endereco_nmMunicipio": "MUQUEM DE SAO FRANCISCO",
//       "paciente_dataNascimento": "2012-07-17",
//       "id_sistema_origem": "16341",
//       "vacina_grupoAtendimento_nome": "Faixa Etária",
//       "vacina_fabricante_nome": "PFIZER - PEDIÁTRICA",
//       "@timestamp": "2023-12-01T21:16:27.004Z",
//       "paciente_endereco_cep": "47115",
//       "data_importacao_datalake": "2023-12-01T18:06:32.000Z",
//       "@version": "1",
//       "estabelecimento_valor": "2799596",
//       "paciente_racaCor_codigo": "05",
//       "estalecimento_noFantasia": "UNIDADE DE SAUDE DA FAMILIA POLO CANABRAVA ILHAS",
//       "estabelecimento_uf": "BA",
//       "vacina_categoria_codigo": "2",
//       "vacina_descricao_dose": "3ª Dose",
//       "status": "final",
//       "document_id": "1934a482-df30-4fc0-b55b-50cda621918d-i0b0",
//       "estabelecimento_municipio_codigo": "291320",
//       "co_condicao_maternal": 1,
//       "paciente_endereco_nmPais": "BRASIL"
//   }
// }
