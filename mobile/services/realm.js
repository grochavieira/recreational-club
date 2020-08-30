import Realm from 'realm';

import AssociateSchema from '../schemas/AssociateSchema';
import EmployeeSchema from '../schemas/EmployeeSchema';

// Retorna o banco de dados com a tabela dos funcionários e associados
export default function getRealm() {
  return Realm.open({
    schema: [AssociateSchema, EmployeeSchema],
  });
}
