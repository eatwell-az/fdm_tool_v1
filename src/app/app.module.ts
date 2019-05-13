import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthorComponent } from './author/author.component';
import { CoreComponent } from './core/core.component';
import { HeaderColumnLeftComponent } from './header/header-column-left/header-column-left.component';
import { HeaderColumnCenterComponent } from './header/header-column-center/header-column-center.component';
import { HeaderColumnRightComponent } from './header/header-column-right/header-column-right.component';
import { InputErrorStateMatcherComponent } from './forms/input-error-state-matcher/input-error-state-matcher.component';
import { OverlayContainer } from '@angular/cdk/overlay';
import { OutputTableComponent } from './datatable/output-table/output-table.component';
import { InputTableComponent } from './datatable/input-table/input-table.component';
import { DatatableComponent } from './datatable/datatable.component';
import { InputRowComponent } from './datatable/input-table/input-row/input-row.component';
import { InputCellComponent } from './datatable/input-table/input-row/input-cell/input-cell.component';
import { OutputRowComponent } from './datatable/output-table/output-row/output-row.component';
import { OutputCellComponent } from './datatable/output-table/output-row/output-cell/output-cell.component';
import { DatatableService } from './services/datatable.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    AuthorComponent,
    CoreComponent,
    HeaderColumnLeftComponent,
    HeaderColumnCenterComponent,
    HeaderColumnRightComponent,
    InputErrorStateMatcherComponent,
    OutputTableComponent,
    InputTableComponent,
    DatatableComponent,
    InputRowComponent,
    InputCellComponent,
    OutputRowComponent,
    OutputCellComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ DatatableService ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(overlayContainer: OverlayContainer) { }
}
