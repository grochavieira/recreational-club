export default class EmployeeSchema {
  static schema = {
    name: 'Employee',
    primaryKey: 'id',
    properties: {
      id: {type: 'int', indexed: true},
      nomeCompleto: 'string',
      email: 'string',
      telefone: 'string',
      usuario: 'string',
      senha: 'string',
    },
  };
}
