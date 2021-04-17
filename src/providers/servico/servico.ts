import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
//import {}


@Injectable()
export class ServicoProvider {

  constructor(
    private db: AngularFireDatabase,
    private angularFireAuth: AngularFireAuth
  ) {}

  geraPatch(){
    let path = '/servicos/';
    return path + this.angularFireAuth.auth.currentUser.uid;
  }

  getServicos(){
    return this.db.list(this.geraPatch(), ref => ref.orderByChild('desc'))
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({ key: c.payload.key,...c.payload.val() }));
      })
  }

  getServico(key: string){
    //console.log(this.PATH + key);
    return this.db.object(this.geraPatch() + key)
      .snapshotChanges()
      .map(c => {
        return { key: c.key, ...c.payload.val() };
      })
  }

  saveServico(serv: any){

    // trocando virgula por ponto
    let preco = serv.preco;
    preco = preco.replace(",",".");

    return new Promise((resolve, reject) => {
      // se tem chave atualiza o registro
      if(serv.key){
        this.db.list(this.geraPatch())
          .update(serv.key, {
            desc: serv.desc,
            //preco: serv.preco,
            preco,
            obs: serv.obs  })
          .then(() => resolve())
          .catch((e) => reject(e));
      // senão, cria um novo registro
      } else {
        this.db.list(this.geraPatch())
          .push({
            desc: serv.desc,
            //preco: serv.preco,
            preco,
            obs: serv.obs })
          .then(() => resolve());
      }
    })

  }

  delServico(key: string){
    return this.db.list(this.geraPatch()).remove(key);
  }

}
