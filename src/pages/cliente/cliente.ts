import { Observable } from 'rxjs/Observable';
import { ClienteProvider } from './../../providers/cliente/cliente';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
//import {  }


@IonicPage()
@Component({
  selector: 'page-cliente',
  templateUrl: 'cliente.html',
})
export class ClientePage {

  cliente: Observable<any>;
  loading: any;

  constructor(
    public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController,
    private provider: ClienteProvider, private toast: ToastController
    ) {

      //this.cliente = this.provider.getClientes();

  }


  ionViewWillEnter() {
    this.showLoading()
    this.cliente = this.provider.getClientes();
    this.cliente.subscribe(()=>{
      this.dismissLoading();
    });
  }

  novoCliente(){
    this.navCtrl.push('CadclientePage');
  }

  editCliente(cliente: any){
    this.navCtrl.push('CadclientePage',{ cliente: cliente });
  }

  removeCliente(key: string){
    this.provider.delCliente(key)
      .then(() => {
        this.toast.create({ message: 'Cliente removido com sucesso', duration: 3000}).present();
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao remover cliente', duration: 3000}).present();
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
