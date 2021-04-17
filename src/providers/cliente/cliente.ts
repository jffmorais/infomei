import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
//import {}


@Injectable()
export class ClienteProvider {

  //private PATH = '/clientes/';

  constructor(
    private db: AngularFireDatabase,
    private angularFireAuth: AngularFireAuth
  ) {}

  geraPatch(){
    let path = '/clientes/';
    return path + this.angularFireAuth.auth.currentUser.uid;
  }

  getClientes(){
    //console.log(this.PATH);
    return this.db.list(this.geraPatch(), ref => ref.orderByChild('nome'))
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({ key: c.payload.key,...c.payload.val() }));
      })
  }

  getCliente(key: string){
    //console.log(this.PATH + key);
    return this.db.object(this.geraPatch() + key)
      .snapshotChanges()
      .map(c => {
        return { key: c.key, ...c.payload.val() };
      })
  }

  saveCliente(cliente: any){
    return new Promise((resolve, reject) => {
      // se tem chave atualiza o registro
      if(cliente.key){
        this.db.list(this.geraPatch())
          .update(cliente.key, {
            nome: cliente.nome,
            tel: cliente.tel,
            email: cliente.email,
            end: cliente.end,
            cidade: cliente.cidade,
            obs: cliente.obs  })
          .then(() => resolve())
          .catch((e) => reject(e));
      // senão, cria um novo registro
      } else {
        this.db.list(this.geraPatch())
          .push({
            nome: cliente.nome,
            tel: cliente.tel,
            email: cliente.email,
            end: cliente.end,
            cidade: cliente.cidade,
            obs: cliente.obs })
          .then(() => resolve());
      }
    })

  }

  delCliente(key: string){
    return this.db.list(this.geraPatch()).remove(key);
  }

}
