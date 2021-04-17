import { Observable } from 'rxjs/Observable';
import { ServicoProvider } from '../../providers/servico/servico';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
//import {  }


@IonicPage()
@Component({
  selector: 'page-servico',
  templateUrl: 'servico.html',
})
export class ServicoPage {

  servico: Observable<any>;
  loading: any;

  constructor(
    public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController,
    private provider: ServicoProvider, private toast: ToastController
    ) {}

  ionViewWillEnter(){
    this.showLoading()
    this.servico = this.provider.getServicos();
    this.servico.subscribe(()=>{
      this.dismissLoading();
    });
  }

  novoServico(){
    this.navCtrl.push('CadservicoPage');
  }

  editServico(servico: any){
    this.navCtrl.push('CadservicoPage',{ servico: servico });
  }

  removeServico(key: string){
    this.provider.delServico(key)
      .then(() => {
        this.toast.create({ message: 'Serviço removido com sucesso', duration: 3000}).present();
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao remover serviço', duration: 3000}).present();
      })
  }

  showLoading() {
    if(!this.loading){
      this.loading = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: 'Carregando'
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
