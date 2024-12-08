// employee-add.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-add',
  standalone: true,
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.scss'],
  imports: [CommonModule, FormsModule] // Add FormsModule to imports
})
export class EmployeeAddComponent {
  newEmployee = { firstName: '', lastName: '', email: '' };

  constructor(private employeeService: EmployeeService, private router: Router) {}

  onSubmit() {
    this.employeeService.addEmployee(this.newEmployee);
    this.router.navigate(['/']);
  }

  onCancel() {
    this.router.navigate(['/']);
  }
}