// employee-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { EmployeeViewComponent } from '../employee-view/employee-view.component'; // Import EmployeeViewComponent
import { EmployeeEditComponent } from '../employee-edit/employee-edit.component'; // Import EmployeeEditComponent

@Component({
  selector: 'app-employee-list',
  standalone: true,
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
  imports: [CommonModule, EmployeeViewComponent, EmployeeEditComponent] // Add these components to imports
})
export class EmployeeListComponent implements OnInit {
  // ...
}