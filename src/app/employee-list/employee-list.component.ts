import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { EmployeeService, Employee } from '../employee.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './employee-list.component.html'
})
export class EmployeeListComponent implements OnInit, OnDestroy {
  employees: Employee[] = [];
  private employeeSubscription: Subscription | null = null;

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.employeeSubscription = this.employeeService.getEmployees()
      .subscribe({
        next: (employees) => {
          this.employees = employees;
        },
        error: (error) => {
          console.error('Error fetching employees:', error);
        }
      });
  }

  ngOnDestroy(): void {
    if (this.employeeSubscription) {
      this.employeeSubscription.unsubscribe();
    }
  }

  addEmployee(): void {
    this.router.navigate(['/employees/add']);
  }

  viewEmployee(id: number): void {
    this.router.navigate(['/employees/view', id]);
  }

  editEmployee(id: number): void {
    this.router.navigate(['/employees/edit', id]);
  }

  deleteEmployee(id: number): void {
    this.employeeService.deleteEmployee(id);
  }

  trackByEmployeeId(index: number, employee: Employee): number {
    return employee.id;
  }
}