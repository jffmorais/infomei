import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
//import {}


@Injectable()
export class ProdutoProvider {

  constructor(
    private db: AngularFireDatabase,
    private angularFireAuth: AngularFireAuth
  ) {}

  geraPatch(){
    let path = '/produtos/';
    return path + this.angularFireAuth.auth.currentUser.uid;
  }

  getProdutos(){
    //console.log(this.PATH);
    return this.db.list(this.geraPatch(), ref => ref.orderByChild('desc'))
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({ key: c.payload.key,...c.payload.val() }));
      })
  }

  getProduto(key: string){
    //console.log(this.PATH + key);
    return this.db.object(this.geraPatch() + key)
      .snapshotChanges()
      .map(c => {
        return { key: c.key, ...c.payload.val() };
      })
  }

  saveProduto(prod: any){
    return new Promise((resolve, reject) => {
      // se tem chave atualiza o registro
      if(prod.key){
        this.db.list(this.geraPatch())
          .update(prod.key, {
            desc: prod.desc,
            unid: prod.unid,
            custo: prod.custo,
            preco: prod.preco
            })
          .then(() => resolve())
          .catch((e) => reject(e));
      // senão, cria um novo registro
      } else {
        this.db.list(this.geraPatch())
          .push({
            desc: prod.desc,
            unid: prod.unid,
            custo: prod.custo,
            preco: prod.preco
          })
          .then(() => resolve());
      }
    })

  }

  delProduto(key: string){
    return this.db.list(this.geraPatch()).remove(key);
  }

}
