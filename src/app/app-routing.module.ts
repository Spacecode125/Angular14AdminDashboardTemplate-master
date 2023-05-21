import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RentedContractComponent } from './offers/rentedContract/rentedContract.component';
import { TradedContractComponent } from './offers/traded-contract/traded-contract.component';
import { PurchaseContractComponent } from './offers/purchase-contract/purchase-contract.component';
import { ListOffersComponent } from './offers/list-offers/list-offers.component';
import { FormsEditorsComponent } from './components/forms-editors/forms-editors.component';
import { FormsElementsComponent } from './components/forms-elements/forms-elements.component';
import { FormsLayoutsComponent } from './components/forms-layouts/forms-layouts.component';
import { PagesContactComponent } from './pages/pages-contact/pages-contact.component';
import { LoginComponent } from './pages/pages-login/pages-login.component';
import { PagesRegisterComponent } from './pages/pages-register/pages-register.component';
import { UsersProfileComponent } from './pages/users-profile/users-profile.component';
import { AddDeviceComponent } from './components/add-device/add-device.component';
import { AddDevicestatusComponent } from './offers/devicestatus-add/devicestatus-add.component';
import { AddRentedcontractComponent } from './offers/rentedContract-add/rentedContract-add.component';
import { ContractsComponent } from './components/contracts/contracts.component';
import { DevicesComponent } from './components/devices/devices.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'tradedcontract', component: TradedContractComponent },
  { path: 'purchasecontract', component: PurchaseContractComponent },
  { path: 'rentedcontract', component: RentedContractComponent },
  { path: 'listoffers', component: ListOffersComponent },
  { path: 'contracts', component: ContractsComponent },
  { path: 'form-editors', component: FormsEditorsComponent },
  { path: 'form-elements', component: FormsElementsComponent },
  { path: 'form-layouts', component: FormsLayoutsComponent },
  { path: 'pages-contact', component: PagesContactComponent },
  { path: 'pages-login', component: LoginComponent },
  { path: 'pages-register', component: PagesRegisterComponent },
  { path: 'user-profile', component: UsersProfileComponent },
  { path: 'devices', component: DevicesComponent },
  { path: 'devicestatus-add', component: AddDevicestatusComponent },
  { path: 'add-device', component: AddDeviceComponent },
  { path: 'rentedcontract-add', component: AddRentedcontractComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
