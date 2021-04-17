import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadprodutoPage } from './cadproduto';

@NgModule({
  declarations: [
    CadprodutoPage,
  ],
  imports: [
    IonicPageModule.forChild(CadprodutoPage),
  ],
})
export class CadprodutoPageModule {}
