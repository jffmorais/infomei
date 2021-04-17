import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProdutoProvider } from '../../providers/produto/produto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-cadproduto',
  templateUrl: 'cadproduto.html',
})
export class CadprodutoPage {

  title: string;
  form: FormGroup;
  prod: any;

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder, private provider: ProdutoProvider,
    private toast: ToastController    ) {

      this.prod = this.navParams.data.prod || {};
      this.setPageTitle();
      this.createForm();
  }

  private setPageTitle(){
    this.title = this.navParams.data.prod ? 'Alterar produto' : 'Novo produto';
  }

  createForm(){
    this.form = this.formBuilder.group({
      key: [this.prod.key],
      desc: [this.prod.desc, Validators.required],
      unid: [this.prod.unid, Validators.required],
      custo: [this.prod.custo, Validators.compose([Validators.pattern(/[0-9]/), Validators.required])],
      preco: [this.prod.preco, Validators.compose([Validators.pattern(/[0-9]/), Validators.required])]
    })
  }

  onSubmit(){
    if(this.form.valid){
      this.provider.saveProduto(this.form.value)
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
