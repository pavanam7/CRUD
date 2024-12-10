import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private readonly STORAGE_KEY = 'employees';
  private employeesSubject = new BehaviorSubject<Employee[]>([]);

  constructor() {
    this.loadInitialData();
  }

  private loadInitialData(): void {
    try {
      const storedEmployees = localStorage.getItem(this.STORAGE_KEY);
      const employees: Employee[] = storedEmployees 
        ? JSON.parse(storedEmployees) 
        : this.getDefaultEmployees();
      
      this.employeesSubject.next(employees);
    } catch (error) {
      console.error('Error loading employees:', error);
      this.employeesSubject.next(this.getDefaultEmployees());
    }
  }

  private getDefaultEmployees(): Employee[] {
    const defaultEmployees: Employee[] = [
      { 
        id: 1, 
        firstName: 'John', 
        lastName: 'Doe', 
        email: 'john.doe@example.com' 
      },
      { 
        id: 2, 
        firstName: 'Jane', 
        lastName: 'Smith', 
        email: 'jane.smith@example.com' 
      }
    ];

    this.saveToLocalStorage(defaultEmployees);
    return defaultEmployees;
  }

  private saveToLocalStorage(employees: Employee[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(employees));
    } catch (error) {
      console.error('Error saving to local storage:', error);
    }
  }

  getEmployees(): Observable<Employee[]> {
    return this.employeesSubject.asObservable();
  }

  getEmployeeById(id: number): Employee | undefined {
    return this.employeesSubject.value.find(emp => emp.id === id);
  }

  addEmployee(employee: Omit<Employee, 'id'>): void {
    const currentEmployees = this.employeesSubject.value;
    const newEmployee: Employee = {
      ...employee,
      id: this.generateUniqueId()
    };

    const updatedEmployees = [...currentEmployees, newEmployee];
    this.employeesSubject.next(updatedEmployees);
    this.saveToLocalStorage(updatedEmployees);
  }

  updateEmployee(updatedEmployee: Employee): void {
    const currentEmployees = this.employeesSubject.value;
    const index = currentEmployees.findIndex(emp => emp.id === updatedEmployee.id);
    
    if (index !== -1) {
      const updatedEmployees = [...currentEmployees];
      updatedEmployees[index] = updatedEmployee;
      
      this.employeesSubject.next(updatedEmployees);
      this.saveToLocalStorage(updatedEmployees);
    }
  }

  deleteEmployee(id: number): void {
    const currentEmployees = this.employeesSubject.value;
    const updatedEmployees = currentEmployees.filter(emp => emp.id !== id);
    
    this.employeesSubject.next(updatedEmployees);
    this.saveToLocalStorage(updatedEmployees);
  }

  private generateUniqueId(): number {
    const employees = this.employeesSubject.value;
    return employees.length > 0 
      ? Math.max(...employees.map(emp => emp.id)) + 1 
      : 1;
  }
}