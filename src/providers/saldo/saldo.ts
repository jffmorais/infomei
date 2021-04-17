import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';


@Injectable()
export class SaldoProvider {

  constructor(private db: AngularFireDatabase,
    private angularFireAuth: AngularFireAuth) {
    
  }

  saveSaldo(uid:any, valor:number){
    return this.db.object('/saldo/' + uid)
      .set({saldo: valor});
  }

  geraPatch(){
    let path = "/saldo/";
    let uid = this.angularFireAuth.auth.currentUser.uid;
    return path + uid;
  }

  updateSaldo(valor: number){
    return this.db.object(this.geraPatch())
      .update({
        saldo: valor
      });
  }

  getSaldo(){ 
    return this.db.object(this.geraPatch())
      .snapshotChanges()
      .map(c => {
        return { key: c.payload.key,...c.payload.val() };
      })
  }

  getSaldo2(){
    let uid = this.angularFireAuth.auth.currentUser.uid;
    return this.db.database.ref(`/saldo/${uid}`).once('value').then((snapshot) =>{return snapshot.val()})
  }

}
