import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  defaultCurrencyDP = 2
  defaultTaxPercentage = 0

  constructor() { }

  getCurrencyDP(): number {
    console.log("AAH")
    try {
      let storedCurrencyDPString = localStorage.getItem('currencyDP')
      if (storedCurrencyDPString == null) throw null
      return Number.parseInt(storedCurrencyDPString)
    } catch (err) {
      return this.defaultCurrencyDP
    }
  }

  setCurrencyDP(currencyDP: number): void {
    try {
      localStorage.setItem('currencyDP', Number.parseInt(currencyDP.toString()).toString())
    } catch (err) {
      localStorage.setItem('currencyDP', this.defaultCurrencyDP.toString())
    }
  }

  getTaxPercentage(): number {
    try {
      let storedTaxPercentageString = localStorage.getItem('TaxPercentage')
      if (storedTaxPercentageString == null) throw null
      let storedTaxPercentage = Number.parseInt(storedTaxPercentageString)
      if (storedTaxPercentage < 0 || storedTaxPercentage > 100) throw null
      return storedTaxPercentage
    } catch (err) {
      return this.defaultTaxPercentage
    }
  }

  setTaxPercentage(TaxPercentage: number): void {
    try {
      let givenTaxPercentage = Number.parseInt(TaxPercentage.toString())
      if (givenTaxPercentage < 0 || givenTaxPercentage > 100) throw null
      localStorage.setItem('TaxPercentage', givenTaxPercentage.toString())
    } catch (err) {
      localStorage.setItem('TaxPercentage', this.defaultTaxPercentage.toString())
    }
  }
}
