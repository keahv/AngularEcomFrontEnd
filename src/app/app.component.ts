import { Component, HostListener, inject, OnDestroy } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ExecException } from 'child_process';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'DemoFrontend';
  constructor() {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('userId');
        localStorage.removeItem('userData');
      }
    } catch (e) {
      console.log(e);
    }
  }
}
