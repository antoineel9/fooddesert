import { google } from @typ
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppUser } from '../shared/interfaces/appuser.interface';
import { ApiService } from '../shared/services/api.service';
import { DropdownService } from '../shared/services/dropdown.service';

@Component({
  selector: 'app-resource',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.scss']
})
export class FamilyComponent implements OnInit {

  constructor(private dropDownService: DropdownService, private apiService: ApiService) { }

  ngOnInit(): void {
    this.dropDownService.getUsers().subscribe((res: AppUser[]) => {
      if(res) {
        this.users = res;
      }
    });

    // Setup form control vars
    this.familyForm = new FormGroup({
      meatCtl: new FormControl(''),
      dairyCtl: new FormControl(''),
      poultryCtl: new FormControl(''),
      veggiesCtl: new FormControl(''),
      bakeryCtl: new FormControl(''),
      usersCtl: new FormControl(''),
      atHomeCtl: new FormControl('1'),
      streetCtl: new FormControl('', Validators.required),
      cityCtl: new FormControl('Racine'),
      stateCtl: new FormControl('WI'),
      zipCtl: new FormControl('', Validators.required),
    });


  }

  // Class properties
  error: string = '';
  users!: AppUser[];
  selectedUser!: string;
  familyForm!: FormGroup;
  loadedUser!: AppUser;
  atHomeFlag: string = "1";
  map!: google.maps.Map;
  center!: google.maps.LatLngLiteral;
  
  btnSubmitClicked() {
    
  }

  btnValidateAddressClicked() {
    const add = `${this.familyForm.value.streetCtl}, ${this.familyForm.value.cityCtl},
     ${this.familyForm.value.stateCtl} ${this.familyForm.value.zipCtl}`;

    this.apiService.getLatLong(add).subscribe((res: any) => {
      console.dir(res.data[0]);
    });
  }

  locationValid() :boolean {
    // Make sure all required address fields are filled in
    if(this.familyForm.controls.streetCtl.errors?.required) {
      return false;
    }

    if(this.familyForm.controls.zipCtl.errors?.required) {
      return false;
    }

    return true;
  }

  userChanged() {
    // Call the api service to load the selected user's data to the screen
    this.apiService.getUser(this.selectedUser).subscribe((res: AppUser) => {
      if(res) {
        // Load the user
        this.loadedUser = res;
      }
    });
  }

  initMap(): void {
    // Set lat and long
    const center: google.maps.LatLngLiteral = {
      lat: 30,
      lng: -110
    };

    this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
      center,
      zoom: 8
    });

  }
}
