import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-results-dialog',
  templateUrl: './results-dialog.component.html',
  styleUrls: ['./results-dialog.component.scss']
})
export class ResultsDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ResultsDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: {
    items: { item: string, cost: number, quantity: number, taxed: boolean, dividedBy: number, costPerPerson: number }[],
    people: { name: string, items: { item: string, chippingIn: boolean, cost?: number }[], totalCost?: number }[],
    settings: { currencyDP: number, taxPercentage: number },
    total: number
  }) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

}
