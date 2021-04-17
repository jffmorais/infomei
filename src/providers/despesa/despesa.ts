import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
//import {}


@Injectable()
export class DespesaProvider {

  dia; mes; ano; hora: string;

  constructor(
    private db: AngularFireDatabase,
    private angularFireAuth: AngularFireAuth
  ) {}

  geraPatch(){
    let path = '/despesas/';
    return path + this.angularFireAuth.auth.currentUser.uid;
  }

  getDespesasPeriodo(inicio,fim){
    return this.db.list(this.geraPatch(), ref => ref.orderByChild('timestamp').startAt(inicio).endAt(fim))
    .snapshotChanges()
    .map(changes => {
      return changes.map(c => ({ key: c.payload.key,...c.payload.val() }));
    })
  }

  getDespesas(mes){
    //console.log(this.PATH);
    //return this.db.list(this.geraPatch(), ref => ref.orderByChild('datahora'))
    return this.db.list(this.geraPatch(), ref => ref.orderByChild('mes').equalTo(mes))
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({ key: c.payload.key,...c.payload.val() }));
      })
  }

  getDespesa(key: string){
    //console.log(this.PATH + key);
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

  separaData(datahora: any){
    this.dia = datahora.slice(8,10);
    this.mes = datahora.slice(5,7);
    this.ano = datahora.slice(0,4);
    this.hora = datahora.slice(11,19);
  }

  saveDespesa(desp: any){
    this.separaData(desp.datahora);
    return new Promise((resolve, reject) => {
      // se tem chave atualiza o registro
      if(desp.key){
        this.db.list(this.geraPatch())
          .update(desp.key, {
            desc: desp.desc,
            tipo: desp.tipo,
            valor: desp.valor,
            datahora: desp.datahora,
            dia: this.dia,
            mes: this.mes,
            ano: this.ano,
            hora: this.hora,
            timestamp: this.getTimestamp(desp.datahora)
            })
          .then(() => resolve())
          .catch((e) => reject(e));
      // senão, cria um novo registro
      } else {
        this.db.list(this.geraPatch())
          .push({
            desc: desp.desc,
            tipo: desp.tipo,
            valor: desp.valor,
            datahora: desp.datahora,
            dia: this.dia,
            mes: this.mes,
            ano: this.ano,
            hora: this.hora,
            timestamp: this.getTimestamp(desp.datahora)
          })
          .then(() => resolve());
      }
    })

  }

  delDespesa(key: string){
    return this.db.list(this.geraPatch()).remove(key);
  }

}
