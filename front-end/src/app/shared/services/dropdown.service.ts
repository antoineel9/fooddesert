import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '../interfaces/store.interface';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { DropDown } from '../interfaces/dropdown.interface';
import { AppUser } from '../interfaces/appuser.interface';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(private http: HttpClient) { }

  getStores(): Observable<Store[]> {
    const uri = environment.apiBaseURL + "/foodsources";

    return this.http.get<Store[]>(uri);
  }

  getUsers(): Observable<AppUser[]> {
    const uri = environment.apiBaseURL + "/users";

    return this.http.get<AppUser[]>(uri);
  }

  getStoreTypes(): DropDown[] {
    const types = [
      {
        code: 'GS',
        description: "Grocery Store"
      },
      {
        code: 'CS',
        description: "Convenience Store"
      },
      {
        code: 'FB',
        description: "Food Bank"
      },
      {
        code: 'SK',
        description: "Soup Kitchen"
      },
      {
        code: 'OT',
        description: "Other"
      }
    ];

    return types;
  }
}
