import { Actions, ofType, Effect } from "@ngrx/effects";
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import * as AuthActions from './auth.actions';
import { from, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../user.model";
import { AuthService } from "../auth.service";

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

const handleAuthentication = (email : string, userid : string, token : string, expiresIn : number) =>{
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userid, token, expirationDate);
    localStorage.setItem('userData', JSON.stringify(user));
    return new AuthActions.AuthenticateSuccess({
        email : email,
        userId : userid,
        token : token,
        expirationDate : expirationDate,
        redirect : true
    });
}

const handleError = (errorRes : any) =>{
    let errorMessage = 'An unknown error occurred!';
                if (!errorRes.error || !errorRes.error.error) {
                return of(new AuthActions.AuthenticateFail(errorMessage));
                }
                switch (errorRes.error.error.message) {
                case 'EMAIL_EXISTS':
                    errorMessage = 'This email exists already';
                    break;
                case 'EMAIL_NOT_FOUND':
                    errorMessage = 'This email does not exist.';
                    break;
                case 'INVALID_PASSWORD':
                    errorMessage = 'This password is not correct.';
                    break;
                }
                return of(new AuthActions.AuthenticateFail(errorMessage)); //a utility inside rxjs to return observable
}

  @Injectable()
export class AuthEffects{

    @Effect()
    authSignup = this.actions$.pipe(
        ofType(AuthActions.SIGNUP_START),
        switchMap((signUpData : AuthActions.SignupStart) => {
            return this.http
                .post<AuthResponseData>(
                    'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + environment.firebaseAPIKey,
                    {
                    email: signUpData.payload.email,
                    password: signUpData.payload.password,
                    returnSecureToken: true
                    }
                ).pipe( 
                    tap(resData =>{
                        this.authService.setLogOutTimer( +resData.expiresIn * 1000);
                    }),
                    map(resData => {
                        return handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
                }),
                catchError(errorRes =>{
                    return handleError(errorRes);
                }))
        })
    );

    @Effect()
    authLogin = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData : AuthActions.LoginStart) => {
            return this.http
            .post<AuthResponseData>(
              'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + environment.firebaseAPIKey,
              {
                email: authData.payload.email,
                password: authData.payload.password,
                returnSecureToken: true
              }
            ).pipe( 
                tap(resData =>{
                    this.authService.setLogOutTimer( +resData.expiresIn * 1000);
                }),
                map(resData => {
                    return handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
            }),
            catchError(errorRes =>{
                return handleError(errorRes);
            }))
        })
    );

    @Effect()
    autoLogin = this.actions$.pipe(
        ofType(AuthActions.AUTO_LOGIN),
        map(() => {
            const userData: {
                email: string;
                id: string;
                _token: string;
                _tokenExpirationDate: string;
              } = JSON.parse(localStorage.getItem('userData'));
              if (!userData) {
                return {type : 'DUMMY'};
              }
          
              const loadedUser = new User(
                userData.email,
                userData.id,
                userData._token,
                new Date(userData._tokenExpirationDate)
              );
          
              if (loadedUser.token) {
                // this.user.next(loadedUser);
                // this.store.dispatch(
                const expirationDuration =
                  new Date(userData._tokenExpirationDate).getTime() -
                  new Date().getTime();
                this.authService.setLogOutTimer(expirationDuration);
                return new AuthActions.AuthenticateSuccess(
                    {
                    email : loadedUser.email,
                    userId : loadedUser.id,
                    token : loadedUser.token,
                    expirationDate : new Date(userData._tokenExpirationDate),
                    redirect : false
                    }
                    )
                //   )
                // const expirationDuration =
                //   new Date(userData._tokenExpirationDate).getTime() -
                //   new Date().getTime();
                // this.autoLogout(expirationDuration);
              }
              return {type : 'DUMMY'};
        })
    );

    @Effect({dispatch : false})
    authLogout = this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        tap (() =>{
            localStorage.removeItem('userData');
            this.authService.clearLogOutTimer();
            this.router.navigate(['/auth']);
        })
    );

    @Effect({dispatch : false})
    authRedirect = this.actions$.pipe(
        ofType(AuthActions.AUTHENTICATE_SUCCESS),
        tap((authSuccessActions : AuthActions.AuthenticateSuccess) => {
            if(authSuccessActions.payload.redirect){
                this.router.navigate(['/']);
            }
        })
    )

    constructor(
        private actions$ : Actions, 
        private http : HttpClient, 
        private router : Router,
        private authService : AuthService){

    }
}