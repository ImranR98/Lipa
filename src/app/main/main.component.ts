import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  subs: Subscription[] = []

  itemsForm: FormGroup

  settingsService: SettingsService = new SettingsService()

  settingsForm: FormGroup = new FormGroup({
    currencyDP: new FormControl(this.settingsService.getCurrencyDP()),
    taxPercentage: new FormControl(this.settingsService.getTaxPercentage()),
  })

  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar) { }

  get items(): FormArray {
    return this.itemsForm.get('items') as FormArray
  }

  ngOnInit(): void {
    this.itemsForm = this.formBuilder.group({
      items: this.formBuilder.array([])
    })
    this.subs.push(this.items.valueChanges.subscribe(value => this.handleItemChanges(value)))
    this.subs.push(this.settingsForm.valueChanges.subscribe((value: { currencyDP: number, taxPercentage: number }) => {
      this.settingsService.setCurrencyDP(value.currencyDP)
      this.settingsService.setTaxPercentage(value.taxPercentage)
    }))
    this.addItem()
  }

  createItem(): FormGroup {
    return new FormGroup({
      item: new FormControl('', Validators.required),
      cost: new FormControl(0, Validators.required),
      quantity: new FormControl(1, Validators.required),
      taxed: new FormControl({ value: this.settingsForm.controls['taxPercentage'].value > 0 }),
    })
  }

  addItem(): void {
    if (!this.itemsForm.valid || this.ifDuplicateItems()) this.snackBar.open('Invalid input!', 'Dismiss', { duration: 5000 })
    else this.items.push(this.createItem())
  }

  removeItem(index: number): void {
    this.items.removeAt(index)
  }

  numberOfDecimalPlacesToHTMLStepValue(dp: number): number {
    if (dp == 0) return 1
    else if (dp > 0) {
      let temp = '0.'
      for (let i = 0; i < (dp - 1); i++) temp += '0'
      temp += '1'
      return Number.parseFloat(temp)
    } else return 0.01
  }

  handleItemChanges(items: any): void {

  }

  ifDuplicateItems(): boolean {
    return Array.from(new Set(this.items.value.map(item => item.item))).length < this.items.value.length
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe())
  }

}
