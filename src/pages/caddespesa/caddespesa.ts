import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DespesaProvider } from '../../providers/despesa/despesa';
import { Observable } from 'rxjs/Observable';
import { SaldoProvider } from '../../providers/saldo/saldo';



@IonicPage()
@Component({
  selector: 'page-caddespesa',
  templateUrl: 'caddespesa.html',
})
export class CaddespesaPage {

  @ViewChild('dateTime') dateTime;

  title: string;
  form: FormGroup;
  desp: any;
  tipos: string[] = [
    "Alimentação",  // restaurant
    "Transporte",  // car
    "Compras",  // cart
    "Contas",  // trending-up
    "Saúde",  // medkit
    "Cliente",  // people
    "Serviços",  // business
    "Educação",  // school
    "Impostos e taxas",  // paper
    "Colaboradores",  // body
    "Financeira",  // cash
    "Viagens",  // airplane
    "Outros" // wallet
    ];

    saldoAtual: Observable<any>;
    saldo: number;

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder, private provider: DespesaProvider,
    private saldoProvider: SaldoProvider,
    private toast: ToastController    ) {

      this.desp = this.navParams.data.desp || {};
      this.setPageTitle();
      this.createForm();

      this.saldoAtual = this.saldoProvider.getSaldo();
      this.saldoAtual.subscribe((s)=>{
      console.log(s.saldo)
      this.saldo = s.saldo;
    });

      setTimeout(_ => {
        let tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
        let localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0,-1);
        this.dateTime.setValue(localISOTime);
      });
  }

  private setPageTitle(){
    this.title = this.navParams.data.desp ? 'Alterar despesa' : 'Nova despesa';
  }

  createForm(){
    this.form = this.formBuilder.group({
      key: [this.desp.key],
      desc: [this.desp.desc, Validators.required],
      tipo: [this.desp.tipo, Validators.required],
      valor: [this.desp.valor, Validators.compose([Validators.pattern(/[0-9]/), Validators.required])],
      datahora: [this.desp.datahora]
    })
  }

  onSubmit(){
    if(this.form.valid){
      // subtrai a despesa do saldo
      let sub = +this.saldo - +this.form.value.valor;
      this.saldoProvider.updateSaldo(sub);
      //salva a despesa
      this.provider.saveDespesa(this.form.value)
        .then(() => {
          this.toast.create({ message: 'Despesa salva com sucesso', duration: 3000}).present();
          this.navCtrl.pop();
        })
        .catch((e) => {
          this.toast.create({ message: 'Erro ao salvar dados da despesa', duration: 3000}).present();
          console.error(e);
        });
    }
  }

}
