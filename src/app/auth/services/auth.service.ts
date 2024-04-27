import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environments } from '../../../environments/environments';
import { User } from '../interfaces/user.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {

  private baseUrl = environments.baseURL;
  private user?: User;

  constructor(private httpClient: HttpClient) { }

  get currentUser(): User | undefined {
    if (!this.user) return undefined;
    return structuredClone(this.user);
  }

  login( user: User ): Observable<any> {

    return this.httpClient.post<any>(`https://reqres.in/api/login`, user, this.getHeaders());

  }

  checkAuthentication(): Observable<boolean> {
    if ( !localStorage.getItem('mitoken') ) return of(false);

    const token = localStorage.getItem('mitoken');

    return this.httpClient.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap(user => this.user = user),
        map(user => !!user),
        catchError( err => of(false) )
      );

  }

  logout(): void {
    this.user = undefined;
    localStorage.clear();
  }

  create(user: User): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-type": "application/json",
      })
    }
    return this.httpClient.post<any>(`https://reqres.in/api/register`, user, httpOptions);
  }

  getHeaders(): any {
    let token = localStorage.getItem('mitoken');
    if (token) {
      return {
        headers: new HttpHeaders({
          "Content-type": "application/json",
          "authorization": token
        })
      }
    } else {
      return {
        headers: new HttpHeaders({
          "Content-type": "application/json"
        })
      }
    }
  }
}
