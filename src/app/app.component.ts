import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';

import { HomePage } from '../pages/home/home';
import { FluxoPage } from '../pages/fluxo/fluxo';
import { VendaPage } from '../pages/venda/venda';
import { ClientePage } from '../pages/cliente/cliente';
import { GuiaPage } from '../pages/guia/guia';
import { FiscalPage } from '../pages/fiscal/fiscal';
import { SignInPage } from '../pages/sign-in/sign-in';
import { ProdutoPage } from '../pages/produto/produto';
import { ServicoPage } from '../pages/servico/servico';
import { DespesaPage } from '../pages/despesa/despesa';
import { RankPage } from '../pages/rank/rank';
import { FolhaPage } from '../pages/folha/folha';
//import {  }


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{title: string, icon: string, component: any}>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public afAuth: AngularFireAuth
    ) {

      afAuth.authState.subscribe(user => {
        if(user){
          this.rootPage = HomePage;
        } else {
          this.rootPage = SignInPage;
        }
      });

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', icon: 'home', component: HomePage },
      { title: 'Fluxo', icon: 'swap', component: FluxoPage },
      { title: 'Vendas', icon: 'cart', component: VendaPage },
      { title: 'Despesas', icon: 'card', component: DespesaPage },
      { title: 'Folha de Pagamentos', icon: 'person', component: FolhaPage },
      { title: 'Ranking', icon: 'pie', component: RankPage},
      { title: 'Clientes', icon: 'walk', component: ClientePage },
      { title: 'Meus produtos', icon: 'pricetags', component: ProdutoPage },
      { title: 'Meus serviços', icon: 'construct', component: ServicoPage },
      { title: 'Status Fiscal', icon: 'done-all', component: FiscalPage },
      { title: 'Guia', icon: 'list-box', component: GuiaPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
