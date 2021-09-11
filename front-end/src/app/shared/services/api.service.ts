import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
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
}
