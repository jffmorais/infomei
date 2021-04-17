import { Chart } from 'chart.js';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { VendaProvider } from '../../providers/venda/venda';
import { DespesaProvider } from '../../providers/despesa/despesa';

@IonicPage()
@Component({
  selector: 'page-fluxo',
  templateUrl: 'fluxo.html',
})
export class FluxoPage {

  venda: Observable<any>;
  desp: Observable<any>;
  @ViewChild('barCanvas') barCanvas;
  barChart: any;
  datas: string[]=[];
  dadosReceita: number[]=[];
  dadosDespesa: number[]=[];
  arrVendas: any[]=[];
  arrDespesas: any[]=[];
  loading: any;
  resultados: any[]=[];


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private provider: VendaProvider,
    private loadingCtrl: LoadingController,
    private despProvider: DespesaProvider   
       ) {

      //this.pegaDatas();
      //this.carregaVendas();
      
  }

  carregaVendas(){
    this.showLoading();
    this.pegaDatas();
    this.venda = this.provider.getVendasPeriodo(this.setIniData(),this.setFimData());
    this.desp = this.despProvider.getDespesasPeriodo(this.setIniData(),this.setFimData());
    this.venda.subscribe(vendas => {
      vendas.forEach(item => {
        //console.log(item);
        this.arrVendas.push({
          dia : item.dia,
          total: item.total
        });
        //this.geraDados(item);
      });
      this.geraDadosReceita();
      
      //console.log(this.dadosReceita);
      //this.dismissLoading();
      //this.geraGraf();
    });

    this.desp.subscribe(desp => {
      desp.forEach(item=>{
        //console.log(item);
        this.arrDespesas.push({
          dia: item.dia,
          valor: item.valor
        });
      });
      this.geraDadosDespesa();
      //console.log(this.dadosDespesa);
      this.dismissLoading();
      this.geraGraf();
      this.geraResultados();
      //console.log(this.arrVendas);
      //console.log(this.arrDespesas);
    });
  }

  geraResultados(){
    this.resultados = [];
    let cor = "";
    for(let i=0; i<this.datas.length; i++){
      //console.log("dadosReceita["+ i +"]: " + this.dadosReceita[i]);
      //console.log("dadosDespesa["+ i +"]: " + this.dadosDespesa[i]);
      let resultado = +this.dadosReceita[i] - +this.dadosDespesa[i];
      
      if (resultado <= 0){
        // vermelho em caso de resultado negativo ou zero
        cor = "#ffadb9";
      } else {
        //verde em caso de resultado positivo
        cor = "#c9ffd5";
      }
      this.resultados.push({
        dia: this.datas[i],
        res: resultado,
        cor: cor
      });
    }
  }

  ionViewWillEnter() {
    this.carregaVendas();
  }

  geraDadosReceita(){
    for(let i=0; i<this.datas.length; i++){
      if(isNaN(this.dadosReceita[i])){ this.dadosReceita[i]=0; }
      let dia = this.datas[i];
      dia = dia.slice(0,2);
      for(let v=0; v<this.arrVendas.length; v++){
        if(this.arrVendas[v].dia==dia){
          this.dadosReceita[i] += +this.arrVendas[v].total;
        }
      }
    }
  }

  geraDadosDespesa(){
    for(let i=0; i<this.datas.length; i++){
      if(isNaN(this.dadosDespesa[i])){ this.dadosDespesa[i]=0; }
      let dia = this.datas[i];
      dia = dia.slice(0,2);
      for(let v=0; v<this.arrDespesas.length; v++){
        if(this.arrDespesas[v].dia==dia){
          this.dadosDespesa[i] += +this.arrDespesas[v].valor;
        }
      }
    }
  }

  setIniData=function(){
    let hoje: any = new Date();
    let data: any = new Date();
    //set data para 4 dias atras
    data.setDate(hoje.getDate()-4);
    data.setHours(0);
    data.setMinutes(0);
    data.setSeconds(0);
    data.setMilliseconds(0);
    data = data.getTime();
    return data;
  }

  setFimData=function(){
    let hoje: any = new Date();
    hoje = hoje.getTime();
    return hoje;
  }

  pegaDatas(){
    let hoje: any = new Date();
    hoje = hoje.getTime();
    for (let i=0;i<=4;i++){
      let data: any = new Date(hoje-86400*1000*i);
      //console.log(data.toLocaleDateString());
      this.datas[i]=data.toLocaleDateString();
      this.datas[i]=this.datas[i].slice(0,5);
    }
  }

 geraGraf() {
      this.barChart = new Chart(this.barCanvas.nativeElement, {
        type: 'bar',
        data: {
            labels: this.datas,
            datasets: [{
                //data: [-200, 50, 30, 15, 20],
                data: this.dadosReceita,
                backgroundColor: 'rgba(0, 204, 122, 0.7)'
            },{
              labels: this.datas,
              //data: [100,200,300,400,500],
              data: this.dadosDespesa,
              backgroundColor: 'rgba(198, 13, 13, 0.7)'
            }]
        },
        options: {
            legend: { display: false },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:false
                    }
                }]
            },
            tooltips: {
              enabled: true,
                    mode: 'single',
                    callbacks: {
                        label: function(tooltipItems, data) {
                          //console.log(tooltipItems);
                          return 'R$ ' + tooltipItems.yLabel.toFixed(2);
                        }
                    }
            },
        }

    });
  }

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
