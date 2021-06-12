import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/common/header/header.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { LoginComponent } from './components/content/login/login.component';
import { AddDeviceComponent } from './components/content/add-device/add-device.component';
import { AutoSearchComponent } from './components/content/auto-search/auto-search.component';
import { ConfigurationComponent } from './components/content/configuration/configuration.component';
import { DetectedDeviceComponent } from './components/content/detected-device/detected-device.component';
import { DeviceDetailsComponent } from './components/content/device-details/device-details.component';
import { DeviceListComponent } from './components/content/device-list/device-list.component';
import { GaugeComponent } from './components/content/gauge/gauge.component';
import { SearchComponent } from './components/content/search/search.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from '@angular/forms';
import { ToastrModule } from "ngx-toastr";
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { jqxKnobModule } from 'jqwidgets-ng/jqxknob';
import { jqxNumberInputModule } from 'jqwidgets-ng/jqxnumberinput';
import { NgxGaugeModule } from 'ngx-gauge';
import { FinalGaugeComponent } from './components/content/final-gauge/final-gauge.component';
import { GaugeChartModule } from 'angular-gauge-chart'
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    AddDeviceComponent,
    AutoSearchComponent,
    ConfigurationComponent,
    DetectedDeviceComponent,
    DeviceDetailsComponent,
    DeviceListComponent,
    GaugeComponent,
    SearchComponent,
    FinalGaugeComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
    jqxKnobModule,
    jqxNumberInputModule,
    NgxGaugeModule,
    GaugeChartModule

  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
