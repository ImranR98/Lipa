import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UnsavedChangesService {

  constructor() { }

  unsavedChanges: boolean = false
}
