// app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-root',
  standalone: true,
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./app.component.scss'],
  imports: [CommonModule, RouterOutlet] // Add RouterOutlet to imports
})
export class AppComponent {}