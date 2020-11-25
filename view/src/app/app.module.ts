import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { RoutesSetup } from './routes.setup';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CreateComponent } from './compose/create/create.component';
import { ViewComponent } from './compose/view/view.component';

@NgModule({
  declarations: [
    ViewComponent,
    CreateComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RoutesSetup,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
