import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FiscalPage } from './fiscal';

@NgModule({
  declarations: [
    FiscalPage,
  ],
  imports: [
    IonicPageModule.forChild(FiscalPage),
  ],
})
export class FiscalPageModule {}
