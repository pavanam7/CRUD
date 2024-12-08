// employee.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private employees: { id: number; firstName: string; lastName: string; email: string }[] = [
    { id: 1, firstName: 'Dummy1', lastName: 'Dummy2', email: 'dummy12@gmail.com' },
    { id: 2, firstName: 'Jacob', lastName: 'Mathew', email: 'jacob@gmail.com' },
    { id: 3, firstName: 'Rony', lastName: 'M', email: 'rony@g.com' },
  ];

  getEmployees() {
    return this.employees;
  }

  getEmployeeById(id: number) {
    return this.employees.find(emp => emp.id === id);
  }

  addEmployee(employee: { firstName: string; lastName: string; email: string }) {
    this.employees.push({ ...employee, id: this.employees.length + 1 });
  }

  updateEmployee(updatedEmployee: { id: number; firstName: string; lastName: string; email: string }) {
    const index = this.employees.findIndex(emp => emp.id === updatedEmployee.id);
    if (index !== -1) {
      this.employees[index] = updatedEmployee;
    }
  }

  deleteEmployee(employee: { id: number }) {
    this.employees = this.employees.filter(emp => emp.id !== employee.id);
  }
}