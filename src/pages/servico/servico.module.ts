import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServicoPage } from './servico';

@NgModule({
  declarations: [
    ServicoPage,
  ],
  imports: [
    IonicPageModule.forChild(ServicoPage),
  ],
})
export class ServicoPageModule {}
