export default class ClientSchema {
  static schema = {
    name: 'Client',
    primaryKey: 'id',
    properties: {
      id: {type: 'int', indexed: true},
      nomeCompleto: 'string',
      email: 'string',
      telefone: 'string',
      numDependentes: 'string',
      aniversario: 'string',
      sexo: 'string',
    },
  };
}
