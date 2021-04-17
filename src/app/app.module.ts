import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { ChartsModule } from 'ng2-charts';
//import {  }

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { FluxoPage } from '../pages/fluxo/fluxo';
import { VendaPage } from '../pages/venda/venda';
import { ClientePage } from '../pages/cliente/cliente';
import { GuiaPage } from '../pages/guia/guia';
import { FiscalPage } from '../pages/fiscal/fiscal';
import { SignInPage } from '../pages/sign-in/sign-in';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { ProdutoPage } from '../pages/produto/produto';
import { ServicoPage } from '../pages/servico/servico';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ClienteProvider } from '../providers/cliente/cliente';
import { AuthProvider } from '../providers/auth/auth';
import { VendaProvider } from '../providers/venda/venda';
import { FiscalProvider } from '../providers/fiscal/fiscal';
import { ProdutoProvider } from '../providers/produto/produto';
import { ServicoProvider } from '../providers/servico/servico';
import { DespesaProvider } from '../providers/despesa/despesa';
import { DespesaPage } from '../pages/despesa/despesa';
import { RankPage } from '../pages/rank/rank';
import { FolhaProvider } from '../providers/folha/folha';
import { FolhaPage } from '../pages/folha/folha';
import { Network } from '@ionic-native/network';
import { ConfigPage } from '../pages/config/config';
import { ConfigPageModule } from '../pages/config/config.module';
import { FluxoPageModule } from '../pages/fluxo/fluxo.module';
import { RankPageModule } from '../pages/rank/rank.module';
import { FolhaPageModule } from '../pages/folha/folha.module';
import { FiscalPageModule } from '../pages/fiscal/fiscal.module';
import { ClientePageModule } from '../pages/cliente/cliente.module';
import { DespesaPageModule } from '../pages/despesa/despesa.module';
import { GuiaPageModule } from '../pages/guia/guia.module';
import { ProdutoPageModule } from '../pages/produto/produto.module';
import { ServicoPageModule } from '../pages/servico/servico.module';
import { SignInPageModule } from '../pages/sign-in/sign-in.module';
import { SignUpPageModule } from '../pages/sign-up/sign-up.module';
import { VendaPageModule } from '../pages/venda/venda.module';
import { SaldoProvider } from '../providers/saldo/saldo';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    //FluxoPage,
    //VendaPage,
    //ClientePage,
    //FiscalPage,
    //GuiaPage,
    //SignInPage,
    //SignUpPage,
    //ProdutoPage,
    //ServicoPage,
    //DespesaPage,
    //RankPage,
    //FolhaPage,
    //ConfigPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      monthNames: ['Janeiro', 'Fevereiro', 'Mar\u00e7o', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      monthShortNames: ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'],
      dayNames: ['Domingo', 'Segunda-feira', 'Ter\u00e7a-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'S\u00e1bado'],
      dayShortNames: ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB']
    }),
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyAFRXUvPp3gGVfEmLDswZDhS5jMI5rS1J8",
      authDomain: "infomei-7bd0b.firebaseapp.com",
      databaseURL: "https://infomei-7bd0b.firebaseio.com",
      projectId: "infomei-7bd0b",
      storageBucket: "infomei-7bd0b.appspot.com",
      messagingSenderId: "387258660329"
    }),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ChartsModule,
    ConfigPageModule,
    FluxoPageModule,
    RankPageModule,
    FolhaPageModule,
    FiscalPageModule,
    // build
    ClientePageModule,
    DespesaPageModule,
    GuiaPageModule,
    ProdutoPageModule,
    ServicoPageModule,
    SignInPageModule,
    SignUpPageModule,
    VendaPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    FluxoPage,
    VendaPage,
    ClientePage,
    FiscalPage,
    GuiaPage,
    SignInPage,
    SignUpPage,
    ProdutoPage,
    ServicoPage,
    DespesaPage,
    RankPage,
    FolhaPage,
    ConfigPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ClienteProvider,
    AuthProvider,
    VendaProvider,
    FiscalProvider,
    ProdutoProvider,
    ServicoProvider,
    DespesaProvider,
    FolhaProvider,
    Network,
    SaldoProvider
  ]
})
export class AppModule {}
