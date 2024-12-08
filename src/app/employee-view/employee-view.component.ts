// employee-view.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-view',
  standalone: true,
  templateUrl: './employee-view.component.html',
  styleUrls: ['./employee-view.component.scss'],
  imports: [CommonModule], // Add CommonModule to imports
})
export class EmployeeViewComponent {
  employee: { firstName: string; lastName: string; email: string } | null = null;

  constructor(private route: ActivatedRoute, private employeeService: EmployeeService, private router: Router) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.employee = this.employeeService.getEmployeeById(id);
  }

  close() {
    this.router.navigate(['/']);
  }
}