import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelclientePage } from './selcliente';

@NgModule({
  declarations: [
    SelclientePage,
  ],
  imports: [
    IonicPageModule.forChild(SelclientePage),
  ],
})
export class SelclientePageModule {}
