import Realm from 'realm';

import ClientSchema from '../schemas/ClientSchema';
import EmployeeSchema from '../schemas/EmployeeSchema';

export default function getRealm() {
  return Realm.open({
    schema: [ClientSchema, EmployeeSchema],
  });
}
