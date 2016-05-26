import uuid from 'uuid';
import {Map} from 'immutable';

export default function getClientId() {
  let id = localStorage.getItem(['clientId']);
  if (!id) {
    id = uuid.v4();
    let id_json = Map().set('_id', id);

    localStorage.setItem('clientId', id);

    return id_json;
  }
  else {
    let id_json = Map().set('_id', id);
    return id_json;
  }
}
