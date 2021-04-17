import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-folha',
  templateUrl: 'folha.html',
})
export class FolhaPage {

  meses: string[] = ['Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro'];
  ano = new Date().toISOString();

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }


}
