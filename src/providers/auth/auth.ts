import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../auth/user';
import { Observable } from 'rxjs/Observable';
//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { SaldoProvider } from '../saldo/saldo';
//import { AngularFireDatabase } from 'angularfire2/database';



@Injectable()
export class AuthProvider {

  user: Observable<firebase.User>
  constructor(private angularFireAuth: AngularFireAuth,
    private provider: SaldoProvider,
    ) {
    this.user = angularFireAuth.authState;
  }

  createUser(user: User){
    console.log(user);
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(user.email,user.password)
    .then((u)=>{
      console.log(u.uid);
      console.log(user.saldo);
      this.provider.saveSaldo(u.uid,user.saldo);
    });
  }

  signIn(user: User){
    return this.angularFireAuth.auth.signInWithEmailAndPassword(user.email,user.password);
  }

  signOut(){
    return this.angularFireAuth.auth.signOut();
  }
}
