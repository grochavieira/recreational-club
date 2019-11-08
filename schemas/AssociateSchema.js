// Tabela dos associados
export default class AssociateSchema {
  static schema = {
    name: 'Associate',
    primaryKey: 'id',
    properties: {
      id: {type: 'int', indexed: true},
      nomeCompleto: 'string',
      email: 'string',
      telefone: 'string',
      numDependentes: 'string',
      nascimento: 'string',
      sexo: 'string',
      numVisitas: 'int',
    },
  };
}
