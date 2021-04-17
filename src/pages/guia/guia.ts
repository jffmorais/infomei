import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-guia',
  templateUrl: 'guia.html',
})
export class GuiaPage {

  aba: any = {
    obri: { st: false, ic: 'arrow-dropdown' }, 
    fat: { st: false, ic: 'arrow-dropdown' }, 
    nota: { st: false, ic: 'arrow-dropdown' }, 
    canc: { st: false, ic: 'arrow-dropdown' },
    deixar: { st: false, ic: 'arrow-dropdown' },
    debit: { st: false, ic: 'arrow-dropdown' }
  };

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  obrigacoes(){
    this.aba.obri.st ? this.aba.obri.st = false : this.aba.obri.st = true;
    this.aba.obri.st ? this.aba.obri.ic = 'arrow-dropup' : this.aba.obri.ic = 'arrow-dropdown';
  }

  faturamento(){
    this.aba.fat.st ? this.aba.fat.st = false : this.aba.fat.st = true;
    this.aba.fat.st ? this.aba.fat.ic = 'arrow-dropup' : this.aba.fat.ic = 'arrow-dropdown';
  }

  nota(){
    this.aba.nota.st ? this.aba.nota.st = false : this.aba.nota.st = true;
    this.aba.nota.st ? this.aba.nota.ic = 'arrow-dropup' : this.aba.nota.ic = 'arrow-dropdown';
  }

  cancelar(){
    this.aba.canc.st ? this.aba.canc.st = false : this.aba.canc.st = true;
    this.aba.canc.st ? this.aba.canc.ic = 'arrow-dropup' : this.aba.canc.ic = 'arrow-dropdown';
  }

  deixar(){
    this.aba.deixar.st ? this.aba.deixar.st = false : this.aba.deixar.st = true;
    this.aba.deixar.st ? this.aba.deixar.ic = 'arrow-dropup' : this.aba.deixar.ic = 'arrow-dropdown';
  }

  debitos(){
    this.aba.debit.st ? this.aba.debit.st = false : this.aba.debit.st = true;
    this.aba.debit.st ? this.aba.debit.ic = 'arrow-dropup' : this.aba.debit.ic = 'arrow-dropdown';
  }
}
