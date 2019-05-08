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
import { WelcomeComponent } from './welcome/welcome.component';
import { HeaderColumnLeftComponent } from './header/header-column-left/header-column-left.component';
import { HeaderColumnCenterComponent } from './header/header-column-center/header-column-center.component';
import { HeaderColumnRightComponent } from './header/header-column-right/header-column-right.component';
import { InputErrorStateMatcherComponent } from './forms/input-error-state-matcher/input-error-state-matcher.component';
import { OverlayContainer } from '@angular/cdk/overlay';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    AuthorComponent,
    WelcomeComponent,
    HeaderColumnLeftComponent,
    HeaderColumnCenterComponent,
    HeaderColumnRightComponent,
    InputErrorStateMatcherComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(overlayContainer: OverlayContainer) {
    overlayContainer.getContainerElement().classList.add('unicorn-dark-theme');
    console.log(overlayContainer);
  }
}
