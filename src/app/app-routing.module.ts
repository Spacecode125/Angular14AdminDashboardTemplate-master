import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RentedContractComponent } from './offers/rentedContract/rentedContract.component';
import { TradedContractComponent } from './offers/traded-contract/traded-contract.component';
import { PurchaseContractComponent } from './offers/purchase-contract/purchase-contract.component';
import { ListOffersComponent } from './offers/list-offers/list-offers.component';
import { PagesContactComponent } from './pages/pages-contact/pages-contact.component';
import { LoginComponent } from './pages/pages-login/pages-login.component';
import { PagesRegisterComponent } from './pages/pages-register/pages-register.component';
import { UsersProfileComponent } from './pages/users-profile/users-profile.component';
import { AddDeviceComponent } from './components/add-device/add-device.component';
import { AddDevicestatusComponent } from './offers/devicestatus-add/devicestatus-add.component';
import { AddRentedcontractComponent } from './pages/rentedContract-add/rentedContract-add.component';
import { ContractsComponent } from './components/contracts/contracts.component';
import { DevicesComponent } from './components/devices/devices.component';
import { EditDeviceComponent } from './components/edit-device/edit-device.component';
import { ViewDeviceComponent } from './components/view-device/view-device.component';
import { Error404Component } from './error404/error404.component';
import { ViewDeviceStatusComponent } from './offers/view-device-status/view-device-status.component';
import { AddContractComponent } from './components/add-contract/add-contract.component';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { DeleteUserComponent } from './pages/delete-user/delete-user.component';
import { TradedContractAddComponent } from './pages/tradedContract-add/traded-contract-add.component';
import { GetContactsComponent } from './pages/get-contacts/get-contacts.component';
import { ViewContractComponent } from './components/view-contract/view-contract.component';


const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'tradedcontract', component: TradedContractComponent },
  { path: 'purchasecontract', component: PurchaseContractComponent },
  { path: 'rentedcontract', component: RentedContractComponent },
  { path: 'listoffers', component: ListOffersComponent },
  { path: 'contracts', component: ContractsComponent },
  { path: 'pages-contact', component: PagesContactComponent },
  { path: 'pages-login', component: LoginComponent },
  { path: 'pages-register', component: PagesRegisterComponent },
  { path: 'user-profile', component: UsersProfileComponent },
  { path: 'devices', component: DevicesComponent },
  { path: 'add-devicestatus', component: AddDevicestatusComponent },
  { path: 'add-device', component: AddDeviceComponent },
  { path: 'rentedcontract-add', component: AddRentedcontractComponent },
  { path: 'edit-device', component: EditDeviceComponent },
  { path: 'view-device', component: ViewDeviceComponent },
  { path: 'error-404', component: Error404Component },
  { path: 'view-deviceStatus', component: ViewDeviceStatusComponent },
  { path: 'add-contract', component: AddContractComponent },
  { path: 'add-user', component: AddUserComponent },
  { path: 'users', component: DeleteUserComponent },
  { path: 'add-tradedContract', component: TradedContractAddComponent },
  { path: 'get-contacts', component: GetContactsComponent },
  { path: 'view-contract', component: ViewContractComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
