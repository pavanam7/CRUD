// employee-edit.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-edit',
  standalone: true,
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss'],
  imports: [CommonModule, FormsModule] // Add FormsModule to imports
})
export class EmployeeEditComponent implements OnInit {
  employee: { id: number; firstName: string; lastName: string; email: string } | null = null;

  constructor(private route: ActivatedRoute, private employeeService: EmployeeService, private router: Router) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.employee = this.employeeService.getEmployeeById(id);
  }

  onSubmit() {
    if (this.employee) {
      this.employeeService.updateEmployee(this.employee); // Make sure this method exists
      this.router.navigate(['/']);
    }
  }

  onCancel() {
    this.router.navigate(['/']);
  }
}