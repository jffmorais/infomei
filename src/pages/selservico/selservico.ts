import { Observable } from 'rxjs/Observable';
import { ServicoProvider } from './../../providers/servico/servico';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-selservico',
  templateUrl: 'selservico.html',
})
export class SelservicoPage {

  servico: Observable<any>;
  callback: any;

  //@ViewChild('cliente') cliente;

  constructor(public navCtrl: NavController, public navParams: NavParams, private loading: LoadingController,
    private provider: ServicoProvider, private alert: AlertController) {
  }

  ionViewDidLoad(){
    let loader = this.loading.create({
      content: 'Carregando...',
    });

    loader.present().then(() => {
      this.servico = this.provider.getServicos();
      loader.dismiss();
    })
  }


  seleciona(servico: any){
    //console.log(servico);
    this.callback = this.navParams.get("callback")

    this.callback(servico).then(()=>{
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
