import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeService {

  constructor(private http: HttpClient) { }

  // Class properties

  private token!: string;
  private authenticatedUser!: User;

  /** Getters */
  getToken(): string {
    return this.token;
  }

  getUser(): User {
    return this.authenticatedUser;
  }

  /** Setters */
  setToken(jwt: string): void {
    this.token = jwt;
  }

  setUser(user: User): void {
    this.authenticatedUser = user;
  }

  /**
   * authorize - calls local strategy authorization
   * @param email 
   * @param password 
   * @returns json object, depends on success or failure.  See strapi documentation for more info
   */
  authorize(email: string, password: string): Observable<any> {
    const url = environment.strapiBaseUrl + 'auth/local';
    return this.http.post<any>(url, {identifier: email, password: password});
  }
}
