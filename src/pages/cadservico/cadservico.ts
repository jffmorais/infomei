import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicoProvider } from '../../providers/servico/servico';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-cadservico',
  templateUrl: 'cadservico.html',
})
export class CadservicoPage {

  title: string;
  form: FormGroup;
  serv: any;

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder, private provider: ServicoProvider,
    private toast: ToastController    ) {

      this.serv = this.navParams.data.servico || {};
      this.setPageTitle();
      this.createForm();
  }

  private setPageTitle(){
    this.title = this.navParams.data.servico ? 'Alterando serviço' : 'Novo serviço';
  }

  createForm(){
    this.form = this.formBuilder.group({
      key: [this.serv.key],
      desc: [this.serv.desc, Validators.required],
      preco: [this.serv.preco, Validators.compose([Validators.pattern(/[0-9]/), Validators.required])],
      obs: [this.serv.obs]
    })
  }

  onSubmit(){
    //console.log();
    if(this.form.valid){
      this.provider.saveServico(this.form.value)
        .then(() => {
          this.toast.create({ message: 'Serviço salvo com sucesso', duration: 3000}).present();
          this.navCtrl.pop();
        })
        .catch((e) => {
          this.toast.create({ message: 'Erro ao salvar dados do serviço', duration: 3000}).present();
          console.error(e);
        });
    }
  }

}
