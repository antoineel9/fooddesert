import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FamilyComponent } from './family/family.component';
import { LoginComponent } from './login/login.component';
import { ResourceDashboardComponent } from './resource-dashboard/resource-dashboard.component';
import { ResourceSettingsComponent } from './resource-settings/resource-settings.component';
import { ResourceComponent } from './resource/resource.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'resource', component: ResourceComponent},
  { path: 'resourceSettings', component: ResourceSettingsComponent},
  { path: 'resourceDashboard', component: ResourceDashboardComponent},
  { path: 'family', component: FamilyComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
