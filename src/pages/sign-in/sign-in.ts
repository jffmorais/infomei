import { HomePage } from '../home/home';
import { User } from '../../providers/auth/user';
import { NgForm } from '@angular/forms';
import { SignUpPage } from '../sign-up/sign-up';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';



@IonicPage()
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {

  user: User = new User();
  @ViewChild('form') form: NgForm;

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    private authProvider: AuthProvider
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignInPage');
  }

  createAccount(){
    this.navCtrl.push(SignUpPage);
  }

  signIn(){
    if(this.form.form.valid){
      this.authProvider.signIn(this.user)
        .then(() => {
          this.navCtrl.setRoot(HomePage);
        })
        .catch((error: any) => {
          let toast = this.toastCtrl.create({ duration: 3000, position: 'bottom'});
          if(error.code == 'auth/invalid-email'){
            toast.setMessage('O e-mail digitado não é válido');
          }else if(error.code == 'auth/user-disabled'){
            toast.setMessage('O usuário está destivado');
          }else if(error.code == 'auth/user-not-found'){
            toast.setMessage('O usuário não foi encontrado');
          }else if(error.code == 'auth/wrong-password'){
            toast.setMessage('A senha digitada não é válida');
          }
          toast.present();
        });
    }
  }

}
