import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-results-container',
  templateUrl: './results-container.component.html',
  styleUrls: ['./results-container.component.scss']
})
export class ResultsContainerComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private snackBar: MatSnackBar, private router: Router) { }

  results = null

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['data']) this.results = JSON.parse(atob(params['data']))
      else {
        this.snackBar.open('No data!', 'Dismiss', { duration: 5000 })
        this.router.navigate(['/'])
      }
    })
  }

}
