import { HomePage } from '../home/home';
import { AuthProvider } from '../../providers/auth/auth';
import { User } from '../../providers/auth/user';
import { NgForm } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
//import {  }


@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

  user: User = new User();
  @ViewChild('form') form : NgForm;

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    private authProvider: AuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }

  cadUser(){
    if(this.form.form.valid){
      let toast = this.toastCtrl.create({duration:3000,position:'bottom'});
      this.authProvider.createUser(this.user)
        .then((user:any) => {
          //enviar email de verificação
          user.sendEmailVerification();

          toast.setMessage('Usuário criado com sucesso');
          toast.present();
          this.navCtrl.setRoot(HomePage);
        })
        .catch((error: any) => {
          if(error.code == "auth/email-already-in-use"){
            toast.setMessage('O email digitado já esta em uso');
          }else if(error.code == "auth/invalid-email"){
            toast.setMessage('O email digitado é inválido');
          }else if(error.code == "auth/operation-not-allowed"){
            toast.setMessage('Operação não permitida');
          }else if(error.code == "auth/weak-password"){
            toast.setMessage('A senha digitada é muito fraca');
          }
          toast.present();
        });
    }
  }

}
