// app.routes.ts
import { Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeViewComponent } from './employee-view/employee-view.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { EmployeeAddComponent } from './employee-add/employee-add.component';

export const routes: Routes = [
  { path: '', component: EmployeeListComponent },
  { path: 'employee/view/:id', component: EmployeeViewComponent },
  { path: 'employee/edit/:id', component: EmployeeEditComponent },
  { path: 'employee/add', component: EmployeeAddComponent },
];