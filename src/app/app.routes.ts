import { Routes } from '@angular/router';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
// Import other components as needed

export const routes: Routes = [
  { path: 'employees/add', component: EmployeeAddComponent },
  // Other routes
  { path: '', redirectTo: '/employees', pathMatch: 'full' }
];