import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VendaProvider } from '../../providers/venda/venda';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { SaldoProvider } from '../../providers/saldo/saldo';


@IonicPage()
@Component({
  selector: 'page-cadvenda',
  templateUrl: 'cadvenda.html',
})
export class CadvendaPage {

  @ViewChild('dateTime') dateTime;
  @ViewChild('nome') nome;
  @ViewChild('email') email;

  title: string;
  form: FormGroup;
  venda: any;
  cliente: any;
  produto; servico: any;
  items: any[] = [];
  total: number = 0;
  detalhes: boolean = true;

  saldoAtual: Observable<any>;
  saldo: number;


  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder, private provider: VendaProvider,
    private saldoProvider: SaldoProvider,
    private toast: ToastController    ) {

      this.produto = this.navParams.data.produto || {};
      this.venda = this.navParams.data.venda || {};
      this.cliente = this.navParams.data.cliente || {};
      this.setPageTitle();
      this.createForm();

      this.saldoAtual = this.saldoProvider.getSaldo();
      this.saldoAtual.subscribe((s)=>{
        console.log(s.saldo)
        this.saldo = s.saldo;
      });

  }

  private setPageTitle(){
    this.title = this.navParams.data.venda ? 'Detalhes da venda' : 'Nova venda';
    this.detalhes = this.navParams.data.venda ? true : false;
  }

  // callback...
  cbfCliente = (_params) => {
    return new Promise((resolve, reject) => {
            this.cliente = _params;
            this.nome.setValue(this.cliente.nome);
            this.email.setValue(this.cliente.email);
            resolve();
        });
  }

  addItem(item: any){
    this.items.push(item);
    if(item.qtd===undefined){
      this.total += parseFloat(item.preco);
    } else {
      this.total += parseFloat(item.preco) * parseFloat(item.qtd);
    }
  }

    // callback...
    cbfProduto = (_params) => {
      return new Promise((resolve, reject) => {
              this.produto = _params;
              this.addItem(this.produto);
              resolve();
          });
    }

        // callback...
        cbfServico = (_params) => {
          return new Promise((resolve, reject) => {
                  this.servico = _params;
                  this.addItem(this.servico);
                  resolve();
              });
        }


  selCliente(){
    this.navCtrl.push('SelclientePage', {
      callback: this.cbfCliente
    });
  }

  selProduto(){
    this.navCtrl.push('SelprodutoPage', {
      callback: this.cbfProduto
    });
  }

  selServico(){
    this.navCtrl.push('SelservicoPage', {
      callback: this.cbfServico
    });
  }

  createForm(){
    this.form = this.formBuilder.group({
      key: [this.venda.key],
      nome: [this.venda.nome, Validators.required],
      email: [this.venda.email],
      items: [this.items],
      datahora: [this.venda.datahora, Validators.required]
    })
  }

  onSubmit(){
    if(this.form.valid){
      //soma a venda no saldo
      let soma = +this.saldo + +this.total;
      this.saldoProvider.updateSaldo(soma);
      //salva venda
      this.provider.saveVenda(this.form.value, this.total)
        .then(() => {
          this.toast.create({ message: 'Venda salva com sucesso', duration: 3000}).present();
          this.navCtrl.pop();
        })
        .catch((e) => {
          this.toast.create({ message: 'Erro ao salvar venda', duration: 3000}).present();
          console.error(e);
        });
    }
  }

  cancelar(){
    this.navCtrl.pop();
  }

}
