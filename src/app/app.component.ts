import { Component, HostListener, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthServiceService } from './services/auth-service.service';
import { LocalStorageService } from './services/local-storage.service';
import { response } from 'express';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit{
  title = 'DemoFrontend';
  authService = inject(AuthServiceService);
  localStorageService = inject(LocalStorageService);
  dropdownVisible = signal<boolean>(false);

  
  constructor() {
    try {
      if (typeof window !== 'undefined') {
        // localStorage.removeItem('userId');
        localStorage.removeItem('userData');
      }
    } catch (e) {
      console.log(e);
    }
  }

  ngOnInit(): void {
    
  }
 
  toggleDropdown() {
    this.dropdownVisible.set(!this.dropdownVisible());
  }

  logout(){
    console.log("logout");
   const userId =  this.localStorageService.getItem('userId');
   if(userId === null){
    alert("User is Not Login");
    return;
   }
   this.authService.logout(userId as number).subscribe({
    next: (response)=>{
      console.log(response)
    this.authService.isLogin.set(false);
    this.dropdownVisible.set(!this.dropdownVisible());
    }
   });
  }
  
}
