import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Chart } from 'chart.js';
import { VendaProvider } from '../../providers/venda/venda';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-rank',
  templateUrl: 'rank.html',
})
export class RankPage {

  @ViewChild('DoughnutCanvas') DoughnutCanvas;
  DoughnutChart: any;
  mesAtual = new Date().toISOString();
  venda: Observable<any>;
  loading: any;
  semVendas: boolean = true;
  /*loading = this.loadingCtrl.create({
    spinner: 'bubbles',
    content: 'Carregando',
    //dismissOnPageChange: false
  });*/
  grafDados: number[]=[];
  grafLabels: any[]=[];
  arrClientes: any[]=[];
  arrEmails: any[]=[];
  arrCor: string[]=[];
  clientesOrd: any[]=[];
  Cores: string[]=[
    "rgb(0, 116, 217, 0.7)",
    "rgb(255, 65, 54, 0.7)",
    "rgb(46, 204, 64, 0.7)",
    "rgb(255, 133, 27, 0.7)",
    "rgb(127, 219, 255, 0.7)",
    "rgb(177, 13, 201, 0.7)",
    "rgb(255, 220, 0, 0.7)",
    "rgb(0, 31, 63, 0.7)",
    "rgb(57, 204, 204, 0.7)",
    "rgb(1, 255, 112, 0.7)",
    "rgb(133, 20, 75, 0.7)",
    "rgb(240, 18, 190, 0.7)",
    "rgb(61, 153, 112, 0.7)",
    "rgb(17, 17, 17, 0.7)",
    "rgb(170, 170, 170, 0.7)"];

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private provider: VendaProvider,
     private loadingCtrl: LoadingController) {
      
      //this.loading.present();
      this.carregaVendas();
    }

  carregaVendas(){
    //this.loading.present();
    this.showLoading();
  this.arrClientes = [];
  this.arrEmails = [];
  this.grafDados = [];
  this.grafLabels = [];
  this.clientesOrd = [];
    let mes = this.mesAtual.slice(5,7);
    this.venda = this.provider.getVendas(mes);
    this.venda.subscribe(vendas => {
      vendas.forEach(item => {
        this.arrClientes.push({
          email: item.email,
          nome: item.nome,
          total: item.total
        });
        this.listaEmails(item);
      });

      if(this.arrClientes.length<=0){
        this.semVendas = true;
      } else {
        this.semVendas = false;
        this.geraDados();
        this.geraGraf();
      }

      this.dismissLoading();
    });
  }

  listaEmails(venda){
    if(this.arrEmails.every(elem=>elem!=venda.email)){
      this.arrEmails.push(venda.email);
    }
  }

  geraDados(){
    for (let i=0; i<this.arrClientes.length; i++){    
      for (let e=0; e<this.arrEmails.length; e++){
        if(this.arrClientes[i].email==this.arrEmails[e]){
          if(isNaN(this.grafDados[e])){
            this.grafDados[e]=0;
          }
          // limita a 10 clientes
          if(e<10){
          this.grafDados[e] += this.arrClientes[i].total;
          this.grafLabels[e]=this.arrClientes[i].nome;
          //this.arrCor[e]=this.corRandom();
          } else {
            this.grafDados[10] += this.arrClientes[i].total;
            this.grafLabels[10]="Outros";
            //this.arrCor[10]=this.corRandom();
          }
          
        }
      }
    }

    // adicionando dados ao array clientesOrd
    for (let i=0; i<this.grafLabels.length; i++){
      this.clientesOrd[i] = {
        nome: this.grafLabels[i],
        total: this.grafDados[i],
        cor: this.Cores[i]
      };
    }
    // ordenando o array clientesOrd pelo total (DESC)
    this.clientesOrd.sort(function(a, b) {
      return b.total - a.total;
    });
  }

corRandom(){
  let r = Math.floor(Math.random() * 200);
  let g = Math.floor(Math.random() * 200);
  let b = Math.floor(Math.random() * 200);
  return ('rgb(' + r + ', ' + g + ', ' + b + ', 0.8)');
}

  geraGraf() {
      this.DoughnutChart = new Chart(this.DoughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        datasets: [{
            data: this.grafDados,
            backgroundColor: this.Cores
        }],
        labels: this.grafLabels,        
      },
      options: {
        legend: false,
        title: {
          display: false,
          text: 'Clientes mais ativos do mês'
        },
        animation:{
          animateRotate: true,
          duration: 2000
        },
        tooltips: {
                enabled: true,
                mode: 'single',
                callbacks: {
                  label: function(tooltipItem, data) {
                    //console.log(tooltipItem);
                    //get the concerned dataset
                    var dataset = data.datasets[tooltipItem.datasetIndex];
                    //console.log(dataset);
                    //calculate the total of this data set
                    var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
                      return previousValue + currentValue;
                    });
                    //get the current items value
                    var currentValue = dataset.data[tooltipItem.index];
                    //calculate the precentage based on the total and current item, also this does a rough rounding to give a whole number
                    var percentage = Math.floor(((currentValue/total) * 100)+0.5);
              
                    return percentage + "%";
                  }
                }
        }
      }
    })
  };


showLoading() {
    if(!this.loading){
      this.loading = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: 'Carregando',
        //dismissOnPageChange: false
      });
        this.loading.present();
    }
}

dismissLoading(){
    if(this.loading){
        this.loading.dismiss();
        this.loading = null;
    }
}

}
