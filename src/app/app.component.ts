import { Component } from '@angular/core';
import { UnsavedChangesService } from './services/unsaved-changes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'lipa';
  unsavedChangesService: UnsavedChangesService = new UnsavedChangesService()
}
