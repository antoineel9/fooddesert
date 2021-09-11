import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '../shared/interfaces/store.interface';
import { DropdownService } from '../shared/services/dropdown.service';

@Component({
  selector: 'app-resource',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.scss']
})
export class FamilyComponent implements OnInit {

  constructor(private dropDownService: DropdownService) { }

  ngOnInit(): void {
    this.dropDownService.getStores().subscribe((res) => {
      if(res) {
        this.stores = res;
      }
    });

    // Setup form control vars
    this.familyForm = new FormGroup({
      meatCtl: new FormControl(''),
      dairyCtl: new FormControl(''),
      poultryCtl: new FormControl(''),
      veggiesCtl: new FormControl(''),
      fruitsCtl: new FormControl(''),
      radishCtl: new FormControl(''),
      pastriesCtl: new FormControl('')
    });

  }

  // Class properties
  error: string = '';
  stores!: Store[];
  selectedStore!: string;
  familyForm!: FormGroup;

  
  btnSubmitClicked() {
    
  }

  storeChanged() {
    
  }
}
