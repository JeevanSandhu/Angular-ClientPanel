import { Injectable } from '@angular/core';

import { AngularFireDatabase} from 'angularfire2/database';
import { Observable } from 'rxjs';
import { Client } from '../models/Client';
import { AngularFireList, SnapshotAction } from 'angularfire2/database/interfaces';

@Injectable()
export class ClientService {
  dbRef:any;

  constructor(public af:AngularFireDatabase) {
    this.dbRef = this.af.list('/clients');
  }

  getClients() {
    // return this.dbRef.valueChanges(); This return only the data, so we have no access to key for any manipulations
    // use snapshotChanges instead with the following map
    return this.dbRef.snapshotChanges().map(actions => {
      return actions.map(action => ({key: action.key, ...action.payload.val() }));
    });
  }

  addClient(client:Client) {
    this.dbRef.push(client);
  }

  getClient(id:string) {
    return this.af.object('/clients/' + id).snapshotChanges().map(action => {
      return {key: action.key, ...action.payload.val()}
    });
  }

  updateClient(id:string, client:Client) {
    this.dbRef.update(id, client);
  }

  deleteClient(id:string) {
    this.dbRef.remove(id);
  }

}
