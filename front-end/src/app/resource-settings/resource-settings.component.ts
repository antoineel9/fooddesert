import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DropDown } from '../shared/interfaces/dropdown.interface';
import { Address, Store } from '../shared/interfaces/store.interface';
import { ApiService } from '../shared/services/api.service';
import { DropdownService } from '../shared/services/dropdown.service';

@Component({
  selector: 'app-resource-settings',
  templateUrl: './resource-settings.component.html',
  styleUrls: ['./resource-settings.component.scss']
})
export class ResourceSettingsComponent implements OnInit {

  constructor(private dropDownService: DropdownService, private apiService: ApiService) { }

  ngOnInit(): void {
    this.dropDownService.getStores().subscribe((res: Store[]) => {
      if(res) {
        this.stores = res;
      }
    });

    this.types = this.dropDownService.getStoreTypes();

    // Phone Number pattern
    const PHONE_PATTERN = /^(\([0-9]{3}\))?[0-9]{3}-[0-9]{4}$/;

    // Setup form control vars
    this.resourceSettingsForm = new FormGroup({
      nameCtl: new FormControl(''),
      typeCtl: new FormControl(''),
      streetCtl: new FormControl(''),
      cityCtl: new FormControl(''),
      stateCtl: new FormControl(''),
      zipCtl: new FormControl(''),
      phoneCtl: new FormControl('', Validators.pattern(PHONE_PATTERN)),
      storesCtl: new FormControl('')
    });
  }

  resourceSettingsForm!: FormGroup;
  selectedStore!: string;
  selectedType!: string;
  loadedStore!: Store;
  stores!: Store[];
  types!: DropDown[];

  storeChanged() {
    // Call the api service to load the selected store data to the screen.
    this.apiService.getStore(this.selectedStore).subscribe((res: Store) => {
      if(res) {
        // Load the store
        this.loadedStore = res;
        
        const addressObject: Address = this.convertStringAddressToObject(res.address);

        //Load screen fields
        this.resourceSettingsForm.controls.nameCtl.setValue(res.name);
        this.resourceSettingsForm.controls.typeCtl.setValue(res.type);
        this.resourceSettingsForm.controls.streetCtl.setValue(addressObject.street);
        this.resourceSettingsForm.controls.cityCtl.setValue(addressObject.city);
        this.resourceSettingsForm.controls.stateCtl.setValue(addressObject.state);
        this.resourceSettingsForm.controls.zipCtl.setValue(addressObject.zip);
        this.resourceSettingsForm.controls.phoneCtl.setValue(res.phoneNo);
      }
    });
  }

  btnUpdateClicked() {
    // Convert the address inputs into an address string for database storage
    const addressObject: Address = {
      street: this.resourceSettingsForm.value.streetCtl,
      city: this.resourceSettingsForm.value.cityCtl,
      state: this.resourceSettingsForm.value.stateCtl,
      zip: this.resourceSettingsForm.value.zipCtl,
    }

    const addressString: string = this.convertAddressObjectToString(addressObject);

    // Modify the loadedStore variable with changes made by the user
    this.loadedStore.name = this.resourceSettingsForm.value.nameCtl;
    this.loadedStore.type = this.resourceSettingsForm.value.typeCtl;
    this.loadedStore.address = addressString;
    this.loadedStore.phoneNo = this.resourceSettingsForm.value.phoneCtl;

    /** @todo - add logic to capture lat and long for address that was entered */

    //Call update API
    this.apiService.updateStore(this.loadedStore).subscribe((res:any) => {
      console.log(res);
    });
  }

  convertStringAddressToObject(address: string): Address {
    let addressObject = {} as Address;

    // Split address string by comma
    const addressArray = address.split(",");

    // First element will contain street
    addressObject.street = addressArray[0];

    // Second element contains city
    addressObject.city = addressArray[1];

    // Third element contains state and zip, need to split further
    const stateZipArray = addressArray[2].split(" ");

    // First element contains state
    addressObject.state = stateZipArray[1];

    // Second element contains zip
    addressObject.zip = +stateZipArray[2];

    return addressObject;
  }

  convertAddressObjectToString(addressObject: Address): string {
    let addressString!: string;

    addressString = `${addressObject.street}, ${addressObject.city.trim()}, ${addressObject.state} ${addressObject.zip}`;
    return addressString;
  }
}
