import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MsApiModule } from './modules/ms-api/ms-api.module';
import { MsUiModule } from './modules/ms-ui/ms-ui.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MsUiModule,
    MsApiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
