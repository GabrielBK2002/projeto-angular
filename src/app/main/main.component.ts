import { Component, Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import faturamentoData from '../assets/faturamento.json';
import { CommonModule } from '@angular/common';

interface Faturamento {
  dia: number;
  valor: number;
}

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-main',
  imports: [FormsModule, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
    public soma: number = 0;
    public valorInput: number = 0;
    public valorInputString: string = '';
    public fibonacciMensagem: string = '';
    faturamentoList: Faturamento[] = faturamentoData as Faturamento[];
    public menorFaturamento: number = 0;
    public maiorFaturamento: number = 0;
    public diasAcimaMedia: number = 0;
    public jsonUrl = '../assets/faturamento.json';
    public stringInvertida: string = '';
    public percentuaisDist: { estado: string, percentual: number }[] = [];
   
   
    ngOnInit(){
      this.CalcularSoma();
      this.analyzeRevenue();
      this.CalculaFaturamentoDist();
    }

    // #region Exercício 1
    CalcularSoma(){
      const Indice: number = 13;
      var Soma: number = 0;

      for(let K = 1; K <= Indice; K++){
        Soma += K;
      }

      this.soma = Soma;
    }
    // #endregion Exercício 1

    // #region Exercício 2
    CalcularFibonacci() {
      const num = Number(this.valorInput);
      if (num < 0) {
        this.fibonacciMensagem = 'Número inválido.';
        return;
      }
      let a = 0, b = 1;
      while (a < num) {
        const temp = a;
        a = b;
        b = temp + b;
      }
      this.fibonacciMensagem = (a === num)
        ? `${num} pertence à sequência de Fibonacci.`
        : `${num} não pertence à sequência de Fibonacci.`;
    }
    // #endregion Exercício 2

    // #region Exercício 3
    analyzeRevenue(): void {
      // Validação para calcular apenas de dias em que teve faturamento
      const diasValidos = this.faturamentoList.filter(item => item.valor > 0);
  
      if (diasValidos.length === 0) {
        this.menorFaturamento = 0;
        this.maiorFaturamento = 0;
        this.diasAcimaMedia = 0;
        return;
      }
  
      this.menorFaturamento = Math.min(...diasValidos.map(item => item.valor));
  
      this.maiorFaturamento = Math.max(...this.faturamentoList.map(item => item.valor));
  
      const total = diasValidos.reduce((soma, item) => soma + item.valor, 0);
      const media = total / diasValidos.length;
  
      this.diasAcimaMedia = this.faturamentoList.filter(item => item.valor > media).length;
    }
    // #endregion Exercício 3

    // #region Exercício 4
    public CalculaFaturamentoDist(){
      const faturamentos: { [estado: string]: number } = {
        SP: 67836.43,
        RJ: 36678.66,
        MG: 29229.88,
        ES: 27165.48,
        Outros: 19849.53
      };
      
      const total = Object.values(faturamentos).reduce((soma, valor) => soma + valor, 0);
      this.percentuaisDist = Object.keys(faturamentos).map(estado => ({
        estado,
        percentual: (faturamentos[estado] / total) * 100
      }));
    }
    // #endregion Exercício 4

    // #region Exercício 5
    public inverterString() {
      let reversa = "";
      for (let i = this.valorInputString.length - 1; i >= 0; i--) {
        reversa += this.valorInputString[i];
      }
      this.stringInvertida = reversa;
    }
    // #endregion Exercício 5

}
