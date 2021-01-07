import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { HelpComponent } from './help/help.component';
import { AboutComponent } from './about/about.component';
import { Error404Component } from './error404/error404.component';
import { ResultsContainerComponent } from './results-container/results-container.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/main'
  },
  {
    path: 'main',
    component: MainComponent
  },
  {
    path: 'results',
    component: ResultsContainerComponent
  },
  {
    path: 'help',
    component: HelpComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: '404',
    component: Error404Component
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
