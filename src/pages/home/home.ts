
//import { AuthProvider } from '../../providers/auth/auth';
import { Observable } from 'rxjs/Observable';
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Chart } from 'chart.js';
import { VendaProvider } from '../../providers/venda/venda';
import { DespesaProvider } from '../../providers/despesa/despesa';
import { SaldoProvider } from '../../providers/saldo/saldo';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('GrafSaldo') GrafSaldo: ElementRef;
  GraficoSaldo: any;
  venda: Observable<any>;
  desp: Observable<any>;
  saldoAtual: Observable<any>;
  saldo: number;
  teste: number;
  datas: string[]=[];
  dadosReceita: number[]=[];
  dadosDespesa: number[]=[];
  arrVendas: any[]=[];
  arrDespesas: any[]=[];
  loading: any;
  resultados: any[]=[];
  semVendas: boolean = true;
  semDespesas: boolean = true;

  constructor(public navCtrl: NavController,
     private vendaProvider: VendaProvider,
     private despProvider: DespesaProvider,
     private loadingCtrl: LoadingController,
     private saldoProvider: SaldoProvider
     ) {}

  carregaVendas(){
    this.showLoading();
    this.pegaDatas();
    this.saldoAtual = this.saldoProvider.getSaldo();
    this.saldoAtual.subscribe((s)=>{
      console.log(s.saldo)
      this.saldo = s.saldo;
    });
    //this.saldoProvider.getSaldo2().then(valor=>{this.saldo = valor.saldo});
    //console.log(this.saldo);
    this.venda = this.vendaProvider.getVendasPeriodo(this.setIniData(),this.setFimData());
    this.desp = this.despProvider.getDespesasPeriodo(this.setIniData(),this.setFimData());
    this.venda.subscribe(vendas => {
      vendas.forEach(item => {
        //console.log(item);
        this.arrVendas.push({
          dia : item.dia,
          total: item.total,
          nome: item.nome,
          datahora: item.datahora
        });
      });
      this.geraDadosReceita();
    });

    this.desp.subscribe(desp => {
      desp.forEach(item=>{
        this.arrDespesas.push({
          dia: item.dia,
          valor: item.valor,
          desc: item.desc,
          datahora: item.datahora
        });
      });
      this.arrVendas.length<=0 ? this.semVendas=true : this.semVendas=false;
      this.arrDespesas.length<=0 ? this.semDespesas=true : this.semDespesas=false;
      this.geraDadosDespesa();
      this.dismissLoading();
      this.geraResultados();
      this.geraGraf();
      // altera a ordem de exibição das últimas venda/despesas
      this.arrVendas.reverse();
      //console.log(this.arrVendas);
      //console.log(this.arrDespesas);
      this.arrDespesas.reverse();
    });
  }

  geraResultados(){
    this.resultados = [];
    for(let i=0; i<this.datas.length; i++){
      let resultado = +this.dadosReceita[i] - +this.dadosDespesa[i];
      this.resultados.push(resultado);
    }
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

  //testes

  ionViewDidLoad(){
    //this.carregaVendas();
  }

  ionViewWillEnter() {
    //this.carregaVendas();
  }

  ionViewDidEnter(){
    //this.carregaVendas();
  }

  ionViewWillLeave(){
    //this.carregaVendas();
    console.log("Will leave");
  }

  ionViewDidLeave(){
    //this.carregaVendas();
  }

  ionViewWillUnload(){
    //this.carregaVendas();
  }

  ngAfterViewInit(){
    console.log("After view init");
    this.carregaVendas();
  }

  setIniData=function(){
    let hoje: any = new Date();
    let data: any = new Date();
    //set data para 4 dias atras
    data.setDate(hoje.getDate()-6);
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
    for (let i=0;i<=6;i++){
      let data: any = new Date(hoje-86400*1000*i);
      this.datas[i]=data.toLocaleDateString();
      this.datas[i]=this.datas[i].slice(0,5);
    }
    this.datas.reverse();
  }

  geraGraf(){
    //this.GrafSaldo = "";
    console.log(this.GrafSaldo);
    this.GrafSaldo = new Chart(this.GrafSaldo.nativeElement,{
      type: 'line',
      data: {
        //labels: ['08/05','09/05','10/05','11/05','12/05','13/05','14/05'],
        labels: this.datas,
        datasets: [{ 
            //data: [38,-20,40,80,25,-10,30],
            data: this.resultados,
            borderColor: "#FFF",
            pointBackgroundColor: '#FFF',
            fill: true
          }
        ]
      },
      options: {
        elements: {
          line: {
              tension: 0
          }
        },
        legend:{
          display: false
        },
        title: {
          display: false
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
        scales: {
          yAxes: [{
              ticks: {
                  display: false,
                  beginAtZero: true
              }
          }],
          xAxes: [{
              ticks: {
                  fontColor: "#FFF",
                  fontSize: 12,
                  beginAtZero: true
              }
          }]
      }
      }
    });

  }

  config(){
    this.navCtrl.push('ConfigPage');
  }

  novaDespesa(){
    this.navCtrl.push('CaddespesaPage');
  }

  fluxo(){
    this.navCtrl.push('FluxoPage');
  }

  ranking(){
    this.navCtrl.push('RankPage');
  }

  folha(){
    this.navCtrl.push('FolhaPage');
  }

  fiscal(){
    this.navCtrl.push('FiscalPage');
  }

  novaVenda(){
    this.navCtrl.push('CadvendaPage');
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
