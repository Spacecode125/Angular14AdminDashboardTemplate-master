import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RentedContractComponent } from './offers/rentedContract/rentedContract.component';
import { UsersProfileComponent } from './pages/users-profile/users-profile.component';
import { PagesContactComponent } from './pages/pages-contact/pages-contact.component';
import { PagesRegisterComponent } from './pages/pages-register/pages-register.component';
import { LoginComponent } from './pages/pages-login/pages-login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AddDeviceComponent } from './components/add-device/add-device.component';
import { AddDevicestatusComponent } from './offers/devicestatus-add/devicestatus-add.component';
import { AddRentedcontractComponent } from './pages/rentedContract-add/rentedContract-add.component';
import { AdminComponent } from './admin/admin.component';
import { DevicesComponent } from './components/devices/devices.component';
import { ContractsComponent } from './components/contracts/contracts.component';
import { TradedContractComponent } from './offers/traded-contract/traded-contract.component';
import { PurchaseContractComponent } from './offers/purchase-contract/purchase-contract.component';
import { ListOffersComponent } from './offers/list-offers/list-offers.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditDeviceComponent } from './components/edit-device/edit-device.component';
import { ViewDeviceComponent } from './components/view-device/view-device.component';
import { Error404Component } from './error404/error404.component';
import { ViewDeviceStatusComponent } from './offers/view-device-status/view-device-status.component';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { DeleteUserComponent } from './pages/delete-user/delete-user.component';
import { TradedContractAddComponent } from './pages/tradedContract-add/traded-contract-add.component';
import { GetContactsComponent } from './pages/get-contacts/get-contacts.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgxPaginationModule } from 'ngx-pagination';







@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DashboardComponent,
    RentedContractComponent,
    UsersProfileComponent,
    PagesContactComponent,
    PagesRegisterComponent,
    LoginComponent,
    AddDeviceComponent,
    AddDevicestatusComponent,
    AddRentedcontractComponent,
    AdminComponent,
    DevicesComponent,
    ContractsComponent,
    TradedContractComponent,
    PurchaseContractComponent,
    ListOffersComponent,
    EditDeviceComponent,
    ViewDeviceComponent,
    Error404Component,
    ViewDeviceStatusComponent,
    AddUserComponent,
    DeleteUserComponent,
    TradedContractAddComponent,
    GetContactsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    PaginationModule.forRoot(),
    NgxPaginationModule,
    ToastrModule.forRoot({
      timeOut:5000,
      tapToDismiss:true,
      closeButton:true,
      preventDuplicates:true,
      progressBar:true,
      disableTimeOut:false,
      positionClass: 'toast-top-right',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
