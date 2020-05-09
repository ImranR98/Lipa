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
  peopleForm: FormGroup

  settingsService: SettingsService = new SettingsService()

  settingsForm: FormGroup = new FormGroup({
    currencyDP: new FormControl(this.settingsService.getCurrencyDP()),
    taxPercentage: new FormControl(this.settingsService.getTaxPercentage()),
  })

  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar) { }

  get items(): FormArray {
    return this.itemsForm.get('items') as FormArray
  }
  get people(): FormArray {
    return this.peopleForm.get('people') as FormArray
  }

  ngOnInit(): void {
    this.itemsForm = this.formBuilder.group({
      items: this.formBuilder.array([])
    })
    this.peopleForm = this.formBuilder.group({
      people: this.formBuilder.array([])
    })
    this.subs.push(this.items.valueChanges.subscribe(() => this.handleChanges()))
    this.subs.push(this.people.valueChanges.subscribe(() => this.handleChanges()))
    this.subs.push(this.settingsForm.valueChanges.subscribe((value: { currencyDP: number, taxPercentage: number }) => {
      this.settingsService.setCurrencyDP(value.currencyDP)
      this.settingsService.setTaxPercentage(value.taxPercentage)
    }))
    this.addItem()
    this.addPerson()
  }

  createItem(): FormGroup {
    return new FormGroup({
      item: new FormControl('', Validators.required),
      cost: new FormControl(0, Validators.required),
      quantity: new FormControl(1, Validators.required),
      taxed: new FormControl(this.settingsForm.controls['taxPercentage'].value > 0),
    })
  }

  createPerson(): FormGroup {
    return new FormGroup({
      name: new FormControl('', Validators.required),
      items: this.formBuilder.array([])
    })
  }

  ifDuplicateItems(): boolean {
    return Array.from(new Set(this.items.value.map(item => item.item))).length < this.items.value.length
  }

  ifDuplicatePeople(): boolean {
    return Array.from(new Set(this.people.value.map(person => person.name))).length < this.people.value.length
  }

  addItem(): void {
    if (!this.itemsForm.valid || this.ifDuplicateItems()) this.snackBar.open('Invalid input!', 'Dismiss', { duration: 5000 })
    else this.items.push(this.createItem())
  }

  addPerson(): void {
    if (!this.peopleForm.valid || this.ifDuplicatePeople()) this.snackBar.open('Invalid input!', 'Dismiss', { duration: 5000 })
    else this.people.push(this.createPerson())
  }

  removeItem(index: number): void {
    this.items.removeAt(index)
  }

  removePerson(index: number): void {
    this.people.removeAt(index)
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

  handleChanges(): void {
    // Go through each item from itemsForm
    // On every loop of above, loop through each person in peopleForm and go through their items FormArray
    // If the item exists in itemsForm but not that persons items array, add it to their array
    this.items.controls.filter(item => item.valid).forEach(item => {
      this.people.controls.forEach((person: FormGroup) => {
        let exists = false;
        (person.get('items') as FormArray).controls.forEach(personItem => {
          if (personItem.get('item').value == item.get('item').value) exists = true
        })
        if (!exists) (person.get('items') as FormArray).push(new FormGroup({
          item: new FormControl(item.get('item').value, Validators.required),
          chippingIn: new FormControl(false)
        }))
      })
    })
    // Similar to above, but for removal
    // Loops through peopleForm, then itemsForm in the inner loop
    this.people.controls.forEach(person => {
      (person.get('items') as FormArray).controls.forEach((personItem, index: number) => {
        let exists = false
        this.items.controls.filter(item => item.valid).forEach(item => {
          if (personItem.get('item').value == item.get('item').value) exists = true
        })
        if (!exists) (person.get('items') as FormArray).removeAt(index)
      })
    })
  }

  calculate() {
    if (!this.itemsForm.valid || this.ifDuplicateItems() || !this.peopleForm.valid || this.ifDuplicatePeople() || !this.settingsForm.valid) this.snackBar.open('Invalid input!', 'Dismiss', { duration: 5000 })
    else {
      let items: { item: string, cost: number, quantity: number, taxed: boolean }[] = this.itemsForm.value
      let people: { name: string, items: { item: string, chippingIn: boolean }[] }[] = this.peopleForm.value
      let settings: { currencyDP: number, taxPercentage: number } = this.settingsForm.value
      // TODO: Use the 3 objects above to run the calculations and return a JSON object that can be shown in a table
    }
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe())
  }

}