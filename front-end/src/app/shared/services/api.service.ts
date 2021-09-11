import { HttpClient } from '@angular/common/http';
import { Position } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppUser } from '../interfaces/appuser.interface';
import { Store } from '../interfaces/store.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getStore(id: string): Observable<Store> {
    const uri = environment.apiBaseURL + `/foodsources/byid/${id}`;

    return this.http.get<Store>(uri);
  }

  updateStore(store: Store) : any {
    const uri = environment.apiBaseURL + `/foodsources/byid/${store._id}`;

    return this.http.patch<any>(uri, store);
  }

  getUser(id: string): Observable<AppUser> {
    const uri = environment.apiBaseURL + `/users/byid/${id}`;

    return this.http.get<AppUser>(uri);
  }

  updateUser(user: AppUser) : any {
    const uri = environment.apiBaseURL + `/users/byid/${user._id}`;

    return this.http.patch<any>(uri, user);
  }

  getLatLong(address: string) : Observable<Position[]> {
    const uri = environment.positionStackURL + `forward?access_key=${environment.POSITION_KEY}&query=${address}`;

    return this.http.get<Position[]>(uri);
  }
}
