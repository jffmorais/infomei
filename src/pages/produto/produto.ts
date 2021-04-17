import { Observable } from 'rxjs/Observable';
import { ProdutoProvider } from '../../providers/produto/produto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
//import {  }


@IonicPage()
@Component({
  selector: 'page-produto',
  templateUrl: 'produto.html',
})
export class ProdutoPage {

  prod: Observable<any>;
  loading: any;

  constructor(
    public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController,
    private provider: ProdutoProvider, private toast: ToastController
    ) {}

  ionViewWillEnter() {
    this.showLoading();
    this.prod = this.provider.getProdutos();
    this.prod.subscribe(()=>{
      this.dismissLoading();
    });
  }

  novoProduto(){
    this.navCtrl.push('CadprodutoPage');
  }

  editProduto(prod: any){
    this.navCtrl.push('CadprodutoPage',{ prod: prod });
  }

  removeProduto(key: string){
    this.provider.delProduto(key)
      .then(() => {
        this.toast.create({ message: 'Produto removido com sucesso', duration: 3000}).present();
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao remover produto', duration: 3000}).present();
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
