import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StorageServiceModule } from 'angular-webstorage-service';
import { AgGridModule } from 'ag-grid-angular';

import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ErrorInterceptor } from './interceptors/error.interceptor';
import { TokenRequestInterceptor } from './interceptors/token-request.interceptor';
import { UrlSanitizerInterceptor } from './interceptors/url-sanitizer.interceptor';
import { TeamService } from './services/team.service';
import { AuthService } from '../shared/services/auth.service';
import { AuthGuard } from '../shared/services/auth-guard.service';
import { SharedStorageService } from './services/storage.services';

import { MaterialModule } from './material.module';

import { LayoutComponent } from './components/layout/layout.component';
import { ChartComponent } from './components/c3-charts/chart.component';
import { FormatDateComponent } from './components/format/date/date.component';
import { FormatCurrencyComponent } from './components/format/currency/currency.component';
import { FormatUploadFileComponent } from './components/format/upload-file/upload-file.component';
import { FormatIndicatorComponent } from './components/format/indicator/indicator.component';
//import { CookieService } from 'ngx-cookie-service';
import { HeaderComponent } from './components/layout/header/header.component';
import { ConvertToInitialsPipe } from './pipes/convert-to-initials.pipe';
import { RouterModule } from '@angular/router';
import { GlobalErrorHandler } from './services/error.handler';
import { SidenavComponent } from './components/layout/sidenav/sidenav.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormatCampaignStatusComponent } from './components/format/campaign-status/campaign-status.component';
import { FormatIndicatorWithDateComponent } from './components/format/indicator-with-date/indicator-with-date.component';
import { SellerCompetitiveComponent } from './components/ag-grid-table/seller-competitive/seller-competitive.component';
import { SellerProposalComponent } from './components/ag-grid-table/seller-proposal/seller-proposal.component';
import { SellerRevisedRateComponent } from './components/ag-grid-table/seller-revised-rate/seller-revised-rate.component';
import { SellerRfpCompetitiveComponent } from './components/ag-grid-table/seller-rfp-competitive/seller-rfp-competitive.component';
import { TableCampaignStatusComponent } from './components/ag-grid-table/table-campaign-status/table-campaign-status.component';
import { TableCurrencyComponent } from './components/ag-grid-table/table-currency/table-currency.component';
import { TableIndicatorComponent } from './components/ag-grid-table/table-indicator/table-indicator.component';
import { TableIndicatorWithDateComponent } from './components/ag-grid-table/table-indicator-with-date/table-indicator-with-date.component';
import { TableLinkLaunchComponent } from './components/ag-grid-table/table-link-launch/table-link-launch.component';


@NgModule({
  declarations: [
    FormatDateComponent,
    FormatCurrencyComponent,
    FormatUploadFileComponent,
    FormatIndicatorComponent,
    FormatIndicatorWithDateComponent,
    FormatCampaignStatusComponent,
    HeaderComponent,
    SidenavComponent,
    LayoutComponent,
    ChartComponent,
    ConvertToInitialsPipe,
    SellerCompetitiveComponent,
    SellerProposalComponent,
    SellerRevisedRateComponent,
    SellerRfpCompetitiveComponent,
    TableCampaignStatusComponent,
    TableCurrencyComponent,
    TableIndicatorComponent,
    TableIndicatorWithDateComponent,
    TableLinkLaunchComponent
  ],
  exports: [
    CommonModule,
    FormatDateComponent,
    FormatCurrencyComponent,
    FormatUploadFileComponent,
    FormatIndicatorComponent,
    FormatIndicatorWithDateComponent,
    FormatCampaignStatusComponent,
    LayoutComponent,
    MaterialModule,
    FlexLayoutModule,
    ChartComponent,
    SellerCompetitiveComponent,
    SellerProposalComponent,
    SellerRevisedRateComponent,
    SellerRfpCompetitiveComponent,
    TableCampaignStatusComponent,
    TableCurrencyComponent,
    TableIndicatorComponent,
    TableIndicatorWithDateComponent,
    TableLinkLaunchComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    StorageServiceModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [
    TeamService,
    AuthService,
    AuthGuard,
    SharedStorageService,
//    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenRequestInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UrlSanitizerInterceptor,
      multi: true
    },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    }
  ]
})
export class SharedModule {
}
