import { NgModule } from '@angular/core';
import {HomePageComponent} from './home-page/home-page.component';
import {EmployeeDashboardComponent} from './employee-dashboard/employee-dashboard.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  { path: 'home',  component: HomePageComponent },
  { path: 'employeeDashboard', component: EmployeeDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

