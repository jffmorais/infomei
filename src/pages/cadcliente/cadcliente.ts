import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteProvider } from './../../providers/cliente/cliente';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-cadcliente',
  templateUrl: 'cadcliente.html',
})
export class CadclientePage {

  title: string;
  form: FormGroup;
  cliente: any;

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder, private provider: ClienteProvider,
    private toast: ToastController    ) {

      this.cliente = this.navParams.data.cliente || {};
      this.setPageTitle();
      this.createForm();
  }

  private setPageTitle(){
    this.title = this.navParams.data.cliente ? 'Editando cliente' : 'Novo cliente';
  }

  createForm(){
    this.form = this.formBuilder.group({
      key: [this.cliente.key],
      nome: [this.cliente.nome, Validators.compose([Validators.maxLength(50),Validators.required])],
      tel: [this.cliente.tel],
      email: [this.cliente.email, Validators.compose([Validators.email])],
      end: [this.cliente.end],
      cidade: [this.cliente.cidade],
      obs: [this.cliente.obs]
    })
  }

  onSubmit(){
    if(this.form.valid){
      this.provider.saveCliente(this.form.value)
        .then(() => {
          this.toast.create({ message: 'Produto salvo com sucesso', duration: 3000}).present();
          this.navCtrl.pop();
        })
        .catch((e) => {
          this.toast.create({ message: 'Erro ao salvar dados do produto', duration: 3000}).present();
          console.error(e);
        });
    }
  }

}
