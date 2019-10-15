import Realm from "realm";

import ClientSchema from "../schemas/ClientSchema";

export default function getRealm(){
    return Realm.open({
        schema: [ClientSchema],
    }),
}