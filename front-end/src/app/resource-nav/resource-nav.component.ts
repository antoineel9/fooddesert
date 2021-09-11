import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resource-nav',
  templateUrl: './resource-nav.component.html',
  styleUrls: ['./resource-nav.component.scss']
})
export class ResourceNavComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  btnNavClicked(btnClicked: string) {
    switch(btnClicked) {
      case "entry":
        // Route to entry
        this.router.navigate(['/resource']);
        break;

      case "settings":
        // Route to settings
        this.router.navigate(['/resourceSettings']);
        break;

      case "dashboard":
        // Route to dashboard
        this.router.navigate(['/resourceDashboard']);
        break;
    }
  }

}
