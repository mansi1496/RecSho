import { Component, OnInit, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { AppComponent } from '../app.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit,OnDestroy {

  isLoginMode = true;
  isLoading = false;
  error : string = null;
  @ViewChild(PlaceholderDirective, {static : false}) alerthost : PlaceholderDirective;
  private closeSub : Subscription;

  constructor(private authService : AuthService, private router : Router, private componentFactoryResolver : ComponentFactoryResolver) { }

  ngOnInit(): void {
  }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form : NgForm){
    if(!form.valid){
      return;
    }
      this.isLoading = true;
      const email = form.value.email;
      const password = form.value.password;

      let authObs : Observable<AuthResponseData>;

      if(this.isLoginMode){
        authObs = this.authService.login(email, password);
      }else{
        // console.log(form.value);
        authObs = this.authService.signUp(email, password);
      }
      authObs.subscribe(resData =>{
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      errorMessage=>{
        console.log(errorMessage);
        this.error = errorMessage;
        this.showErrorAlert(errorMessage);
        this.isLoading = false;
      });
      form.reset();
  }

  onHandleError(){
    this.error = null;
  }

  private showErrorAlert(message : string){
    // const alertCmp = new AlertComponent();
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alerthost.viewContainerRef;
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
    componentRef.instance.message = message;
    // console.log(componentRef.instance.message)
    this.closeSub = componentRef.instance.close.subscribe(()=>{
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

  ngOnDestroy(){
    if(this.closeSub)
      this.closeSub.unsubscribe();
  }

}
