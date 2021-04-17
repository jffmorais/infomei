import { FiscalProvider } from '../../providers/fiscal/fiscal';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';


@IonicPage()
@Component({
  selector: 'page-fiscal',
  templateUrl: 'fiscal.html',
})
export class FiscalPage {

  ano = new Date().toISOString();
  meses: Observable<any>;
  loading: any;
  arrMeses: any[] = [];
  semRegistro: boolean = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private provider: FiscalProvider,
    private loadingCtrl: LoadingController
  ) {
    this.carregaMeses();
  }

  carregaMeses(){
    this.showLoading();
    this.meses = this.provider.getMeses(this.ano.slice(0,4));
    this.arrMeses = [];
    this.meses.subscribe(item =>{
      item.forEach(mes => {
        this.arrMeses.push({
          mes: mes.mes,
          quitado: mes.quitado
        });  
      }); 
      this.dismissLoading();
      //console.log(this.arrMeses);
      if(this.arrMeses.length<=0){
        //console.log("sem registros no ano");
        this.semRegistro = true;
      } else {
        this.semRegistro = false;
      }
     });     
  }

  geraMeses(){
    this.provider.geraEstruturaMeses(this.ano.slice(0,4));
  }

  checaMes(ano: string, id: number, val: boolean){
    this.provider.checaMes(ano, id, val);
  }

  showLoading() {
    if(!this.loading){
      this.loading = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: 'Carregando',
        //dismissOnPageChange: false
      });
        this.loading.present();
    }
}

dismissLoading(){
    if(this.loading){
        this.loading.dismiss();
        this.loading = null;
    }
}

}
