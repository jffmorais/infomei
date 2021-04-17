//import { Observable } from 'rxjs/Observable';
//import { AngularFireList } from 'angularfire2/database/interfaces';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
//import * as firebase from 'firebase';

@Injectable()
export class VendaProvider {

  dia; mes; ano; hora: string;

  constructor(
    private db: AngularFireDatabase,
    private angularFireAuth: AngularFireAuth
  ) {
    //var y = firebase.database.ServerValue.TIMESTAMP;
    //console.log(y);
  }

  geraPatch(){
    let path = '/vendas/';
    return path + this.angularFireAuth.auth.currentUser.uid;
  }

  getVendasPeriodo(inicio,fim){
    return this.db.list(this.geraPatch(), ref => ref.orderByChild('timestamp').startAt(inicio).endAt(fim))
    .snapshotChanges()
    .map(changes => {
      return changes.map(c => ({ key: c.payload.key,...c.payload.val() }));
    })
  }

  getVendas(mes: string){
    //console.log(this.geraPatch());
    //return this.db.list(this.geraPatch(), ref => ref.orderByChild('datahora'))
    return this.db.list(this.geraPatch(), ref => ref.orderByChild('mes').equalTo(mes))
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({ key: c.payload.key,...c.payload.val() }));
      })
  }

  getVenda(key: string){
    return this.db.object(this.geraPatch() + key)
      .snapshotChanges()
      .map(c => {
        return { key: c.key, ...c.payload.val() };
      })
  }

  getTimestamp(data){
    let agora: any = new Date(data);
    agora = agora.getTime();
    //console.log(hoje);
    return agora;
  }

  testeVenda(venda: any){

    console.log(venda);

  };

  separaData(datahora: any){
    this.dia = datahora.slice(8,10);
    this.mes = datahora.slice(5,7);
    this.ano = datahora.slice(0,4);
    this.hora = datahora.slice(11,16);
    //console.log(datahora);
    //console.log(this.dia + '-' + this.mes + '-' + this.ano + '-' + this.hora);
  }

  saveVenda(venda: any, total: number){
    this.separaData(venda.datahora);
    return new Promise((resolve, reject) => {
      // se tem chave atualiza o registro
      if(venda.key){
        this.db.list(this.geraPatch())
          .update(venda.key, { nome: venda.nome, tel: venda.tel })
          .then(() => resolve())
          .catch((e) => reject(e));
      // senão, cria um novo registro
      } else {
        this.db.list(this.geraPatch())
          .push({
            nome: venda.nome,
            email: venda.email,
            datahora: venda.datahora,
            items: venda.items,
            total: total,
            dia: this.dia,
            mes: this.mes,
            ano: this.ano,
            hora: this.hora,
            timestamp: this.getTimestamp(venda.datahora)
          })
          .then(() => resolve());
      }
    })

  }

  delVenda(key: string){
    return this.db.list(this.geraPatch()).remove(key);
  }

}
