import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import html2canvas from 'html2canvas'
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  constructor(private snackBar: MatSnackBar) { }

  @ViewChild('resultsDiv') resultsDiv: ElementRef

  url = `${window.location.protocol}//${window.location.host}`

  @Input() results: {
    items: { item: string, cost: number, quantity: number, taxed: boolean, dividedBy: number, costPerPerson: number }[],
    people: { name: string, items: { item: string, chippingIn: boolean, cost: number }[], totalCost: number }[],
    settings: { currencyDP: number, taxPercentage: number },
    total: number
  }

  @Input() isDialog: boolean = false

  roundingError: number = 0
  actualTotal: number = 0

  amountColumns: string[] = ['name', 'items', 'totalCost']
  breakdownColumns: string[] = ['item', 'cost', 'quantity', 'taxed', 'dividedBy', 'costPerPerson']

  ngOnInit(): void {
    this.results.people.forEach(person => this.actualTotal += this.roundOffByDPSetting(person.totalCost))
    this.actualTotal = this.roundOffByDPSetting(this.actualTotal)
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
    this.snackBar.open('Link has been copied. Note: Other Apps may cut off some characters of the link, making it useless. Downloading as image is recommended instead.', 'Dismiss')
  }

  download() {
    html2canvas(this.resultsDiv.nativeElement).then((canvas) => {
      canvas.toBlob((blob) => {
        let now = new Date()
        FileSaver.saveAs(blob, `Lipa-result-${now.getFullYear()}-${now.getMonth() + 1}-${now.getDay()}-${now.getHours()}-${now.getMinutes()}.png`)
      }, 'image/png')
    }).catch(err => {
      console.log(err)
      this.snackBar.open('Error', 'Dismiss', { duration: 5000 })
    })
  }
}
