import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { DespesaProvider } from '../../providers/despesa/despesa';
//import {  }


@IonicPage()
@Component({
  selector: 'page-despesa',
  templateUrl: 'despesa.html',
})
export class DespesaPage {

  desp: Observable<any>;
  loading: any;
  mesAtual = new Date().toISOString();
  arrDespesas: any[] = [];
  total: number = 0;

  constructor(
    public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController,
    private provider: DespesaProvider, private toast: ToastController
    ) {
      
    }

  carregaDespesas(){
    this.showLoading();
    this.arrDespesas = [];
    let mes = this.mesAtual.slice(5,7);
    this.desp = this.provider.getDespesas(mes);
    this.desp = this.desp.map((arr)=>{return arr.reverse()});
    this.total = 0;
    this.desp.subscribe(despesas => {
      despesas.forEach(item => {
        this.arrDespesas.push({
          key: item.key,
          desc: item.desc,
          dia: item.dia,
          mes: item.mes,
          hora: item.hora,
          valor: item.valor,
          tipo: item.tipo,
          ano: item.ano,
          datahora: item.datahora,
          titulo: this.defineDivider(item.dia)
        });
        this.total += +item.valor;
      });
      this.dismissLoading();
    });
  }

  defineDivider(dia){
    return this.arrDespesas.every(elem=>elem.dia!=dia);
  }

  ionViewWillEnter() {
    this.carregaDespesas();
   }

  novaDespesa(){
    //this.arrDespesas=[];
    this.navCtrl.push('CaddespesaPage');
  }

  editDespesa(desp: any){
    //this.arrDespesas=[];
    this.navCtrl.push('CaddespesaPage',{ desp: desp });
  }

  removeDespesa(key: string){
    //this.arrDespesas=[];
    this.provider.delDespesa(key)
      .then(() => {
        this.toast.create({ message: 'Despesa removida com sucesso', duration: 3000}).present();
        this.carregaDespesas();
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao remover despesa', duration: 3000}).present();
      })
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

setIcon(tipo){
  let icon: string;
  switch(tipo){
    case "Alimentação": icon="restaurant"; break;
    case "Transporte": icon="car"; break;
    case "Compras": icon="cart"; break;
    case "Contas": icon="briefcase"; break;
    case "Saúde": icon="medkit"; break;
    case "Cliente": icon="people"; break;
    case "Serviços": icon="business"; break;
    case "Educação": icon="school"; break;
    case "Impostos e taxas": icon="paper"; break;
    case "Colaboradores": icon="body"; break;
    case "Financeira": icon="cash"; break;
    case "Viagens": icon="subway"; break;
    default: icon="card";
  }
  return icon;
}

}
