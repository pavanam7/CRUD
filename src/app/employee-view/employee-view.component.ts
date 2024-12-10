import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService, Employee } from '../employee.service';

@Component({
  selector: 'app-employee-view',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="employee" class="employee-view-container">
      <h2>Employee Details</h2>
      <div class="employee-details">
        <p><strong>First Name:</strong> {{ employee.firstName }}</p>
        <p><strong>Last Name:</strong> {{ employee.lastName }}</p>
        <p><strong>Email:</strong> {{ employee.email }}</p>
      </div>
      <button (click)="goBack()" aria-label="Close">Close</button>
    </div>
  `
})
export class EmployeeViewComponent implements OnInit {
  employee: Employee | undefined;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.employee = this.employeeService.getEmployeeById(id);
  }

  goBack(): void {
    this.router.navigate(['/employees']);
  }
}