import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class FiscalProvider {

  constructor(
    private db: AngularFireDatabase,
    private angularFireAuth: AngularFireAuth
  ) {}

  geraPatch(){
    let path = "/DAS/";
    let uid = this.angularFireAuth.auth.currentUser.uid;
    return path + uid;
  }

  getMeses(ano: string){ 
    return this.db.list(this.geraPatch() + '/' + ano)
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({ key: c.payload.key,...c.payload.val() }));
      })
  }

  checaMes(ano: string, id: number, val: boolean){
    val ? val=false : val=true;
    this.db.object(this.geraPatch() + '/' + ano + '/' + id).update({
      quitado: val
    });
  }

  geraEstruturaMeses(ano: string){
    this.db.object(this.geraPatch()+ '/' + ano)
      .set({
        0 : { mes: "Janeiro", quitado: false, id: 0, ano: ano },
        1 : { mes: "Fevereiro", quitado: false, id: 1, ano: ano },
        2 : { mes: "Março", quitado: false, id: 2, ano: ano },
        3 : { mes: "Abril", quitado: false, id: 3, ano: ano },
        4 : { mes: "Maio", quitado: false, id: 4, ano: ano },
        5 : { mes: "Junho", quitado: false, id: 5, ano: ano },
        6 : { mes: "Julho", quitado: false , id: 6, ano: ano },
        7 : { mes: "Agosto", quitado: false , id: 7, ano: ano },
        8 : { mes: "Setembro", quitado: false , id: 8, ano: ano },
        9 : { mes: "Outubro", quitado: false , id: 9, ano: ano },
        10 : { mes: "Novembro", quitado: false , id: 10, ano: ano },
        11 : { mes: "Dezembro", quitado: false , id: 11, ano: ano },
      });
  }

}
