import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '../shared/interfaces/store.interface';
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
    this.dropDownService.getStores().subscribe((res) => {
      if(res) {
        this.stores = res;
      }
    });

    // Setup form control vars
    this.resourceSettingsForm = new FormGroup({
      meatCtl: new FormControl(''),
      dairyCtl: new FormControl(''),
      poultryCtl: new FormControl(''),
      veggiesCtl: new FormControl(''),
      bakeryCtl: new FormControl(''),
      storesCtl: new FormControl('')
    });
  }

  resourceSettingsForm!: FormGroup;
  selectedStore!: string;
  loadedStore!: Store;
  stores!: Store[];

  storeChanged() {
    // Call the api service to load the selected store data to the screen.
    this.apiService.getStore(this.selectedStore).subscribe((res: Store) => {
      if(res) {
        // Load the store
        this.loadedStore = res;
        
        //Load screen fields
        this.resourceSettingsForm.controls.meatCtl.setValue(res.freshMeats);
        this.resourceSettingsForm.controls.dairyCtl.setValue(res.dairy);
        this.resourceSettingsForm.controls.poultryCtl.setValue(res.poultry);
        this.resourceSettingsForm.controls.veggiesCtl.setValue(res.freshVeggies);
        this.resourceSettingsForm.controls.bakeryCtl.setValue(res.bakery);
      }
    });
  }

  btnUpdateClicked() {
    // Modify the loadedStore variable with changes made by the user
    this.loadedStore.freshMeats = this.resourceSettingsForm.value.meatCtl;
    this.loadedStore.dairy = this.resourceSettingsForm.value.dairyCtl;
    this.loadedStore.poultry = this.resourceSettingsForm.value.poultryCtl;
    this.loadedStore.freshVeggies = this.resourceSettingsForm.value.veggiesCtl;
    this.loadedStore.bakery = this.resourceSettingsForm.value.bakeryCtl;

    //Call update API
    this.apiService.updateStore(this.loadedStore).subscribe((res:any) => {
      console.log(res);
    });
  }
}
