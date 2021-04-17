import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadvendaPage } from './cadvenda';

@NgModule({
  declarations: [
    CadvendaPage,
  ],
  imports: [
    IonicPageModule.forChild(CadvendaPage),
  ],
})
export class CadvendaPageModule {}
