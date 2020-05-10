import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  constructor(private snackBar: MatSnackBar) { }

  url: string = environment.apiUrl

  @Input() results: {
    items: { item: string, cost: number, quantity: number, taxed: boolean, dividedBy: number, costPerPerson: number }[],
    people: { name: string, items: { item: string, chippingIn: boolean, cost?: number }[], totalCost?: number }[],
    settings: { currencyDP: number, taxPercentage: number },
    total: number
  }

  amountColumns: string[] = ['name', 'items', 'totalCost']
  breakdownColumns: string[] = ['item', 'cost', 'quantity', 'taxed', 'dividedBy', 'costPerPerson']

  ngOnInit(): void {
    console.log(this.results)
  }

  roundOffByDPSetting(num: number): number {
    let divideBy = '1'
    for (let i = 0; i < this.results.settings.currencyDP; i++) divideBy += '0'
    return (Math.round((num + Number.EPSILON) * Number.parseInt(divideBy)) / Number.parseInt(divideBy))
  }

  base64EncodeResults(): string {
    return btoa(JSON.stringify(this.results))
  }

  showCopySnackbar(): void {
    this.snackBar.open('Copied', 'Dismiss', { duration: 5000 })
  }

}
