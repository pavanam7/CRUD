import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-employee-add',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    RouterModule
  ],
  template: `
    <div class="container">
      <h2>Add New Employee</h2>
      <form #employeeForm="ngForm" (ngSubmit)="onSubmit(employeeForm)">
        <div class="form-group">
          <label for="firstName">First Name</label>
          <input 
            type="text" 
            class="form-control" 
            id="firstName"
            [(ngModel)]="newEmployee.firstName" 
            name="firstName" 
            required
            #firstName="ngModel"
          >
          <div 
            *ngIf="firstName.invalid && (firstName.dirty || firstName.touched)" 
            class="text-danger"
          >
            First name is required
          </div>
        </div>

        <div class="form-group">
          <label for="lastName">Last Name</label>
          <input 
            type="text" 
            class="form-control" 
            id="lastName"
            [(ngModel)]="newEmployee.lastName" 
            name="lastName" 
            required
            #lastName="ngModel"
          >
          <div 
            *ngIf="lastName.invalid && (lastName.dirty || lastName.touched)" 
            class="text-danger"
          >
            Last name is required
          </div>
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input 
            type="email" 
            class="form-control" 
            id="email"
            [(ngModel)]="newEmployee.email" 
            name="email" 
            required
            email
            #email="ngModel"
          >
          <div 
            *ngIf="email.invalid && (email.dirty || email.touched)" 
            class="text-danger"
          >
            <div *ngIf="email.errors?.['required']">Email is required</div>
            <div *ngIf="email.errors?.['email']">Invalid email format</div>
          </div>
        </div>

        <div class="form-actions">
          <button 
            type="submit" 
            class="btn btn-primary"
            [disabled]="!employeeForm.form.valid"
          >
            Add Employee
          </button>
          <button 
            type="button" 
            class="btn btn-secondary" 
            (click)="onCancel()"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  `
})
export class EmployeeAddComponent {
  newEmployee = {
    firstName: '',
    lastName: '',
    email: ''
  };

  constructor(private router: Router) {}

  onSubmit(form: NgForm): void {
    if (form.valid) {
      console.log('Employee Data:', this.newEmployee);
      // Add your employee addition logic here
      this.router.navigate(['/employees']);
    }
  }

  onCancel(): void {
    this.router.navigate(['/employees']);
  }
}