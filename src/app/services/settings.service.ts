import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  defaultCurrencyDP = 2
  defaultTaxPercentage = 0

  constructor() { }

  getCurrencyDP(): number {
    try {
      let storedCurrencyDPString = localStorage.getItem('currencyDP')
      if (storedCurrencyDPString == null) throw null
      let storedCurrencyDPS = Number.parseInt(storedCurrencyDPString)
      if (storedCurrencyDPS < 0 || storedCurrencyDPS > 4) throw null
      return storedCurrencyDPS
    } catch (err) {
      return this.defaultCurrencyDP
    }
  }

  setCurrencyDP(currencyDP: number): void {
    try {
      let givenCurrencyDP = Number.parseInt(currencyDP.toString())
      if (givenCurrencyDP < 0 || givenCurrencyDP > 4) throw null
      localStorage.setItem('currencyDP', givenCurrencyDP.toString())
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
