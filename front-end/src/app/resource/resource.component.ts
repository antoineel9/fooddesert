import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '../shared/interfaces/store.interface';
import { ApiService } from '../shared/services/api.service';
import { DropdownService } from '../shared/services/dropdown.service';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.scss']
})
export class ResourceComponent implements OnInit {

  constructor(private dropDownService: DropdownService, private apiService: ApiService) { }

  ngOnInit(): void {
    this.dropDownService.getStores().subscribe((res) => {
      if(res) {
        this.stores = res;
      }
    });

    // Setup form control vars
    this.resourceForm = new FormGroup({
      meatCtl: new FormControl(''),
      dairyCtl: new FormControl(''),
      poultryCtl: new FormControl(''),
      veggiesCtl: new FormControl(''),
      bakeryCtl: new FormControl(''),
      storesCtl: new FormControl('')
    });

  }

  // Class properties
  error: string = '';
  stores!: Store[];
  selectedStore!: string;
  resourceForm!: FormGroup;
  loadedStore!: Store;

  
  btnUpdateClicked() {
    // Modify the loadedStore variable with changes made by the user
    this.loadedStore.freshMeats = this.resourceForm.value.meatCtl;
    this.loadedStore.dairy = this.resourceForm.value.dairyCtl;
    this.loadedStore.poultry = this.resourceForm.value.poultryCtl;
    this.loadedStore.freshVeggies = this.resourceForm.value.veggiesCtl;
    this.loadedStore.bakery = this.resourceForm.value.bakeryCtl;

    //Call update API
    this.apiService.updateStore(this.loadedStore).subscribe((res:any) => {
      console.log(res);
    });
  }

  storeChanged() {
    // Call the api service to load the selected store data to the screen.
    this.apiService.getStore(this.selectedStore).subscribe((res: Store) => {
      if(res) {
        // Load the store
        this.loadedStore = res;
        
        //Load screen fields
        this.resourceForm.controls.meatCtl.setValue(res.freshMeats);
        this.resourceForm.controls.dairyCtl.setValue(res.dairy);
        this.resourceForm.controls.poultryCtl.setValue(res.poultry);
        this.resourceForm.controls.veggiesCtl.setValue(res.freshVeggies);
        this.resourceForm.controls.bakeryCtl.setValue(res.bakery);
      }
    })
  }
}
