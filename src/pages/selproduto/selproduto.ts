import { Observable } from 'rxjs/Observable';
import { ProdutoProvider } from './../../providers/produto/produto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
//import {  }

/*
interface Produto{
  key: string;
  custo: number;
  desc: string;
  preco: number;
  unid: string;
}
*/

@IonicPage()
@Component({
  selector: 'page-selproduto',
  templateUrl: 'selproduto.html',
})
export class SelprodutoPage {

  produto: Observable<any>;
  callback: any;

  //@ViewChild('cliente') cliente;

  constructor(public navCtrl: NavController, public navParams: NavParams, private loading: LoadingController,
    private provider: ProdutoProvider, private alert: AlertController) {
  }

  ionViewDidLoad(){
    let loader = this.loading.create({
      content: 'Carregando...',
    });

    loader.present().then(() => {
      this.produto = this.provider.getProdutos();
      loader.dismiss();
    })
  }


  seleciona(produto: any){
    //console.log(this.navCtrl.last());
    //this.navCtrl.push('CadvendaPage',{ cliente: cliente });
    this.callback = this.navParams.get("callback")

    this.callback(produto).then(()=>{
      this.navCtrl.pop();
    });
  }

  AlertQtd(prod: any) {
    let produtos: any;
    //console.log(prod);
    let prompt = this.alert.create({
      title: 'Quantidade',
      message: "Indique a quantidade de items",
      inputs: [
        {
          name: 'quant',
          type: 'number',
          value: '1'
        },
      ],
      buttons: [
        {
          text: 'Volta',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Continua',
          handler: data => {
            produtos = {
              key: prod.key,
              custo: prod.custo,
              desc: prod.desc,
              preco: prod.preco,
              unid: prod.unid,
              qtd: data.quant
            };
            //console.log(produtos);
            this.seleciona(produtos);
          }
        }
      ]
    });
    prompt.present();
  }


}
