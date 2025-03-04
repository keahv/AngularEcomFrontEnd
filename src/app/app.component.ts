import { Component, DestroyRef, ElementRef, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthServiceService } from './services/auth-service.service';
import { LocalStorageService } from './services/local-storage.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule,ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [MessageService],
})
export class AppComponent implements OnInit{
  title = 'DemoFrontend';
  //TODO:- (status = pending) handle user profile dropdown closing status (if open) to close on click anywhere on page.
  @ViewChild('userMenu') userMenu!: ElementRef;
  authService = inject(AuthServiceService);
  localStorageService = inject(LocalStorageService);
  private destroyRef = inject(DestroyRef);
  dropdownVisible = signal<boolean>(false);
  private msgService = inject(MessageService);
  
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
    // this.subscribe = fromEvent(document, 'click')
    // .pipe(
    //   filter((event: Event) => {
    //     const target = event.target as HTMLElement;
    //     return this.userMenu && !this.userMenu.nativeElement.contains(target);
    //   })
    // )
    // .subscribe(() => {
    //   this.dropdownVisible.set(false); u
    // });
  }
 
  toggleDropdown() {
    this.dropdownVisible.set(!this.dropdownVisible());
  }

  logout(){
    console.log("logout");
   const userId =  this.localStorageService.getItem('userId');
   if(userId === null || !this.authService.isLogin()){
    alert("User is Not Login");
    return;
   }
    const subscribe = this.authService.logout(userId as number).subscribe({
    next: (response)=>{
      console.log(response)
    this.authService.isLogin.set(false);
    this.dropdownVisible.set(!this.dropdownVisible());
    this.msgService.add({ severity: 'success', summary: 'Success', detail: 'LogOut Successfully' });
    }
   });

   this.destroyRef.onDestroy(() => {
      subscribe.unsubscribe();
   });
  }
  
}
