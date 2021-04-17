import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { VendaProvider } from '../../providers/venda/venda';
import { Network } from '@ionic-native/network';

@IonicPage()
@Component({
  selector: 'page-venda',
  templateUrl: 'venda.html',
})
export class VendaPage {

  venda: Observable<any>;
  total: number = 0;
  loading: any;
  mesAtual = new Date().toISOString();
  arrVendas: any[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private provider: VendaProvider,
    private toast: ToastController,
    private loadingCtrl: LoadingController,
    private network: Network
    ) {

  }

  carregaVendas(){
    this.showLoading();
    let mes = this.mesAtual.slice(5,7);
    this.arrVendas = [];
    this.venda = this.provider.getVendas(mes);
    this.venda = this.venda.map((arr)=>{return arr.reverse()});
    this.total = 0;
    this.venda.subscribe(vendas => {
      vendas.forEach(item => {        
        this.arrVendas.push({
          key: item.key,
          ano: item.ano,
          datahora: item.datahora,
          email: item.email,
          nome: item.nome,
          hora: item.hora,
          dia: item.dia,
          mes: item.mes,
          total: item.total,
          items: item.items,
          titulo: this.defineDivider(item.dia)
        });
        this.total += +item.total;
      });
      this.dismissLoading();
    });
  }

  defineDivider(dia){
    return this.arrVendas.every(elem=>elem.dia!=dia);
  }

  ionViewWillEnter() {
    this.carregaVendas();
    // verifica desconexão
    let disconexao = this.network.onDisconnect().subscribe(()=>{
      this.dismissLoading();
      this.toast.create({ message: 'Sem conexão com a Internet', duration: 3000}).present();
    });
    // pára a verificação de desconexão
    disconexao.unsubscribe();
    // verifica re-conexão
    let conexao = this.network.onDisconnect().subscribe(()=>{
      this.carregaVendas();
    });
    // pára a verificação de re-conexão
    conexao.unsubscribe();
  }

  prodserv(){
    this.navCtrl.push('CadvendaPage');
  }

  novaVenda(){
    this.navCtrl.push('CadvendaPage');
  }

  editVenda(venda: any){
    this.navCtrl.push('CadvendaPage',{ venda: venda });
  }

  removeVenda(key: string){
    //this.arrVendas=[];
    //this.total = 0;
    this.provider.delVenda(key)
      .then(() => {
        this.toast.create({ message: 'Venda removida com sucesso', duration: 3000}).present();
        this.carregaVendas();
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao remover venda', duration: 3000}).present();
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
