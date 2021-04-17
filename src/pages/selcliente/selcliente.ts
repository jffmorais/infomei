import { Observable } from 'rxjs/Observable';
import { ClienteProvider } from './../../providers/cliente/cliente';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
//import {  }

@IonicPage()
@Component({
  selector: 'page-selcliente',
  templateUrl: 'selcliente.html',
})
export class SelclientePage {

  cliente: Observable<any>;
  callback: any;

  //@ViewChild('cliente') cliente;

  constructor(public navCtrl: NavController, public navParams: NavParams, private loading: LoadingController,
    private provider: ClienteProvider) {
  }

  ionViewDidLoad(){
    let loader = this.loading.create({
      content: 'Carregando...',
    });

    loader.present().then(() => {
      this.cliente = this.provider.getClientes();
      loader.dismiss();
    })
  }

  seleciona(cliente: any){
    //console.log(this.navCtrl.last());
    //this.navCtrl.push('CadvendaPage',{ cliente: cliente });
    this.callback = this.navParams.get("callback")

    this.callback(cliente).then(()=>{
      this.navCtrl.pop();
    });
  }



}
