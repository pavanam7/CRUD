import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-edit.component.html'
})
export class EmployeeEditComponent implements OnInit {
  employeeForm: FormGroup;
  isAddMode = true;
  employeeId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router
  ) {
    this.employeeForm = this.createForm();
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    
    if (idParam) {
      const parsedId = Number(idParam);
      if (!isNaN(parsedId)) {
        this.employeeId = parsedId;
        this.isAddMode = false;
        this.loadEmployeeDetails();
      }
    }
  }

  private createForm(): FormGroup {
    return this.fb.group({
      firstName: ['', [
        Validators.required, 
        Validators.minLength(2),
        Validators.maxLength(50)
      ]],
      lastName: ['', [
        Validators.required, 
        Validators.minLength(2),
        Validators.maxLength(50)
      ]],
      email: ['', [
        Validators.required, 
        Validators.email,
        Validators.maxLength(100)
      ]]
    });
  }

  private loadEmployeeDetails(): void {
    if (this.employeeId) {
      const employee = this.employeeService.getEmployeeById(this.employeeId);
      
      if (employee) {
        this.employeeForm.patchValue({
          firstName: employee.firstName,
          lastName: employee.lastName,
          email: employee.email
        });
      } else {
        this.router.navigate(['/employees']);
      }
    }
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const formValues = this.employeeForm.value;
      
      const employeeData = {
        firstName: formValues.firstName.trim(),
        lastName: formValues.lastName.trim(),
        email: formValues.email.trim()
      };

      try {
        if (this.isAddMode) {
          this.employeeService.addEmployee(employeeData);
        } else {
          this.employeeService.updateEmployee({
            id: this.employeeId!,
            ...employeeData
          });
        }
        this.router.navigate(['/employees']);
      } catch (error) {
        console.error('Error saving employee:', error);
      }
    } else {
      this.markFormGroupTouched(this.employeeForm);
    }
  }

  onCancel(): void {
    this.router.navigate(['/employees']);
  }

  // Getter methods for form controls
  get firstName(): AbstractControl | null {
    return this.employeeForm.get('firstName');
  }

  get lastName(): AbstractControl | null {
    return this.employeeForm.get('lastName');
  }

  get email(): AbstractControl | null {
    return this.employeeForm.get('email');
  }

  // Helper method to mark all controls as touched
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}