import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '../interfaces/store.interface';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(private http: HttpClient) { }

  getStores(): Observable<Store[]> {
    return this.http.get<Store[]>(environment.apiBaseURL + "/foodsources");
  }
}
