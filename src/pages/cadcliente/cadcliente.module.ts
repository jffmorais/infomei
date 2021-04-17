import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadclientePage } from './cadcliente';

@NgModule({
  declarations: [
    CadclientePage,
  ],
  imports: [
    IonicPageModule.forChild(CadclientePage),
  ],
})
export class CadclientePageModule {}
